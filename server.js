require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const path = require("path")

const { PrismaClient } = require("@prisma/client")
const { PrismaMariaDb } = require("@prisma/adapter-mariadb")

// Configuração do Adapter para MariaDB/MySQL
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT || 3306),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
})

const prisma = new PrismaClient({ adapter })

// Leitura de JSON nos bodies das requisições
app.use(express.json())

// Servir os ficheiros estáticos do Frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "frontend")))

// MIDDLEWARE DE VALIDAÇÃO
const generosValidos = ["pop", "rock", "hip-hop", "eletronico", "jazz", "classico", "outro"]

function validarMusica(req, res, next) {
  const { titulo, artista, genero, ano } = req.body

  const tituloLimpo = String(titulo || "").trim()
  const artistaLimpo = String(artista || "").trim()
  const generoLimpo = String(genero || "").trim().toLowerCase()
  const anoAtual = new Date().getFullYear()
  const erros = []

  if (tituloLimpo.length < 2 || tituloLimpo.length > 200) {
    erros.push("Título obrigatório (entre 2 e 200 caracteres)")
  }
  if (artistaLimpo.length === 0 || artistaLimpo.length > 200) {
    erros.push("Artista obrigatório (entre 1 e 200 caracteres)")
  }
  if (!generosValidos.includes(generoLimpo)) {
    erros.push("Gênero inválido")
  }
  if (!ano || Number(ano) > anoAtual) {
    erros.push("Ano não pode ser maior que o ano atual")
  }

  if (erros.length > 0) {
    return res.status(400).json({ erros })
  }

  // Substitui o body pelos dados limpos e tipados corretamente
  req.body = {
    titulo: tituloLimpo,
    artista: artistaLimpo,
    genero: generoLimpo,
    ano: Number(ano),
  }

  next()
}

// ============================================================
// ROTAS DA API
// ============================================================

// GET ALL - Listar todas as músicas
app.get("/api/musicas", async (req, res, next) => {
  try {
    const musicas = await prisma.musica.findMany({ orderBy: { id: "asc" } })
    res.status(200).json(musicas)
  } catch (error) {
    next(error)
  }
})

// GET BY ID - Obter uma música específica
app.get("/api/musicas/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const musica = await prisma.musica.findUnique({ where: { id } })

    if (!musica) {
      return res.status(404).json({ mensagem: "Esta música não existe" })
    }

    res.json(musica)
  } catch (error) {
    next(error)
  }
})

// POST - Criar uma nova música
app.post("/api/musicas", validarMusica, async (req, res, next) => {
  try {
    const { titulo, artista, genero, ano } = req.body

    const novaMusica = await prisma.musica.create({
      data: { titulo, artista, genero, ano },
    })

    res.status(201).json(novaMusica)
  } catch (error) {
    next(error)
  }
})

// PUT - Atualizar uma música completa
app.put("/api/musicas/:id", validarMusica, async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { titulo, artista, genero, ano } = req.body

    const musicaExiste = await prisma.musica.findUnique({ where: { id } })
    if (!musicaExiste) {
      return res.status(404).json({ mensagem: "Esta música não existe" })
    }

    const musicaAtualizada = await prisma.musica.update({
      where: { id },
      data: { titulo, artista, genero, ano },
    })

    res.status(200).json(musicaAtualizada)
  } catch (error) {
    next(error)
  }
})

// PATCH - Alternar estado de favorita (true <-> false)
app.patch("/api/musicas/:id/favorita", async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    const musica = await prisma.musica.findUnique({ where: { id } })
    if (!musica) {
      return res.status(404).json({ erro: "Música não foi encontrada" })
    }

    const atualizada = await prisma.musica.update({
      where: { id },
      data: { favorita: !musica.favorita }
    })

    res.status(200).json(atualizada)
  } catch (error) {
    next(error)
  }
})

// DELETE - Remover uma música
app.delete("/api/musicas/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    const musicaExiste = await prisma.musica.findUnique({ where: { id } })
    if (!musicaExiste) {
      return res.status(404).json({ mensagem: "Esta música não existe" })
    }

    await prisma.musica.delete({ where: { id } })
    res.status(200).json({ mensagem: "Música Eliminada com sucesso" })
  } catch (error) {
    next(error)
  }
})

// ROTA 404 - Para qualquer outro pedido de API inexistente
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não foi encontrada!", rota: req.url })
})

// GLOBAL ERROR HANDLER
app.use((erro, req, res, next) => {
  console.error("Erro Interno do Servidor:", erro)
  res.status(500).json({ erro: "Erro no servidor ao processar a requisição" })
})

// Inicialização do Servidor e Teste de Conexão com a BD
app.listen(PORT, async () => {
  console.log(`Servidor a rolar na porta ${PORT}`)
  try {
    await prisma.$queryRaw`SELECT 1`
    console.log("Ligada à base de dados via Prisma (MariaDB)")
  } catch (erro) {
    console.error("Erro crítico na ligação ao SQL:", erro.message)
  }
})