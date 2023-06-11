import React from 'react';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { ChakraBaseProvider } from '@chakra-ui/react';
import Signup from './Signup';

function App() {
  return (
    <div className="App">
      <ChakraBaseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </BrowserRouter>
      </ChakraBaseProvider>
    </div>
  );
}

export default App;












