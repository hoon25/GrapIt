import { Figure } from '../Figure';

export default function Octahedron(props) {
  const { length, color } = props;

  return (
    <Figure {...props}>
      <octahedronGeometry args={[length, 0]} />
      <meshPhongMaterial color={color} transparent />
    </Figure>
  );
}
