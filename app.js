const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv');
const mysqlConnection = require("./database");
const port = 3000;


// Your github page origin has to be written EXACTLY like this! https://behu-kea.github.io
const URL_FOR_FRONTEND = "YOUR_GITHUB_PAGE_ORIGIN_HERE";

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// If the application is running localhost allow all requests,
// otherwise add cors for specific website
// Remember to add the NODE_ENV="prod" on server!
const cors_url = process.env.NODE_ENV === "prod" ? URL_FOR_FRONTEND : "*";
app.use(
    cors({
        origin: cors_url
    })
);

app.get('/dishes', (req, res) => {
    const query = "SELECT * FROM Recipe.dishes_table;";
    mysqlConnection.query(
        query,
        (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        }
    );
})

app.get('/dishes/:id', (req, res) => {
    const query = "SELECT * FROM Recipe.dishes_table where dish_id = ?;";
    const dish_id = req.params.id;
    mysqlConnection.query(
        query,
        [dish_id],
        (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        }
    );
})

app.get('/ingredients', (req, res) => {
    const query = "SELECT * FROM Recipe.ingredients;";
    mysqlConnection.query(
        query,
        (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        }
    );
})
app.get('/ingredients/:id', (req, res) => {
    const query = "SELECT * FROM Recipe.ingredients where ingredients_id = ?;";
    const ingredients_id = req.params.id;
    mysqlConnection.query(
        query,
        [ingredients_id],
        (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        }
    );
})

app.get("/", (req, res) => {
    res.send("Hello World!" +
        "Useable endpoints are: " +
        "Dishes, Dishes:id or ingredients, ingredients:id");
});

app.listen(port, () => {
    console.log(`Node.js REST API listening at http://localhost:${port}`);
});

app.post("/user/create", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log(username);
    console.log(email);
    console.log(password);
    res.sendStatus(200);
});

