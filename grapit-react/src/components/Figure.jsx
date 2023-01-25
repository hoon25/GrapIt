import React, { useState, useRef } from 'react';
import { useToggle } from '../hooks';

export function Figure(props) {
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  // todo - useToggle
  const [toggle, setToggle] = useToggle();

  const mesh = useRef();

  return (
    <mesh
      ref={mesh}
      {...props}
      onClick={event => {
        setToggle();
      }}
      onPointerOver={event => setHover(true)}
      onPointerOut={event => setHover(false)}
      onPointerUp={event => setClicked(false)}
      onPointerDown={event => setClicked(true)}
    >
      {props.children[0]}
      {React.cloneElement(props.children[1], {
        opacity: hovered || props.transparent ? 0.7 : 1.0,
        specular: clicked || props.polish ? 0xffffff : 0x000000,
      })}
    </mesh>
  );
}
