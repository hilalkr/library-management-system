import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar'; 
import Signup from './signup';
import Login from './login';
import Dashboard from './dashboard';
import ForgotPassword from './ForgotPassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResetPasswordForm from './NewPassword';


function App() {
  const [username, setUsername] = useState("");

  const handleLogin = (enteredUsername) => {
    setUsername(enteredUsername);
  };

  return (
    <BrowserRouter>
      <Sidebar /> 
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/login'
          element={<Login handleLogin={handleLogin} />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path='/reset-password/:resetToken' element={<ResetPasswordForm />} />
        <Route
          path="/dashboard"
          element={<Dashboard username={username} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
