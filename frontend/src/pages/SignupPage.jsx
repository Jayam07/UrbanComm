import React from 'react'
import Signup from "../components/Signup/Signup.jsx"
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  },)

  return (
    <div>
      <Signup/>
    </div>
  )
}

export default SignupPage
