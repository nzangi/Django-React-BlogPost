import React, { useContext, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const [loggedInUser, setLoggedInUser] = useState(false);
    const {setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoggedInUser(false)
        try {
            const response = await axios.post(`http://127.0.0.1:8000/users/login/`, {
                username, password
            })

            setMessage(response.data.message)

            // Log the entire response for debugging
        // STORE THE TOKEN WHICH WILL ENABLE USER TO USE THE PAGE
            const userLoginResponseToken = response.data.token
            console.log('User Token:',userLoginResponseToken);

            if (response.status === 200) {
                localStorage.setItem('userLoginResponseToken',userLoginResponseToken); // Store login status
                // setIsLogginIn(true);
                setTimeout(() => {
                    setIsLoggedIn(true)
                    navigate('/posts');
                }, 1000);

            }

        } catch (error) {
            if(error.response){
                setError(error.response.data.error)
                console.log('Error: '+error.response.data.error);
            }

        } finally {
            setTimeout(() => {
                setLoggedInUser(false);
            }, 1000);
        }

    }


    return (
        <div className='login-div'>
            {error && <p className='login-error-message'>{error}</p>}
            {message && <p className='message'>{message}</p>}
            <div className='container'>
                <form onSubmit={handleLogin} className='login-form'>
                    <h1>Login</h1>
                    <div className='form-group'>
                        <input class="form-control" type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input class="form-control" type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className='login-page'>
                        <button className='btn btn-primary'>
                            {loggedInUser ? 'Logging In ...' : 'Login'}
                        </button>
                        <p>Do not have have an account? <span>Register Here</span> <Link to='/register'>Sign Up</Link></p>
                    </div>
                </form>

            </div>


        </div>
    )
}

export default Login