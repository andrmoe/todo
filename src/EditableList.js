import { useState } from "react"
import Todo from "./Todo"

function AddTodo({handleAddTodo}) {
    const [text, setText] = useState("")
    return (
    <div>
        <input value={text} onChange={e => {setText(e.target.value)}}/>
        <button onClick={() => {
                    setText("")
                    handleAddTodo(<Todo text={text}></Todo>)
            }}
        > + </button>
    </div>)
}

export default function EditableList({initialList}) {
    const [clist, setClist] = useState(initialList)

    return (
        <>
            <ul className="todo-list">
                {clist.map(component => (
                    <li>
                        <ul className="editable-component">
                            <li className="editable-content">{component}</li>
                            <li className="delete-component"><button onClick={() => setClist(clist.filter(c => c !== component))}>Del</button></li>
                        </ul>
                    </li>
                    ))}
            </ul>
            <AddTodo handleAddTodo={c => setClist([...clist, c])} />
        </>
    )
}