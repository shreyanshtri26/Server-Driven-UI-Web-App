import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DynamicRenderer from '../components/DynamicRenderer';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ComponentsContainer = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchComponents();
  }, [token]);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/components', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Handle different response formats - ensure we always have an array
      if (response.data) {
        const componentsArray = Array.isArray(response.data) 
          ? response.data 
          : (typeof response.data === 'object' && response.data._id) 
            ? [response.data]
            : [];
            
        setComponents(componentsArray);
      } else {
        setComponents([]);
      }
      
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch components: ${err.response?.data?.message || err.message}`);
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading components...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <i className="fas fa-exclamation-triangle"></i>
      <div className="error-message">{error}</div>
      <div className="action-buttons">
        <button onClick={fetchComponents} className="btn btn-secondary">
          <i className="fas fa-sync-alt"></i> Retry
        </button>
        <Link to="/dashboard" className="btn btn-primary">
          <i className="fas fa-plus-circle"></i> Create Component
        </Link>
      </div>
    </div>
  );

  // If no components found
  if (!components || components.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-puzzle-piece"></i>
        <h2>No Components Found</h2>
        <p>You haven't created any UI components yet. Get started by creating your first component!</p>
        <div className="action-buttons">
          <button onClick={fetchComponents} className="btn btn-secondary">
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
          <Link to="/dashboard" className="btn btn-primary">
            <i className="fas fa-plus-circle"></i> Create Your First Component
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="components-page">
      <div className="components-header">
        <h1><i className="fas fa-puzzle-piece"></i> Your Components</h1>
        <div className="header-actions">
          <button onClick={fetchComponents} className="btn btn-secondary">
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
          <Link to="/dashboard" className="btn btn-primary">
            <i className="fas fa-plus-circle"></i> Create New Component
          </Link>
        </div>
      </div>
      
      <div className="components-container">
        {components.map((component, index) => (
          <div 
            key={component._id || index} 
            className="component-wrapper"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <h3>
              {componentTypeIcon(component.data?.type)} {component.name}
            </h3>
            <div className="component-content">
              <DynamicRenderer componentData={component.data} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to determine icon based on component type
const componentTypeIcon = (type) => {
  if (type === 'button') return <i className="fas fa-hand-pointer"></i>;
  if (type === 'div' && type.props?.className === 'dynamic-alert') return <i className="fas fa-exclamation-circle"></i>;
  return <i className="fas fa-square"></i>; // Default for cards/divs
};

export default ComponentsContainer; 