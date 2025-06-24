import React from 'react';
import RegisterForm from '../basic_components/registerForm.jsx';
import Navbar from '../basic_components/navbar.jsx';
import Footer from '../basic_components/footer.jsx';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const handleSuccessfulSubmit = ()=> {
    navigate('/home');
  }

  return (
    <>
      <div className='nav-bar'>
        <Navbar />
      </div>
      <div className="register-form" >
        <RegisterForm onSuccessfulSubmit={handleSuccessfulSubmit}/>
      </div>
      <div className='footer'>
       <Footer />
      </div>
    </>
  )

}

export default RegisterPage;
