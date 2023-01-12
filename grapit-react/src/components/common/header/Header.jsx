import React, { useState } from 'react';
import './header.css';
import { nav } from '../../data/Data';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';

const Header = () => {
  const [navList, setNavList] = useState(false);

  let user = useSelector(state => state.user);
  let navigate = useNavigate();

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <h5>GrapIt</h5>
          </div>
          <nav class="stroke">
            <ul className={navList ? 'small' : 'flex'}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}

              {user.nickName == null ? (
                <li>
                  <Link to="/login">로그인</Link>
                </li>
              ) : (
                <li>
                  {user.nickName} <Link to="/logout">로그아웃</Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="button-flex">
            {/* <button className='btn3'>
              <i className='fa fa-sign-out'></i> 로그인
            </button> */}
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
