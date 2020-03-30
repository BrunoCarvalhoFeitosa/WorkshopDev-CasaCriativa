const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./workshopDev.db");

//Function to serialize a database
db.serialize(() => {
    //Function to create table in SQLite
    db.run(
        `CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    //Insert query
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
        "https://image.flaticon.com/icons/svg/2764/2764502.svg",
        "Fazer Blasds",
        "Turismo",
        "Viajar a 3 países durante as minhas férias",
        "https://rocketseat.com.br"
    ]

    //Function to register data to SQLite
    db.run(query, values, (error) => {
        if(error) return console.log(error);
    })

    //Function to delete data from SQLite
    db.run(`DELETE FROM ideas`, (error) => {
        if(error) return console.log(error);
    })

    //Function to select all datas from SQLite
    db.all(`SELECT * FROM ideas`, (error, rows) => {
        if(error) return console.log(error);
    })
});

module.exports = db;
