import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userServices from "./services/user-services.js"

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id; 

  userServices
  .findUserById(id)
  .then((result) => {
    if (result === null) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  })
  .catch((error) => res.status(500).send(error))
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices
    .getUsers(name, job)
    .then((result) => res.send({ users_list: result }))
    .catch((error) => res.status(500).send(error))
});

app.post("/users", (req, res) => {
  const newUser = {
    name: req.body.name,
    job: req.body.job
  };

  userServices
    .addUser(newUser)
    .then((savedUser) => res.status(201).send(savedUser))
    .catch((error) => res.status(500).send(error));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];

  userServices
    .removeUser(id)
    .then((deleted) => {
      if (deleted === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send()
      }
    })
    .catch((error) => res.status(500).send(error));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
