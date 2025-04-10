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

export default function EditableList({children, handleAdd}) {
    return (
        <>
            <ul className="todo-list">
                {children.map(c => (
                    <li key={c.key}>
                        <div className="editable-content">{c}</div>
                    </li>
                    ))}
            </ul>
            <AddByText handleAdd={handleAdd} />
        </>
    )
}