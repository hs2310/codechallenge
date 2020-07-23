import React, { useState } from 'react';
import AceEditor from "react-ace";
import axios from 'axios';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-monokai";


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/MenuIcon';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Editor() {
  const classes = useStyles();
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("java");
  const [theme, setTheme] = useState("monokai");
  const [lang, setLang] = useState("java");

  let handleChange = (e) => {
    setLang(e.split(',')[0]);
    setMode(e.split(',')[1]);
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <strong>#</strong>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Code Challenge
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: "9%", width: "100%" }}>
        <div>
          <FormControl style={{ width: "20%" }}>
            <InputLabel id="select-theme">Theme</InputLabel>
            <Select
              labelId="select-theme"
              id="theme"
              value={theme}
              onChange={(e) => {
                setTheme(e.target.value)
              }}
            >
              <MenuItem value="xcode">xcode</MenuItem>
              <MenuItem selected value="monokai">sublime</MenuItem>
              <MenuItem value="eclipse">eclipse</MenuItem>
              <MenuItem value="dreamweaver">dreamweaver</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ width: "20%", marginLeft: "60%" }}>
            <InputLabel id="select-lang">Language</InputLabel>
            <Select
              labelId="select-lang"
              id="lang"
              value={mode}
              onChange={(e) => { handleChange(e.target.value) }}
            >
              <MenuItem selected value="java,java">java</MenuItem>
              <MenuItem value="c,c_cpp">C</MenuItem>
              <MenuItem value="c++,c_cpp">C++</MenuItem>
              <MenuItem value="python2,python">python2</MenuItem>
              <MenuItem value="python3,python">python3</MenuItem>
            </Select>
          </FormControl>



          <Paper elevation={3} style={{ marginTop: "2%", padding: "2%" }}>
            <AceEditor
              mode={mode}
              theme={theme}
              onChange={(e) => { setCode(e) }}
              placeholder="Write your code here  ; )"
              fontSize={18}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={``}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2
              }}
              style={{ width: "100%" }} />
          </Paper>
          <div style={{ marginTop: "2%" }}>
            <Button variant="contained" type="button" color="primary" onClick={async () => {
              console.log(code);
              let data = {
                code: code,
                lang: lang,
              }
              await axios.post("http://localhost:3001/compile", data)
                .then(res => setOutput(res.data))
                .catch(err => console.log(err))
            }}>Run Code</Button>
          </div>
        </div>
        <Card style={{ padding: "2%", backgroundColor: "#f4f4f4", marginTop: "2%" }}>
          <CardContent>
            OUTPUT :
            <pre>
              {output.exitCode ? output.stderr : output.stdout}
            </pre>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default Editor;