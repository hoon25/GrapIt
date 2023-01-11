import React from "react"
import "./footer.css"

const Footer = () => {
  return (
    <>
   

      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              
              <h2>Do You Need Help With Anything?</h2>
              <p>원하는 선생님과 쉽게 수학을 배워봐요</p>

              <div className='input flex'>
                <input type='text' placeholder='이차함수' />
                <button>Find</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <span>Team: Oak Barrel</span>
      </div>
    </>
  )
}

export default Footer
