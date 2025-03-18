import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [formError, setFormError] = useState('');
  const { register, error } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { name, email, password, password2 } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    if (password !== password2) {
      setFormError('Passwords do not match');
      return;
    }
    
    setFormError('');
    setLoading(true);
    
    const success = await register(name, email, password);
    
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    }
  };
  
  return (
    <div className="register-container">
      <h1><i className="fas fa-user-plus"></i> Register</h1>
      
      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}
      
      {formError && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {formError}
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            <i className="fas fa-user"></i> Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            <i className="fas fa-envelope"></i> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <i className="fas fa-lock"></i> Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Create a password"
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">
            <i className="fas fa-lock"></i> Confirm Password
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            placeholder="Confirm your password"
            minLength="6"
            required
          />
        </div>
        <button 
          type="submit" 
          className={`btn btn-primary btn-block ${loading ? 'pulse' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Registering...
            </>
          ) : (
            <>
              <i className="fas fa-user-plus"></i> Register
            </>
          )}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register; 