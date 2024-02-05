const express = require('express');
const app = express();
const knex = require("../db/knexConfig")
const cors = require('cors');

const setupServer = () => {
    app.use(express.json());
    app.use(cors());
    app.get("/api/data", (req, res) => {
        res.status(200).send("yes! Successed!");
    })

    app.post("/todos", async(req,res) => {
        try {
            const bodyContent = req.body;
            // console.log("body content is: " + bodyContent.description);
            // console.log("type is: " + typeof bodyContent);
            res.status(200).send(req.body);
            if (Object.keys(bodyContent)[0] === "description") {
                return await knex.insert({"description": bodyContent.description}).into("todo");
            }
        } catch (error) {
            console.error(error.message);
        }
    });

    app.get("/todos", async(req, res) => {
        try {
            const allTodos = await knex.select({
                id: 'id',
                description: 'description',
            }).from('todo');
            console.log(allTodos);
            res.status(200).send(allTodos);
        } catch (error) {
            console.error(error.message);
        }
    });

    app.get("/todos/:id", async(req, res) => {
        try{
            const id = req.params.id;
            const todo = await knex.select({
                id: 'id',
                description: 'description',
            }).from('todo').where('id', id);
            res.status(200).send(todo);
        } catch (error){
            console.error(error.message);
        }
    });

    app.put("/todos/:id", async(req, res) => {
        try {
            const id = req.params.id;
            const description = req.body.description;
            return await knex('todo').where('id', id).update({
                description: description
            }).then(() => {
                res.status(200).send("update success!");
            });
            
        } catch (error) {
            console.error(error.message);
        }
    });

    app.delete("/todos/:id", async(req, res) => {
        try {
            const id = req.params.id;
            return await knex('todo').where('id', id).del()
            .then(() => {res.status(200).send("delete success!")});
        } catch (error) {
            console.log(error.message);
        }
    })
    return app;
}

module.exports = {setupServer};