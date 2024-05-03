import React from 'react'
import './Register.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_passowrd, setConfirm_passowrd] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [registering,SetIsRegistering] = useState(false);
    const navigate = useNavigate();



    const handleRegister = async (e) =>{
        e.preventDefault();
        SetIsRegistering(true);
        try {
            const response = await axios.post(`http://127.0.0.1:8000/users/register/`,{
                username,email,password,confirm_passowrd
            })
            setError(response.data.error);
            setMessage(response.data.message);
            navigate('/login')
        } catch (error) {
            setError('Could not handle register')
            console.log('Error is :',error);
            
        }
        setTimeout(() => {
            SetIsRegistering(false);
        }, 1000);
    }

    return (
        <div className='register-div'>
            <div className='container'>
                {error && <p className='error-message'>{error}</p>}
                {message && <p className='register-message'>{message}</p>}
                <form onSubmit={handleRegister} className='register-form' >
                    <h1>Register</h1>
                    <div className='form-group'>
                        <input class="form-control" type="text" placeholder="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        <input class="form-control" type="email" placeholder="Enter Your Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input class="form-control" type="password" placeholder="Enter Your Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        <input class="form-control" type="password" placeholder="Confirm Your Password" value={confirm_passowrd} onChange={(e)=>setConfirm_passowrd(e.target.value)}/>
                    </div>

                    <div className='register-page'>
                    <button className='btn btn-primary'>
                        { registering ? 'Registering ...':'Register'}
                    </button>
                        <p>Already have an account? <span><Link to='/login'>Sign In</Link></span></p>
                    </div>
                </form>

            </div>


        </div>
    )
}

export default Register