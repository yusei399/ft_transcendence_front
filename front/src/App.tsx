import React from 'react';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { ChakraBaseProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <ChakraBaseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </BrowserRouter>
      </ChakraBaseProvider>
    </div>
  );
}

export default App;












