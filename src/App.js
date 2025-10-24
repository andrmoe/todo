import './App.css';
import { useState, useEffect } from 'react';


function MetaListEntry({children, handleSelect, number}) {
  return (
    <ul className="list-item">
      <li className="list-item-child">{children}</li><li><div className="count">{number}</div></li><li className="right-button"><button className="right-button" onClick={handleSelect}>❒</button></li>
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

function findAllLists(todoItems) {
  let allLists = []
  let allListNames = []
  todoItems.forEach(todo => {
    if (!allListNames.includes(todo.list)) {
      allLists.push({"list": todo.list, "count": todoItems.filter(t => t.list === todo.list && t.text !== "").length})
      allListNames.push(todo.list)
    }
  })
  return allLists
}

function ListView({lists, addList, selectList}) {
  return (
    <ul className="list">
      {lists.map(l => <li key={l.list}><MetaListEntry key={l.list} number={l.count} handleSelect={() => selectList(l.list)}>{l.list}</MetaListEntry></li>)}
      <li><AddByText handleAdd={addList} /></li>
    </ul>)
}

function MoveItemComponent({lists, itemToBeMoved, moveItem, resetItemToBeMoved}) {
  return <>
    <h3>Move "{itemToBeMoved.text}"</h3>
    <button onClick={() => {resetItemToBeMoved()}}>Back</button>
    <ul className="list">
      {lists.filter(l => l.list !== itemToBeMoved.list).map(l => 
        <li key={l.list}>
          <MetaListEntry key={l.list} number={l.count} handleSelect={() => {moveItem(l)}}>
              {l.list}
          </MetaListEntry>
        </li>)}
    </ul>
  </>
}

function TodoView({gotoLists, list, items, setItemToBeMoved, addItem, deleteItem}) {
  return <><button onClick={() => gotoLists()}>Lists</button>
  <h3>{list}</h3>
  <ul className="list">
    {items.map(todo => <li key={todo.text}><Todo handleDelete={() => deleteItem(todo)}
    handleMove={() => setItemToBeMoved(todo)}>{todo.text}</Todo></li>)}
    <li><AddByText handleAdd={addItem} />
    </li>
  </ul>
  </>
}

export default function App() {
  const [todoItems, setTodoItems] = useState(JSON.parse(sessionStorage.getItem("temp-todo") ?? "[]"))
  const [currentList, setCurrentList] = useState(null)
  const [itemToBeMoved, setItemToBeMoved] = useState(null)

  useEffect(() => {
    sessionStorage.setItem("temp-todo", JSON.stringify(todoItems), [todoItems])
  })

  let content;
  if (currentList === null) {
    content = <ListView 
                lists={findAllLists(todoItems)} 
                addList={text => setTodoItems([...todoItems, {"text": "", "list": text}])} 
                selectList={setCurrentList}/>
    
  } else if (itemToBeMoved !== null) {
    content = <MoveItemComponent 
                lists={findAllLists(todoItems)} 
                itemToBeMoved={itemToBeMoved} 
                moveItem={(l) => {
                  setTodoItems([...todoItems.filter(t => t !== itemToBeMoved), {...itemToBeMoved, list: l.list}])
                  setItemToBeMoved(null)
                }} 
                resetItemToBeMoved={() => setItemToBeMoved(null)}
              />
  } else {
    content = <TodoView gotoLists={() => setCurrentList(null)} 
                list={currentList} 
                items={todoItems.filter(todo => todo.list === currentList && todo.text !== "")} 
                setItemToBeMoved={setItemToBeMoved} 
                addItem={text => setTodoItems([...todoItems, {"text": text, "list": currentList}])}
                deleteItem={item => {setTodoItems(todoItems.filter(t => t !== item))}}/>
  }
  return (
    <div className="App">
      <div className="App-header">
        {content}
      </div>
    </div>
  );
}
