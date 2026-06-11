// ------------------------------------------------------------
// REFERENCIAS AO HTML
// ------------------------------------------------------------
const formulario = document.getElementById("form-musica")
const lista = document.getElementById("lista-musicas")
const mensagem = document.getElementById("mensagem")
 
// Carregar e renderizar a lista de músicas
async function carregar() {
    try {
        const resposta = await fetch("/api/musicas")
        const musicas = await resposta.json()
     
        if (!musicas || musicas.length === 0) {
            mensagem.textContent = "Sem musicas. Adiciona a primeira!";
            mensagem.className = "mensagem vazia";
            lista.innerHTML = "";
            document.getElementById("stat-total").textContent = "0";
            document.getElementById("stat-favs").textContent = "0";
            document.getElementById("stat-generos").textContent = "0";
            return;
        } else {
            mensagem.textContent = "";
            mensagem.className = "";
        }

        let html = ""
        let totalFavoritas = 0
        const generos = []
     
        for (const musica of musicas) {
            const estrela = musica.favorita ? "★" : "☆"
            const classeFav = musica.favorita ? "ativa" : ""
     
            html += `
              <article class="cartao">
                <div class="cartao-info">
                  <h3>${musica.titulo}</h3>
                  <p class="cartao-meta">
                    <span class="badge">${musica.genero}</span>
                    <span>${musica.artista}</span>
                    <span class="cartao-ano">${musica.ano}</span>
                  </p>
                </div>
                <div class="cartao-acoes">
                  <button class="btn-fav ${classeFav}" onclick="favoritar(${musica.id})">${estrela}</button>
                  <button class="btn-apagar" onclick="apagar(${musica.id})">Apagar</button>
                </div>
              </article>
            `
     
            if (musica.favorita) totalFavoritas++
            if (!generos.includes(musica.genero)) generos.push(musica.genero)
        }
     
        lista.innerHTML = html
     
        document.getElementById("stat-total").textContent = musicas.length
        document.getElementById("stat-favs").textContent = totalFavoritas
        document.getElementById("stat-generos").textContent = generos.length
    } catch (erro) {
        console.error("Erro ao carregar músicas no front-end:", erro)
        mensagem.textContent = "Erro ao ligar ao servidor.";
        mensagem.className = "mensagem erro";
    }
}
 
// ============================================================
// CRIAR (POST /api/musicas)
// ============================================================
formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault()
 
    const dados = {
        titulo: document.getElementById("titulo").value,
        artista: document.getElementById("artista").value,
        genero: document.getElementById("genero").value,
        ano: Number(document.getElementById("ano").value),
    }
 
    const resposta = await fetch("/api/musicas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    })

    if (!resposta.ok) {
        const erroData = await resposta.json()
        if (erroData.erros) {
            alert("Erros de validação:\n" + erroData.erros.join("\n"))
        } else {
            alert("Erro ao adicionar música.")
        }
        return
    }
 
    formulario.reset()
    carregar()
})
 
// ============================================================
// MARCAR/DESMARCAR FAVORITA (PATCH /api/musicas/:id/favorita)
// ============================================================
async function favoritar(id) {
    await fetch("/api/musicas/" + id + "/favorita", { method: "PATCH" })
    carregar()
}
 
// ============================================================
// APAGAR (DELETE /api/musicas/:id)
// ============================================================
async function apagar(id) {
    if (confirm("Tem a certeza que deseja apagar esta música?")) {
        await fetch("/api/musicas/" + id, { method: "DELETE" })
        carregar()
    }
}
 
// Inicialização automática ao carregar a página
carregar()