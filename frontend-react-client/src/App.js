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

function App() {
	return (
		<div className="bg-background min-h-screen">
			<BrowserRouter className="flex h-full w-full">
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
			</BrowserRouter>
		</div>
	);
}

export default App;
