import React from 'react';

const DynamicRenderer = ({ componentData }) => {
  const renderComponent = (data) => {
    // If data is a string or number, just return it
    if (typeof data === 'string' || typeof data === 'number') {
      return data;
    }
    
    // If data is null or undefined, return null
    if (!data) {
      return null;
    }
    
    // Get component type, props and children
    const { type, props = {}, children = [] } = data;
    
    // If no type is specified, return null
    if (!type) {
      return null;
    }
    
    // Add animation classes to enhance visual appeal
    if (props.className && props.style) {
      if (props.className === 'dynamic-card') {
        props.className = 'dynamic-card slide-in';
      } else if (props.className === 'dynamic-alert') {
        props.className = 'dynamic-alert slide-in';
      } else if (props.className === 'dynamic-button') {
        props.className = 'dynamic-button slide-in';
      }
    }
    
    // Recursively render children
    const renderedChildren = Array.isArray(children) 
      ? children.map((child, index) => (
          <React.Fragment key={index}>
            {renderComponent(child)}
          </React.Fragment>
        ))
      : children;
    
    // Create element with the specified type, props and children
    return React.createElement(type, props, renderedChildren);
  };

  try {
    return (
      <div className="dynamic-component-wrapper">
        {renderComponent(componentData)}
      </div>
    );
  } catch (error) {
    return (
      <div className="error-message">
        <i className="fas fa-exclamation-triangle"></i> Error rendering component
      </div>
    );
  }
};

export default DynamicRenderer; 