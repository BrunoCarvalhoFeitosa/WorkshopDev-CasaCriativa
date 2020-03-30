const express = require("express");
const server = express();
const nunjucks = require("nunjucks");
const db = require("./db");

//Reading all files from public folder - Javascript/Css/Images
server.use(express.static("public"));

//Giving access to express get body of requests
server.use(express.urlencoded({ extended: true }))

nunjucks.configure("views", {
    express: server,
    noCache: true
})

//Get standard router - index.html and redenring ideas by last registers
server.get("/", (request, response) => {

    //Function to select all datas from SQLite
    db.all(`SELECT * FROM ideas`, (error, rows) => {
        if (error) return console.log(error);

        const reversedIdeas = [...rows].reverse();
        let lastIdeas = [];
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea);
            }
        }

        return response.render("index.html", { ideas: lastIdeas });
    })
});

//Get router ideias.html and redenring ideas by last registers from SQLite
server.get("/ideias", (request, response) => {
    db.all(`SELECT * FROM ideas`, (error, rows) => {
        if (error) {
            console.log(error);
            return response.send("Erro no banco de dados");
        }
        const reversedIdeas = [...rows].reverse();
        return response.render("ideias.html", { ideas: reversedIdeas });
    });
});

//Function to register datas from form
server.post("/", (request, response) => {
    const query =
        `INSERT INTO ideas (
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `
    const values = [
        request.body.image,
        request.body.title,
        request.body.category,
        request.body.description,
        request.body.link
    ]

    db.run(query, values, (error) => {
        if (error) {
            console.log(error);
            return response.send("Erro no banco de dados");
        }

        response.redirect("/ideias");
    });
});

//Working server in port 3000
server.listen(3000);