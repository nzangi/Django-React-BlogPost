import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div>
        <div className='footer-left'>
          <h4>HOME</h4>
          <p>Blog Post </p>
          <p>Community </p>
          <p>Terms of Service</p>



        </div>
        <div className='middle-footer'>
          <h4>SERVICES</h4>
          <p>Support</p>
          <p>Blog Post Foundation</p>
          <p>Privacy Policy</p>
          <p>Cookie Settings</p>

        </div>
        <div className='footer-right'>
          <h4>CONTACT US</h4>
          <p>CONTACT NUMBER </p>
          <p>+25400998877</p>
          <p>Location, Nairobi Kenya</p>
        </div>
        
      </div>
      <hr/>
      <p className='bottom-footer'> © 2024 BlogPost® Global Inc. </p>

    </footer>
  )
}

export default Footer