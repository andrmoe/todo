import { useState } from "react"

export function Import() {
    const [fileContent, setFileContent] = useState("")
    const reader = new FileReader()
    reader.onload = (e) => {
        setFileContent(e.target.result)
    }
    return <>
        <h1>Import from Remember the Milk</h1>
        <input type="file" id="remjson" onChange={(event) => {
            const selectedFile = event.target.files[0]
            if (selectedFile) {
                reader.readAsText(selectedFile)
            }
        }}/>
        <button onClick={}>Import</button>
        <div>{fileContent}</div>

    </>
}