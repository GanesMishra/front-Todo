import React, { useEffect, useState } from "react";
import Todoo from "./components/Todoo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";


function App() {

  const [todo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }
  return (
    <div className="App">

      <div className="container">

        <h1> Todo App</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Add Todos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="add"
            onClick={isUpdating ?
              () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
              : () => addToDo(text, setText, setToDo)}>
            {isUpdating ? "update" : "Add"}</div>
        </div>

        <div className="list">

          {todo.map((item) => <Todoo
            key={item._id}
            text={item.text}
            updateMode={() => updateMode(item._id, item.text)}
            deleteToDo={() => deleteToDo(item._id, setToDo)} />)}


        </div>

      </div>
    </div>
  );
}

export default App;
