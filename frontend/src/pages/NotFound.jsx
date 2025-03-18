import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="empty-state">
      <i className="fas fa-map-signs"></i>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <div className="action-buttons">
        <Link to="/" className="btn btn-primary">
          <i className="fas fa-home"></i> Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 