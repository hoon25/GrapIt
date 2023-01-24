import React, { useState, useEffect } from 'react';
// import './switchStyles.css';
import { ArrowsMove, PencilFill } from 'react-bootstrap-icons';
import { changeIsWhiteBoard } from '../../store/isWhiteBoardSlice';
import { useDispatch } from 'react-redux';

export default function ThemeToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  const toggleState = () => {
    setIsEnabled(prevState => !prevState);
  };

  return (
    <label className="toggle-menu-wrapper" htmlFor="toggle-menu">
      <div
        className={`toggle-menu ${isEnabled ? 'open' : 'close'}`}
        style={{ zIndex: '999' }}
      >
        <div className="icons">
          <ArrowsMove />
          <PencilFill />
        </div>
        <input
          id="toggle-menu"
          name="toggle-menu"
          type="checkbox"
          className="menu-open"
          checked={isEnabled}
          onClick={() => {
            toggleState();
            dispatch(changeIsWhiteBoard.toggleIsWhiteBoard());
          }}
        />
      </div>
    </label>
  );
}
