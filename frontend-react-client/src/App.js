import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import Page2 from './pages/page2';
import Navbar from './components/navbar';
import { ContextProvider } from './components/ContextProvider';
import AddDigestPage from "./pages/add-digest";


function App() {

  return (
    <div className="bg-background min-h-screen">
      <BrowserRouter className="flex h-full w-full"> 
        <ContextProvider>
          <Navbar/>
          <Routes>
            <Route path="/" Component={HomePage}/>
            <Route path="/page2" Component={Page2}/>
            <Route path="/add-digest" Component={AddDigestPage}/>
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


