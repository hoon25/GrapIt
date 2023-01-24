import { Figure } from '../Figure';

export default function Tetrahedron(props) {
  const { length, color } = props;

  return (
    <Figure {...props}>
      <tetrahedronGeometry args={[length, 0]} />
      <meshPhongMaterial color={color} transparent />
    </Figure>
  );
}
