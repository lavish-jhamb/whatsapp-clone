import React, { useState } from 'react';
import './App.css'
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { Switch, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider'

function App() {

  const [{ user }, dispatch] = useStateValue();

  return (<>
    <div className="app">
      {!user ? (
        <Login />
      ) : (

          <div className="app_body">

            <Sidebar />
            <Switch>

              <Route path="/rooms/:roomId">
                <Chat />
              </Route>

            </Switch>

          </div>
        )}
    </div>
  </>
  );
}

export default App;
