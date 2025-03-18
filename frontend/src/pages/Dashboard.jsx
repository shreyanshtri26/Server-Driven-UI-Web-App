import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    componentType: 'card',
    title: '',
    content: '',
    backgroundColor: '#f0f0f0',
    textColor: '#000000'
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, componentType, title, content, backgroundColor, textColor } = formData;

  const onChange = e => {
    const value = e.target.type === 'color' ? e.target.value : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const createComponentData = () => {
    // Basic card component
    if (componentType === 'card') {
      return {
        type: 'div',
        props: {
          className: 'dynamic-card',
          style: {
            padding: '20px',
            margin: '10px',
            backgroundColor,
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }
        },
        children: [
          {
            type: 'h2',
            props: {
              style: {
                color: textColor
              }
            },
            children: [title]
          },
          {
            type: 'p',
            props: {
              style: {
                color: textColor
              }
            },
            children: [content]
          }
        ]
      };
    }
    
    // Alert component
    if (componentType === 'alert') {
      return {
        type: 'div',
        props: {
          className: 'dynamic-alert',
          style: {
            padding: '15px',
            margin: '10px',
            backgroundColor,
            borderRadius: '4px',
            borderLeft: `5px solid ${textColor}`,
            color: textColor
          }
        },
        children: [
          {
            type: 'h3',
            props: {},
            children: [title]
          },
          {
            type: 'p',
            props: {},
            children: [content]
          }
        ]
      };
    }
    
    // Button component
    if (componentType === 'button') {
      return {
        type: 'button',
        props: {
          className: 'dynamic-button',
          style: {
            padding: '10px 20px',
            backgroundColor,
            color: textColor,
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }
        },
        children: [content]
      };
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const componentData = {
        name,
        data: createComponentData()
      };
      
      await axios.post('/api/components', componentData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      
      setMessage('Component created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        componentType: 'card',
        title: '',
        content: '',
        backgroundColor: '#f0f0f0',
        textColor: '#000000'
      });
      
      // Redirect to components page after a delay
      setTimeout(() => {
        navigate('/components');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating component');
    } finally {
      setLoading(false);
    }
  };

  // Create a component preview based on current form data
  const renderPreview = () => {
    if (!title && !content) return null;
    
    return (
      <div className="component-preview">
        <h3><i className="fas fa-eye"></i> Preview</h3>
        <div style={{
          border: '1px dashed #ccc',
          padding: '20px',
          marginTop: '15px',
          borderRadius: '8px'
        }}>
          {componentType === 'card' && (
            <div style={{
              padding: '20px',
              backgroundColor,
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ color: textColor }}>{title || 'Title'}</h2>
              <p style={{ color: textColor }}>{content || 'Content'}</p>
            </div>
          )}
          
          {componentType === 'alert' && (
            <div style={{
              padding: '15px',
              backgroundColor,
              borderRadius: '4px',
              borderLeft: `5px solid ${textColor}`,
              color: textColor
            }}>
              <h3>{title || 'Alert Title'}</h3>
              <p>{content || 'Alert content'}</p>
            </div>
          )}
          
          {componentType === 'button' && (
            <button style={{
              padding: '10px 20px',
              backgroundColor,
              color: textColor,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              {content || 'Button Text'}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <i className="fas fa-user-circle"></i>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome {user?.name || 'User'}, create your dynamic UI components below</p>
        </div>
      </div>
      
      {message && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i> {message}
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}
      
      <div className="component-form-container">
        <h2>
          <i className="fas fa-plus-circle"></i> Create New Component
        </h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <i className="fas fa-tag"></i> Component Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter a name for your component"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="componentType">
              <i className="fas fa-th-large"></i> Component Type
            </label>
            <select
              id="componentType"
              name="componentType"
              value={componentType}
              onChange={onChange}
              required
            >
              <option value="card">Card</option>
              <option value="alert">Alert</option>
              <option value="button">Button</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="title">
              <i className="fas fa-heading"></i> Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Enter component title"
              required={componentType !== 'button'}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">
              <i className="fas fa-align-left"></i> Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={onChange}
              placeholder="Enter component content"
              required
            />
          </div>
          
          <div className="form-group color-picker-group">
            <label htmlFor="backgroundColor">
              <i className="fas fa-fill-drip"></i> Background Color
            </label>
            <div className="color-input-container">
              <input
                type="color"
                id="backgroundColor"
                name="backgroundColor"
                value={backgroundColor}
                onChange={onChange}
              />
              <span className="color-value">{backgroundColor}</span>
            </div>
          </div>
          
          <div className="form-group color-picker-group">
            <label htmlFor="textColor">
              <i className="fas fa-font"></i> Text Color
            </label>
            <div className="color-input-container">
              <input
                type="color"
                id="textColor"
                name="textColor"
                value={textColor}
                onChange={onChange}
              />
              <span className="color-value">{textColor}</span>
            </div>
          </div>
          
          {renderPreview()}
          
          <button 
            type="submit" 
            className={`btn btn-primary btn-block ${loading ? 'pulse' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Creating Component...
              </>
            ) : (
              <>
                <i className="fas fa-plus-circle"></i> Create Component
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard; 