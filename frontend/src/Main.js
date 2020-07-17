import React from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import Editor from './components/editor/Editor';


function Main() {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path='/editor'><Editor/></Route>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default Main
