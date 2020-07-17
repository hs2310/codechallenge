import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './Main';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;
