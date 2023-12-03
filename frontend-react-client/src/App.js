import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ContextProvider } from "./components/ContextProvider";
import DigestSourcesForm from "./components/DigestSourcesForm";
import Footer from "./components/Footer";
import ResponsiveAppBar from "./components/ResponsiveNavbar";
import AddDigestPage from "./pages/add-digest";
import DigestPage from "./pages/digest";
import HomePage from "./pages/home";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { darken, lighten } from 'polished';


const customTheme = createTheme({
  palette: {
    primary: {
      main: '#058ED9', 
    },
    secondary: {
      main: '#DE6449', 
    },
    error: {
      main: '#E3170A', 
    },
    success: {
      main: '#679436',
    },
    warning: {
      main: '#F08700',
    },
    info: {
      main: '#679436',
    },
    text: {
      primary: '#121113', // Your primary text color
      secondary: lighten(0.1, '#121113'), // Your secondary text color
    },
    background: {
      default: '#F4EBD9', // Your default background color
      paper: lighten(0.1, '#F4EBD9'), // Your paper/background color for surfaces like cards
    },
  },
});

function App() {
	return (
		<div className="bg-background min-h-screen">
			<BrowserRouter className="flex h-full w-full">
        <ThemeProvider theme={customTheme}>
          <ContextProvider>
            <ResponsiveAppBar />
            <div className="m-auto max-w-2xl min-h-screen">
              <Routes>
                <Route path="/" Component={HomePage} />
                {/* <Route path="/page2" Component={Page2} /> */}
                <Route path="/add-digest" Component={AddDigestPage} />
                <Route path="/finalize-digest-sources" Component={DigestSourcesForm} />
                <Route exact path="/digest/:id" Component={DigestPage} />
              </Routes>
            </div>
            <Footer />
          </ContextProvider>
        </ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
