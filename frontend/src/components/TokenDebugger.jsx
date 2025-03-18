import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const TokenDebugger = () => {
  const { token, isAuthenticated, user } = useContext(AuthContext);
  const localToken = localStorage.getItem('token');
  
  return (
    <div className="token-debugger">
      <h2>Authentication Debug Info</h2>
      <div className="debug-info">
        <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
        <p><strong>User:</strong> {user ? user.name : 'Not loaded'}</p>
        <p><strong>Context Token:</strong> {token ? `${token.substring(0, 15)}...` : 'Not set'}</p>
        <p><strong>LocalStorage Token:</strong> {localToken ? `${localToken.substring(0, 15)}...` : 'Not set'}</p>
        <button 
          className="btn btn-warning"
          onClick={() => {
            // Force reload user with current token
            window.location.reload();
          }}
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default TokenDebugger; 