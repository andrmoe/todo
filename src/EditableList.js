import { useState } from "react"


function AddByText({handleAdd}) {
    const [text, setText] = useState("")
    return (
    <div>
        <input value={text} onChange={e => {setText(e.target.value)}}/>
        <button onClick={() => {
                    setText("")
                    handleAdd(text)
            }}
        > + </button>
    </div>)
}

export default function EditableList({children, handleAdd, handleDelete}) {
    return (
        <>
            <ul className="todo-list">
                {children.map(c => (
                    <li key={c}>
                        <ul className="editable-component">
                            <li className="editable-content">{c}</li>
                            <li className="delete-component"><button onClick={() => handleDelete(c)}>✓</button></li>
                        </ul>
                    </li>
                    ))}
            </ul>
            <AddByText handleAdd={handleAdd} />
        </>
    )
}