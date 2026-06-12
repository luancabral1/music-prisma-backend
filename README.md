# Music Prisma Backend

Backend REST API for managing music records, built with **Node.js**, **Express**, **Prisma ORM** and **MariaDB/MySQL**.

This project was developed as part of my backend learning path, with focus on REST API design, database integration, request validation, environment variables and basic frontend-backend communication.

## Project Goals

The main goal of this project is to practice backend development concepts such as:

* Creating a REST API with Node.js and Express
* Connecting an API to a relational database
* Using Prisma ORM to manage database operations
* Implementing CRUD operations
* Validating request data
* Handling common API errors
* Separating backend logic from a simple frontend interface
* Organizing a project for GitHub portfolio presentation

## Features

* List all music records
* Get a music record by ID
* Create a new music record
* Update an existing music record
* Delete a music record
* Mark/unmark a music as favorite
* Basic input validation
* JSON API responses
* Simple frontend interface to consume the API

## Technologies Used

* Node.js
* Express.js
* Prisma ORM
* MariaDB / MySQL
* JavaScript
* HTML5
* CSS3
* Git and GitHub

## Project Structure

```txt
music-prisma-backend/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── prisma/
│   └── schema.prisma
│
├── server.js
├── package.json
├── package-lock.json
├── prisma.config.ts
├── .env.example
├── .gitignore
├── README.md
└── LICENSE
```

## Database Model

The project uses a `Musica` model with the following fields:

```txt
id        Integer
titulo    String
artista   String
genero    String
ano       Integer
favorita  Boolean
```

## API Endpoints

Base URL for local development:

```txt
http://localhost:3000
```

| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| GET    | `/api/musicas`              | List all music records    |
| GET    | `/api/musicas/:id`          | Get a music record by ID  |
| POST   | `/api/musicas`              | Create a new music record |
| PUT    | `/api/musicas/:id`          | Update a music record     |
| PATCH  | `/api/musicas/:id/favorita` | Toggle favorite status    |
| DELETE | `/api/musicas/:id`          | Delete a music record     |

## Example Request

### Create a new music record

```http
POST /api/musicas
Content-Type: application/json
```

```json
{
  "titulo": "Imagine",
  "artista": "John Lennon",
  "genero": "rock",
  "ano": 1971
}
```

## Example Response

```json
{
  "id": 1,
  "titulo": "Imagine",
  "artista": "John Lennon",
  "genero": "rock",
  "ano": 1971,
  "favorita": false
}
```

## Validation Rules

The API validates the input before creating or updating a music record.

Current validation includes:

* `titulo` must be between 2 and 200 characters
* `artista` is required and must have up to 200 characters
* `genero` must be one of the accepted values
* `ano` cannot be greater than the current year

Accepted genres:

```txt
pop, rock, hip-hop, eletronico, jazz, classico, outro
```

## Environment Variables

Create a `.env` file in the root folder using `.env.example` as reference.

Example:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=music_database
PORT=3000
```

Important: never commit your real `.env` file to GitHub.

## How to Run Locally

Clone the repository:

```bash
git clone https://github.com/luancabral1/music-prisma-backend.git
```

Access the project folder:

```bash
cd music-prisma-backend
```

Install dependencies:

```bash
npm install
```

Create the `.env` file:

```bash
cp .env.example .env
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Or start with Node:

```bash
npm start
```

The server should run on:

```txt
http://localhost:3000
```

## Frontend

This project includes a simple frontend inside the `frontend/` folder.

After starting the backend, open the frontend in the browser to test the API locally.

## What I Practiced

Through this project, I practiced:

* REST API development
* Express.js routing
* JSON request and response handling
* Database integration with Prisma
* Relational database modeling
* Environment variable configuration
* Basic validation and error handling
* Simple frontend-backend integration
* GitHub project documentation

## Future Improvements

Possible improvements for future versions:

* Add Swagger/OpenAPI documentation
* Improve project structure with `routes`, `controllers` and `services`
* Add automated tests
* Add pagination and filters
* Add Docker support
* Improve frontend interface
* Deploy the API
* Add authentication

## Status

Project in development.

## Author

Developed by **Luan Cabral**.

* GitHub: @luancabral1
* LinkedIn: Luan Cabral

## License

This project is licensed under the MIT License.
