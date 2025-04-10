import './App.css';
import EditableList from './EditableList';
import { useState, useEffect } from 'react';


function App() {
  const [todoItems, setTodoItems] = useState(JSON.parse(localStorage.getItem("temp-todo") ?? "[]"))
  
  useEffect(() => {
    localStorage.setItem("temp-todo", JSON.stringify(todoItems), [todoItems])
  })

  return (
    <div className="App">
      <header className="App-header">
        <EditableList handleAdd={c => setTodoItems([...todoItems, c])} handleDelete={c => setTodoItems(todoItems.filter(x => x !== c))}>
          {todoItems}
        </EditableList>
      </header>
    </div>
  );
}

export default App;
