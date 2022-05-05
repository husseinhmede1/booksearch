import { useEffect } from 'react';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import { gapi } from 'gapi-script';
import './App.css';
import Login from "./components/login";
import Search from './components/search/search';
import Info from './components/search/info/info';

const client_id =  '358597847515-pl4k0o9dj1hbb53tsifknsa7e560ci3j.apps.googleusercontent.com';

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: "" 
      })
    };
    gapi.load('client:auth2', start);
  });


  return (
  <div className="App">
    <BrowserRouter>
       <Routes>
          <Route exact path="/" element= {<Login/>}/>
          <Route exact path="/search" element= {<Search/>}/>
          <Route exact path="/info/:id" element= {<Info/>}/>
        </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
