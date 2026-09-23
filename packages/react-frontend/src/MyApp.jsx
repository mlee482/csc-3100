import { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const id = characters[index]._id;
    
    fetch("http://localhost:8000/users/" + id, {
      method: "DELETE",
    })
    .then((response) => {
      if (response.status === 204) {
        const updated = characters.filter((character, i) => i !== index);
        setCharacters(updated);
      } else {
        console.log(response.status)
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function updateList(person) {
    postUser(person)
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }

      console.log(response.status);
      return null;
    })
    .then((newUser) => {
      if (newUser !== null) {
        setCharacters((prev) => [...prev, newUser]);
      }
    })
    .catch((error) => { 
      console.log(error);
    });
  }

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
