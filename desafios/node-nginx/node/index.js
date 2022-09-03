const express = require("express");
const app = express();
const port = 3000;
const config = {
    host: "desafio-node-db",
    user: "root",
    password: "root",
    database: "desafiodb",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);

const createTable =
    "CREATE TABLE IF NOT EXISTS People (Id INT NOT NULL AUTO_INCREMENT, Name VARCHAR(255) NOT NULL, PRIMARY KEY(Id));";

const insertPeople = "INSERT INTO People (Name) VALUES ('Bruce Wayne');";
const selectPeople = "SELECT * FROM People;";

connection.query(createTable);

app.get("/", async (req, res) => {
    await insertName();

    const people = await getPeople();

    let results = "<h1>Full Cycle Rocks!</h1>";

    console.log(people);

    people.forEach((element) => {
        results += `<p>${element.Name}</p>`;
    });

    res.send(results);
});

async function insertName() {
    return new Promise((resolve, reject) => {
        connection.query(insertPeople, function (error, result, fields) {
            if (error) reject(error);
            return resolve(result);
        });
    });
}

async function getPeople() {
    return new Promise((resolve, reject) => {
        connection.query(selectPeople, function (error, results, field) {
            if (error) reject(error);
            resolve(results);
        });
    });
}

app.listen(port, () => {
    console.log("Rodando na porta: " + port);
});
