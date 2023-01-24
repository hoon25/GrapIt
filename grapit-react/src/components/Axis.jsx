import { Line, Text } from '@react-three/drei';
import { range } from '../libs';
import * as THREE from 'three';

function Axis(props) {
  const rotation = getRotationAmount(props.axis);
  const color = getAxisColor(props.axis);
  const textRotFix = getTxtRotFixAmount(props.axis);

  const indices = range(1 - props.length, props.length);

  return (
    <mesh position={[0, 0, 0]} rotation={rotation}>
      <Line
        points={[-props.length, 0, 0, props.length, 0, 0]}
        linewidth={2}
        color={color}
      />
      {indices
        .filter(i => i !== 0)
        .map(index => (
          <Index
            key={index}
            axisIndex={index}
            color={color}
            textRotFix={textRotFix}
          />
        ))}

      <AxisCone position={props.length} color={color} />
    </mesh>
  );
}

function Index(props) {
  const { axisIndex, color, textRotFix } = props;

  return (
    <mesh position={[axisIndex, 0, 0]}>
      <Text
        color={color}
        fontSize={0.4}
        position={[0, 0.3, 0]}
        anchorX="center"
        anchorY="middle"
        rotation={textRotFix}
      >
        {axisIndex}
      </Text>
      <mesh>
        <sphereGeometry attach="geometry" args={[0.08, 32, 32]} />
        <meshStandardMaterial attach="material" color={color} />
      </mesh>
    </mesh>
  );
}

function AxisCone(props) {
  return (
    <mesh position={[props.position, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
      <coneGeometry attach="geometry" args={[0.2, 1, 32]} />
      <meshStandardMaterial attach="material" color={props.color} />
    </mesh>
  );
}

function getRotationAmount(axis) {
  if (axis === 'y' || axis === 'Y') return [0, 0, Math.PI / 2];
  if (axis === 'z' || axis === 'Z') return [0, -Math.PI / 2, 0];
  return [0, 0, 0];
}

function getAxisColor(axis) {
  if (axis === 'y' || axis === 'Y') return new THREE.Color(0x66ff66);
  if (axis === 'z' || axis === 'Z') return new THREE.Color(0x6666ff);
  return new THREE.Color(0xff6666);
}

function getTxtRotFixAmount(axis) {
  if (axis === 'y' || axis === 'Y') return [0, 0, -Math.PI / 2];
  if (axis === 'z' || axis === 'Z') return [0, Math.PI / 2, 0];
  return [0, 0, 0];
}

export default Axis;
