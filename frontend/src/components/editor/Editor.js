import React, { useState } from 'react';
import AceEditor from "react-ace";
import axios from 'axios'; 

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-xcode";
 
function Editor() {
  const [code , setCode] = useState("")
  const [output , setOutput] = useState("");
  return (
      <div>
        <div>
          <AceEditor
            mode="java"
            theme="xcode"
            onChange={(e) => {setCode(e)}}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
          />
      <button type="button" onClick = {async () => {
        console.log(code);
        let data = {
          code : code,
          lang : "java",
        }
        await axios.post("http://localhost:3001/compile", data)
        .then(res => setOutput(res.data))
        .catch( err => console.log(err))
        }}>SUBMIT</button>
        </div>
        <div style={{padding: "2%"}}>
          <pre>
            {output.exitCode ? output.stderr : output.stdout}
          </pre>
        </div>
      </div>
        )
}

export default Editor;