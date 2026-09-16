import express from "express";
import cors from "cors";

const app = express();

const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
    
  ],
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUser = (id) => {
  const user = findUserById(id);
  
  if (user === undefined){
    return undefined;
  }
  users["users_list"] = users["users_list"].filter((user) => user["id"] !== id);
  return user;
}

const matchUser = (name, job) => {
  return users["users_list"].filter(
    (user => user["name"] === name && user["job"] === job)
  );
}

const generateID = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  let id = "";
  let i = 0;
  
  for (i; i < 3; i++) {
    id += letters[Math.floor(Math.random() * letters.length)];
  }

  for (let i = 0; i < 3; i++) {
    id += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return id;
}

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name != undefined && job != undefined) {
    let result = matchUser(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = {users_list: result};
    res.send(result);
  } else {
      res.send(users);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = {
    id: generateID(),
    name: req.body.name,
    job: req.body.job
  };

  addUser(newUser);
  res.status(201).send();
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = deleteUser(id);

  if (result === undefined){
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send()
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
