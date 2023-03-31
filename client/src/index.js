import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './app.js'
import { MUIApp } from './muiApp'

//changed from document.getElementById('app')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <MUIApp/>
  </React.StrictMode>
)

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './app'

// ReactDOM.render(<App />, document.getElementById('app'));

