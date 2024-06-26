// src/MyApp.jsx
import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';


// const characters = [
//     {
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ];
  
function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index){
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }

    function updateList(person) {
        postUser(person)
          .then(() => setCharacters([...characters, person]))
          .catch((error) => {
            console.log(error);
          })
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
    }

    function deleteUser(id){
        const promise = fetch(`http://localhost:8000/users/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                return fetchUsers();
            })
            .then((res) => res.json())
            .then((json) => {
                setCharacters(json["users_list"]);
            })
            .catch((error) => {
                console.log(error);
            });  
            
        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
      }, [] );

    return (
        <div className="container">
            <Table 
                characterData = {characters}
                removeCharacter = {deleteUser}
            />
            <Form handleSubmit = {updateList}/>
        </div>
    );
}
export default MyApp;