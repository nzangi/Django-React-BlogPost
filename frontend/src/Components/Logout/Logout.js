import React, {useState,useEffect,useContext} from 'react'
import './Logout.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'

const Logout = () => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const {setIsLoggedIn} = useContext(AuthContext);


    const token = localStorage.getItem('userLoginResponseToken')

    const signOutUser = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/users/logout/`, {}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setMessage(response.data.message);
            // clear the token  userLoginUsername
            localStorage.removeItem('userLoginResponseToken');
            localStorage.removeItem('userLoginUsername');

        
            setTimeout(() => {
                setIsLoggedIn(false);
                navigate('/login')
            }, 1000);
            
        } catch (error) {
            // set error message from django
            setError(error.response.data.error);
            // setError('Could not logout out');

            console.log('Error is :', error.response.data.error);

        }
    }

    // prevent button default form submission 
    const handleSignOutUser = (e) => {
        e.preventDefault();
        signOutUser();

    }
    // prevent button default form submission 

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/home');
    }
    return (
        <div className='logout'>
            <div>
                {message && <p className='logout-message'>{message}</p>}
                {error && <p className='logout-error'>{error}</p>}
                <form className='form-logout'>
                    <h6>Are you sure you want to logout?</h6>
                    <div className='buttons'>
                        <button className='btn btn-primary' type='submit' onClick={handleCancel}>Cancel</button>
                        <button className='btn btn-danger' type='submit' onClick={handleSignOutUser}>Logout</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Logout