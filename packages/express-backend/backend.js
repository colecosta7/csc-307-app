// backend.js
import express from "express";
import cors from "cors";

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const generateID = (user) => {
  user["id"] = Math.round(Math.random() * 100);
  return user;
}

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  generateID(userToAdd);
  addUser(userToAdd);
  res.status(201).send();
});

app.delete("/users/:id", (req, res) => {
  const userToDelete = req.params.id;
  const index = users["users_list"].findIndex((user) => user["id"] === userToDelete);

  if(index !== -1){
    users["users_list"].splice(index, 1);
    res.status(204).send();
  }
  else{
    console.log(index);
    console.log(userToDelete)
    res.status(404).send("User not found.");
  }
})

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
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

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}/users`
  );
});