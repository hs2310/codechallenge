import React from 'react';
import AceEditor from "react-ace";
 
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-xcode";
 
function onChange(newValue) {
  console.log("change", newValue);
}

function Editor() {
    return (
        <div>
            <AceEditor
              mode="java"
              theme="xcode"
              onChange={onChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
        </div>
          )
}

export default Editor;