import { OrthographicCamera } from '@react-three/drei/core';
import { OrbitControls } from '@react-three/drei/web';
import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Axis from './Axis';
import { PointLights } from './PointLights';
import { resolveFigures } from './resolveFigures';
import { debounce } from 'lodash';
import { data } from '../data.js';

function ThreeDimensionCanvas(props) {
  const cameraRef = useRef();
  const [unit, setUnit] = useState(6);

  const figureStore = useSelector(state => state.figure.figures);

  const adjustScale = debounce(() => {
    const zoom = cameraRef.current.zoom;
    const newUnit = parseInt(360 / zoom);
    const upperLimit = 60;

    if (newUnit > unit) {
      setUnit(newUnit < upperLimit ? newUnit : upperLimit);
    }
  }, 600);

  return (
    <Canvas>
      <color attach="background" args={['#000000']} />
      <OrthographicCamera
        position={[100, 50, 100]}
        zoom={60}
        ref={cameraRef}
        makeDefault
      />
      <OrbitControls
        enableDamping={false}
        onChange={() => {
          adjustScale();
        }}
      />
      <ambientLight />
      <directionalLight position={[0, 0, 10]} intensity={0.8} />
      <PointLights />

      <Axis axis="x" length={unit * 2} />
      <Axis axis="y" length={unit} />
      <Axis axis="z" length={unit * 2} />
      <gridHelper args={[unit * 4 - 2, unit * 4 - 2, '', 'gray']} />

      {figureStore.map((figure, i) => resolveFigures(figure, i))}
    </Canvas>
  );
}
export default ThreeDimensionCanvas;
