import React, {useState,useEffect} from 'react'
import './Logout.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const token = localStorage.getItem('responseToken')

    const signOutUser = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/users/logout/`, {}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setMessage(response.data.message);
            // clear the token
            localStorage.removeItem('responseToken');

            setTimeout(() => {
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