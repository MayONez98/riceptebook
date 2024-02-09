import axios from 'axios';
import React from 'react';

export default function Navbar({ user }) {
  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('/api/auth/logout');
      if (response.status === 200) window.location = '/';
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" style={{ color: 'white' }}>
              Hello,
              {' '}
              {user ? user.username : 'stranger'}
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dolphins">Dolphins</a>
            </li>
            {!user ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/auth/signup">Sign Up</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/auth/login">Login</a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/posts">Posts</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={logoutHandler}>Logout</a>
                </li>

              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
