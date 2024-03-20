import React, { useState } from 'react'
import './Login.css'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loggedIn, setIsLogginIn] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) =>{
    e.preventDefault()
    setIsLogginIn(true)

    try {
        const response = await axios.post(`http://127.0.0.1:8000/users/login/`,{
            username,password
        })
        if (response.status === 200) {
            localStorage.setItem('isLoggedIn', true); // Store login status
            navigate('/home')
        }else{
            setError('Login failed');
        }
        setError(response.data.error)
    } catch (error) {
        setError('Could not handle Sign In')
        console.log('Error is :',error);
        
    }finally{
        setTimeout(() => {
            setIsLogginIn(false);
        }, 1000);
    }
    
}



  return (
    <div className='login-div'>
            <div className='container'>
                {error && <p className='error-message'>{error}</p>}
                <form onSubmit={handleLogin} className='login-form'>
                    <h1>Login</h1>
                    <div className='form-group'>
                        <input class="form-control" type="text" placeholder="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        <input class="form-control" type="password" placeholder="Enter Your Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </div>

                    <div className='login-page'>
                    <button className='btn btn-primary'>
                        { loggedIn ? 'Logging In ...':'Login'}
                    </button>
                        <p>Do not have have an account? <span>Register Here</span> <Link to='/register'>Sign Up</Link></p>
                    </div>
                </form>

            </div>


        </div>
  )
}

export default Login