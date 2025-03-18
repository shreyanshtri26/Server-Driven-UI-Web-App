import React from 'react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <div className="confirm-dialog-header">
          <h3><i className="fas fa-exclamation-triangle"></i> {title}</h3>
        </div>
        <div className="confirm-dialog-body">
          <p>{message}</p>
        </div>
        <div className="confirm-dialog-footer">
          <button className="btn btn-outline" onClick={onCancel}>
            <i className="fas fa-times"></i> Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            <i className="fas fa-trash-alt"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 