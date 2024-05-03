import React, { useContext, useEffect, useState } from 'react'
import './UpdateAccount.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const UpdateAccount = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState('')
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("userLoginResponseToken");

  useEffect(() => {
    fetchAccount();
  }, [])

  const fetchAccount = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/account/update_profile/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setIsLoggedIn(true);
      setAccount(response.data);
      console.log(setAccount(response.data));
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  // handleImageChange = (e) =>{
  //   setAccount({ ...account, image: e.target.files[0] })
  // }

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    if (!account) {
      return;
    }

    try {
      const response = await axios.put(`http://127.0.0.1:8000/account/update_profile/`, {
        username: account.username, email: account.email, title: account.title, description: account.description, image: account.image
      },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setMessage(response.data.message)
      setIsLoggedIn(true);
      navigate("/account");
    } catch (error) {
      setError(error.response.data.error);
    }
  }


  return (
    <div className='update'>
      {message && <p className='update-message'>{message}</p>}
      {account ? (
        <form className='account-form' onSubmit={handleAccountUpdate}>
          <h2>Update Your Account</h2>
          <input
            type="text"
            value={account.username}
            onChange={(e) => setAccount({ ...account, username: e.target.value })}
          />
          <input
            type='text'
            value={account.email}
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
          />
          <input
            type='text'
            value={account.title}
            onChange={(e) => setAccount({ ...account, title: e.target.value })}
          />
          <textarea
            value={account.description}
            onChange={(e) => setAccount({ ...account, description: e.target.value })}
          />
          <p>
            <img src={`http://127.0.0.1:8000${account.image}`}></img>
            <input type='file'
              accept="image/png, image/jpeg, image/jpg" onChange={(e) => setAccount({ ...account, image: e.target.files[0] })}
            />

          </p>
          <button type='submit'>Update Account</button>
        </form>
      ) : (<p>Loading account details</p>)
      }
    </div>
  )
}

export default UpdateAccount