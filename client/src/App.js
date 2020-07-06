import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from "./providers/PostProvider";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./Header";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <Router>
        <PostProvider>
          <UserProfileProvider>
          <Header/>
          <ApplicationViews />
          </UserProfileProvider>
        </PostProvider>
      </Router>
    </div>
  );
}

export default App;