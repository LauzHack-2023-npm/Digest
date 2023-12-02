import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import Page2 from './pages/page2';
import { ContextProvider } from './components/ContextProvider';
import AddDigestPage from "./pages/add-digest";
import Footer from './components/Footer';
import Navbar from "./components/navbar";


function App() {

  const navbarHeight = "52px";
  const footerHeight = "48px";

  return (
    <div className="bg-background min-h-screen">
      <BrowserRouter className="flex h-full w-full">
        <ContextProvider>
          <Navbar height={navbarHeight}/>
          <div className="m-auto max-w-2xl">
            <Routes>
              <Route path="/" element={<HomePage navbarHeight={navbarHeight} footerHeight={footerHeight}/>}/>
              <Route path="/page2" Component={Page2}/>
              <Route path="/add-digest" Component={AddDigestPage}/>
            </Routes>
          </div>
          <Footer height={footerHeight}/>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


