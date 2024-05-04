import React, { useContext, useEffect, useState } from 'react'
import './CreateAccount.css'
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("userLoginResponseToken");


  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);

    }
  }, [])


  // Function to handle file input change
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]; // Get the selected image file
    if (selectedImage) {
      setImage(selectedImage); // Set the selected image file to state
    }
  };


  //username, email, 
  const handleAccountCreation = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    try {
      // const formData = new FormData(); // Create a new FormData object
      // formData.append('title', title);
      // formData.append('description', description);
      // formData.append('image', image); // Append the image file to the FormData object

      // console.log(formData);
      console.log('Image File:', image);

      const response = await axios.post(`http://127.0.0.1:8000/account/create_profile/`,
        {title,description,image},
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
      setMessage(response.data.message)
      navigate("/account");

    } catch (error) {
      setError(error.response.data.error)

    }
  }


  return (
    <div >
      {message && <p className='update-message'>{message}</p>}
      {error && <p className='error-message'>{error}</p>}

      <form onSubmit={handleAccountCreation}>
        <h1>Create Account Form</h1>
        {/* <input class="form-control" type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input class="form-control" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
        <input class="form-control" type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} />

        <button type='submit'>Create Account</button>
      </form>

    </div>
  )
}

export default CreateAccount