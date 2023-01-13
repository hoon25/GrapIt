import '../css/floatingButton.css';
import { setUser } from '../store/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsWhiteBoard } from '../store/isWhiteBoardSlice';

export function FloatingButton() {
  let [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="menu">
      <input
        type="checkbox"
        onClick={() => {
          if (!isSelected) {
            setIsSelected(true);
            dispatch(setIsWhiteBoard(true));
          } else {
            setIsSelected(false);
            dispatch(setIsWhiteBoard(false));
          }
        }}
        value={isSelected}
        className="menu-open"
        name="menu-open"
        id="menu-open"
      />
      <label className="menu-open-button" htmlFor="menu-open">
        <span className="hamburger hamburger-1"></span>
        <span className="hamburger hamburger-2"></span>
        <span className="hamburger hamburger-3"></span>
      </label>

      <a href="#" className="menu-item">
        {' '}
      </a>
      <a href="#" className="menu-item">
        {' '}
      </a>
      <a href="#" className="menu-item">
        {' '}
      </a>
      <a href="#" className="menu-item">
        {' '}
      </a>
      <a href="#" className="menu-item">
        {' '}
      </a>
      <a href="#" className="menu-item">
        {' '}
      </a>
      <a href="#" className="menu-item">
        {' '}
      </a>
      <a href="#" className="menu-item">
        {' '}
      </a>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ zIndex: 997 }}
      >
        <defs>
          <filter id="shadowed-goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix
              in="shadow"
              mode="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
              result="shadow"
            />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feComposite in2="shadow" in="goo" result="goo" />
            <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
