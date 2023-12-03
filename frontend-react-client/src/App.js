import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import Page2 from './pages/page2';
import { ContextProvider } from './components/ContextProvider';
import AddDigestPage from "./pages/add-digest";
import Footer from './components/Footer';
import ResponsiveAppBar from './components/ResponsiveNavbar';
import ResourcesForm from "./components/resourcesForm";


function App() {

  return (
    <div className="bg-background min-h-screen">
      <BrowserRouter className="flex h-full w-full">
        <ContextProvider>
          {/* <Navbar height={navbarHeight}/> */}
          <ResponsiveAppBar/>
          <div className="m-auto max-w-2xl min-h-screen">
            <Routes>
              <Route path="/" Component={HomePage}/>
              <Route path="/page2" Component={Page2}/>
              <Route path="/add-digest" Component={AddDigestPage}/>
              <Route path="/finalize-digest-sources" Component={ResourcesForm}/>
            </Routes>
          </div>
          <Footer/>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


