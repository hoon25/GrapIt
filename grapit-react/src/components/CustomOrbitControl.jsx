import React, { useEffect, useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Calling extend with the native OrbitControls class from Three.js
// will make orbitControls available as a native JSX element.
// Notice how the OrbitControls classname becomes lowercase orbitControls when used as JSX element.
extend({ OrbitControls });

export function CameraControls(props) {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state, delta, xrFrame) => {
    camera.updateProjectionMatrix();
    // if (props.isMouseDown) {
    //   controls.current.update();
    // }
  });

  useEffect(() => {
    controls.current.addEventListener('change', props.onChange);
    return () => {};
  }, [props.onChange]);

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      maxAzimuthAngle={Math.PI * 2 - 0.01}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={0}
      minPolarAngle={0}
    />
  );
}
