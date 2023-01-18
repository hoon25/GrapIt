import { OrthographicCamera } from '@react-three/drei/core';
import { OrbitControls } from '@react-three/drei/web';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Axis from './Axis';
import { PointLights } from './PointLights';
import { resolveFigures } from './resolveFigures';
import { debounce, throttle } from 'lodash';
import { data } from '../data.js';
import { setCamera } from '../store/cameraSlice';
import { useDispatch } from 'react-redux';
import * as _ from 'lodash';
import { Button } from 'react-bootstrap';

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

  // todo - redux 적용하기
  useEffect(() => {
    if (!_.isEmpty(props.threeCamera)) {
      const { id, zoom, position, rotation } = props.threeCamera;

      console.log('cameraRef.current.uuid', cameraRef?.current?.uuid);
      console.log('id', id);
      console.log('True', id === cameraRef?.current?.uuid);

      if (cameraRef.current.uuid !== id) {
        cameraRef.current.zoom = zoom;
        cameraRef.current.position.set(...position);
        cameraRef.current.rotation.set(...rotation);

        cameraRef.current.updateProjectionMatrix();
      }
    }
  }, [props.threeCamera]);

  useEffect(() => {}, [props.figureList]);

  const updateCamera = debounce(() => {
    const camera = {
      id: cameraRef.current.uuid,
      zoom: cameraRef.current.zoom,
      position: [...cameraRef.current.position],
      rotation: [...cameraRef.current.rotation].slice(0, 3),
    };

    props.sendObjectInfo('CAMERA', JSON.stringify(camera));
  }, 1000);

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
          updateCamera();
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
