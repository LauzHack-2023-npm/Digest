import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import Page2 from './pages/page2';
import { ContextProvider } from './components/ContextProvider';
import AddDigestPage from "./pages/add-digest";
import Container from '@mui/material/Container';
import Navbar from "./components/navbar";



function App() {

  return (
    <div className="bg-background min-h-screen">
      <BrowserRouter className="flex h-full w-full">
        <ContextProvider>
          <Navbar/>
          <Container maxWidth="sm">
              <Routes>
                <Route path="/" Component={HomePage}/>
                <Route path="/page2" Component={Page2}/>
                <Route path="/add-digest" Component={AddDigestPage}/>
              </Routes>
          </Container>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


