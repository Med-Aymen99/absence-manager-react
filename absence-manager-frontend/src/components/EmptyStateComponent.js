import React from 'react';

const EmptyStateComponent = () => {
  return (
    <div className="empty-state">
      <h2>No absences found</h2>
      <p>There is no data available at the moment.</p>
    </div>
  );
};

export default EmptyStateComponent;