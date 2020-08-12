import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard component</div>
      <div className='fixed-action-btn'>
        <button className='btn-floating btn-large red'>
          <Link to={'/survey/new'}>
            <i className='material-icons'>add</i>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
