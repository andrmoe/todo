import './App.css';
import { useState, useEffect } from 'react';


function MetaListEntry({children, handleSelect}) {
  return (
    <ul className="list-item">
      <li className="list-item-child">{children}</li><li className="right-button"><button className="right-button" onClick={handleSelect}>🡢</button></li>
    </ul>
  )
}

function Todo({children, handleDelete, handleMove}) {
  return (
    <ul className="list-item">
      <li className="list-item-child">{children}</li>
      <li className="right-button"><button onClick={handleDelete}>✓</button></li>
      <li className="right-button"><button onClick={handleMove}>M</button></li>
    </ul>
  )
}

function AddByText({handleAdd}) {
  const [text, setText] = useState("")
  return (
  <ul className="list-item">
      <li className="list-item-child"><input className="input" value={text} onChange={e => {setText(e.target.value)}}/></li>
      <li className="right-button"><button onClick={() => {
                  setText("")
                  handleAdd(text)
          }}
      > + </button></li>
  </ul>)
}

export default function App() {
  const [todoItems, setTodoItems] = useState(JSON.parse(localStorage.getItem("temp-todo") ?? "[]"))
  const [currentList, setCurrentList] = useState("No List")
  const [itemToBeMoved, setItemToBeMoved] = useState(null)

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
    content = 
    <ul className="list">
      {findAllLists().map(l => <li key={l}><MetaListEntry key={l} handleSelect={() => setCurrentList(l)}>{l}</MetaListEntry></li>)}
      <li><AddByText handleAdd={text => setTodoItems([...todoItems, {"text": "", "list": text}])} /></li>
    </ul>

  } else if (itemToBeMoved !== null) {
    console.log(itemToBeMoved)
    content = <>
      <h3>{itemToBeMoved.text}</h3>
      <ul className="list">
        {findAllLists().filter(l => l !== itemToBeMoved.list).map(l => <li><MetaListEntry key={l} handleSelect={() => {
          setTodoItems([...todoItems.filter(t => t !== itemToBeMoved), {...itemToBeMoved, list: l}])
          setItemToBeMoved(null)
          }}>{l}</MetaListEntry></li>)}
      </ul>
    </>
  } else {
    content = <><button onClick={() => setCurrentList("No List")}>Lists</button>
    <h3>{currentList}</h3>
    <ul className="list">
      {todoItems
      .filter(todo => todo.list === currentList && todo.text !== "")
      .map(todo => <li key={todo.text}><Todo handleDelete={() => setTodoItems(todoItems.filter(t => t !== todo))}
      handleMove={() => setItemToBeMoved(todo)}>{todo.text}</Todo></li>)}
      <li><AddByText handleAdd={text => setTodoItems([...todoItems, {"text": text, "list": currentList}])} />
      </li>
    </ul>
    </>
  }
  return (
    <div className="App">
      <div className="App-header">
        {content}
      </div>
    </div>
  );
}
