// import React from 'react'

// export default function FooterComponent() {
//   return (
//     <div>FooterComponent</div>
//   )
// }


// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Moon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left - Organized by + Khademy logo + description */}
        <div className="footer-section organized-by">
          <div className="logo-group">
            <h4>Organized by</h4>
            <img 
              src="public/logo.jpg" 
              alt="Khademy Logo" 
              className="logo khademy-logo"
            />
            <p>Institute of Science and Technology<br />Advanced Development</p>
          </div>
        </div>

        {/* Center - KU logo + slogan */}
        <div className="footer-section ku-brand">
          <img 
            src="public/logoISTAD.png" 
            alt="KU Logo" 
            className="logo ku-logo"
          />
          <p className="slogan">
            Where Industry Experts Build<br />
            Tomorrow's Innovators.
          </p>
        </div>

        {/* Right - Explore + Contact us */}
        <div className="footer-section links-group">
          <div className="explore">
            <h4>Explore</h4>
            <ul>
              <li><a href="/courses">Course</a></li>
              <li><a href="/library">Library</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/about">About us</a></li>
            </ul>
          </div>

          <div className="contact">
            <h4>Contact us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="Facebook" />
              </a>
              <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer">
                <img src="/icons/telegram.svg" alt="Telegram" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/youtube.svg" alt="YouTube" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.svg" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Optional copyright line */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Khademy - Institute of Science and Technology Advanced Development</p>
      </div>
    </footer>
  );
};

export default Footer;