import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Axis from './Axis';
import { PointLights } from './PointLights';
import { resolveFigures } from './resolveFigures';
import { debounce, throttle } from 'lodash';
import * as _ from 'lodash';
import { Button, Stack } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { threeJsCamera, resetCamera } from './threeJsCamera';
import { CameraControls } from './CustomOrbitControl';

function ThreeDimensionCanvas(props) {
  const [unit, setUnit] = useState(6);
  const [axesVisible, setAxesVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const figureStore = useSelector(state => state.figure.figures);

  const adjustScale = debounce(() => {
    const zoom = threeJsCamera.zoom;
    const newUnit = parseInt(360 / zoom);
    const upperLimit = 60;

    if (newUnit > unit) {
      setUnit(newUnit < upperLimit ? newUnit : upperLimit);
    }
  }, 600);

  const sendCameraInfo = throttle(() => {
    const camera = {
      id: threeJsCamera.uuid,
      zoom: (threeJsCamera.zoom * 1490) / window.innerWidth,
      position: [...threeJsCamera.position],
      rotation: [...threeJsCamera.rotation].slice(0, 3),
    };

    props.sendObjectInfo('CAMERA3D', '', JSON.stringify(camera));
  }, 150);

  return (
    <div style={{ width: '100%', position: 'relative', aspectRatio: 1.49 }}>
      <Canvas
        camera={threeJsCamera}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
      >
        <color attach="background" args={['#000000']} />
        <CameraControls
          onChange={() => {
            sendCameraInfo();
            adjustScale();
          }}
          isMouseDown={isMouseDown}
        />
        <ambientLight />
        <directionalLight position={[0, 0, 10]} intensity={0.8} />
        <PointLights />

        {axesVisible && (
          <>
            <Axis axis="x" length={unit * 2} />
            <Axis axis="y" length={unit} />
            <Axis axis="z" length={unit * 2} />
            <gridHelper args={[unit * 4 - 2, unit * 4 - 2, '', 'gray']} />
          </>
        )}

        {figureStore.map((figure, i) => resolveFigures(figure, i))}
      </Canvas>
      <Stack
        direction="vertical"
        gap={2}
        style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1000 }}
      >
        <Button
          onClick={() => {
            resetCamera();
            sendCameraInfo();
          }}
        >
          <Icon.ArrowRepeat size={32} color="white" />
        </Button>
        <Button
          variant={axesVisible ? 'primary' : 'secondary'}
          onClick={() => setAxesVisible(!axesVisible)}
        >
          {axesVisible ? (
            <Icon.EyeFill size={32} color="white" />
          ) : (
            <Icon.EyeSlashFill size={32} color="black" />
          )}
        </Button>
      </Stack>
    </div>
  );
}
export default ThreeDimensionCanvas;
