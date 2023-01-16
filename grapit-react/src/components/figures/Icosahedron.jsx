import { Figure } from '../Figure';

export default function Icosahedron(props) {
  const { length, color } = props;

  return (
    <Figure {...props}>
      <icosahedronGeometry args={[length, 0]} />
      <meshPhongMaterial color={color} transparent />
    </Figure>
  );
}
