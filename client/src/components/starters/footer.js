import React from 'react';


export default function Footer () {
    return (
        <>
        <footer id="footer">
            <div className="copyright">
              <ul className="icons">
                <li><a href="https://twitter.com/" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="https://www.facebook.com/" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                <li><a href="https://www.instagram.com/" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
              </ul>
              <p style = {{fontSize : 25 , fontWeight:300}}>DNA Match Pvt Ltd © 2021.</p>
            </div>
          </footer>
        </>
    )
}