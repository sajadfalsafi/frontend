import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

const Home = () => <div>Home Page</div>;
const Tools = () => <div>Tools Page</div>;
const AboutMe = () => <div>About Me Page</div>;
const ContactMe = () => <div>Contact Me Page</div>;

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/contact-me" element={<ContactMe />} />
      </Routes>
    </Router>
  );
};

export default App;
