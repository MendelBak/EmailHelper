import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li key='4'>
            <a href='/auth/google'>Login With Google</a>
          </li>
        );
      default:
        return [
          <li key='1'>
            <Payments />
          </li>,
          <li key='0'>
            <a href='/surveys'>Dashboard</a>
          </li>,
          <li key='2' style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key='3'>
            <a href='/api/logout'>Logout</a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            to={'/'}
            className='brand-logo left'
            style={{ marginLeft: '2%' }}
          >
            Email Helper
          </Link>
          <ul id='nav-mobile' className='right'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// Destructering in the paramter bring 'auth' from state.auth object
function mapStateToProps({ auth }) {
  // This returns a ley/value object like so {auth: state.auth}
  return { auth };
}

export default connect(mapStateToProps)(Header);
