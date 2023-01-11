import React, { useState } from "react"
import "./header.css"
import { nav } from "../../data/Data"
import { Link } from "react-router-dom"


const Header = () => {
  const [navList, setNavList] = useState(false)

  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
          
           <h5>GrapIt</h5>
          </div>

          <nav class="stroke">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
              {/* <button className='btn3'>
              <i className='fa fa-sign-out'></i> 로그인
            </button> */}
            </ul>
          </nav>

          <div className='button-flex'>
            
            {/* <button className='btn3'>
              <i className='fa fa-sign-out'></i> 로그인
            </button> */}
          </div>
          

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
