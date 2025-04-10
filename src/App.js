import './App.css';
import EditableList from './EditableList';
import { useState, useEffect } from 'react';


function MetaListEntry({children, handleSelect}) {
  return (
    <><span>{children}</span><button onClick={handleSelect}>🡵</button></>
  )
}

function Todo({children, handleDelete}) {
  return (
    <ul className="editable-component">
      <li className="editable-content">{children}</li>
      <li className="delete-component"><button onClick={handleDelete}>✓</button></li>
    </ul>
  )
}


function App() {
  const [todoItems, setTodoItems] = useState(JSON.parse(localStorage.getItem("temp-todo") ?? "[]"))
  const [currentList, setCurrentList] = useState("No List")

  useEffect(() => {
    localStorage.setItem("temp-todo", JSON.stringify(todoItems), [todoItems])
  })

  function findAllLists() {
    let allLists = []
    todoItems.forEach(todo => {
      if (!allLists.includes(todo.list)) {
        allLists.push(todo.list)
      }
    })
    return allLists
  }

  let content;
  if (currentList === "No List") {
    content = <>
    <EditableList handleAdd={text => setTodoItems([...todoItems, {"text": "", "list": text}])}>
      {findAllLists().map(l => <MetaListEntry key={l} handleSelect={() => setCurrentList(l)}>{l}</MetaListEntry>)}
    </EditableList></>
  } else {
    content = <><button onClick={() => setCurrentList("No List")}>Lists</button>
    <EditableList handleAdd={text => setTodoItems([...todoItems, {"text": text, "list": currentList}])}>
      {todoItems
      .filter(todo => todo.list === currentList && todo.text !== "")
      .map(todo => <Todo handleDelete={() => setTodoItems(todoItems.filter(t => t !== todo))}
      >{todo.text}</Todo>)}
    </EditableList></>
  }
  return (
    <div className="App">
      <header className="App-header">
        {content}
      </header>
    </div>
  );
}

export default App;
