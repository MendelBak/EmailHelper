import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '0px' }} />
      {/* If 'touched' and 'error' (objects on the 'meta' object) are true, return the 'error' (meta.error) validation to the user*/}
      <div className='red-text' style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
