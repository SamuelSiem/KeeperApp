import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [noteCollections, addCollection] = React.useState([]);

  React.componentDidMount = () => {
    getNotes();
  };

  function getNotes(){
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        addCollection(data);
      })
      .catch(()=>{
        console.log("Error when getting Notes from the server");
      });
  };

  function handleAddClick(note) {
    axios({
      url:'/save',
      method: 'POST',
      data: note
    })
      .then(()=>{
        getNotes();
      })
      .catch(()=>{
        console.log('Error while adding');
      });
  }

  function handleDeleteClick(note) {
    axios({
      url:'/delete',
      method: 'POST',
      data: note
    })
      .then(()=>{
        getNotes();
      })
      .catch(()=>{
        console.log('Error while deleting');
      })
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={handleAddClick} />
      {noteCollections.map((note, index) => {
        return (
          <Note
            id={index}
            key={index}
            title={note.title}
            content={note.content}
            onDelete={handleDeleteClick}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
