import { Figure } from '../Figure';

export default function Pyramid(props) {
  const { color, length, height, angles } = props;

  const radius = length / Math.sqrt(2 - 2 * Math.cos((2 * Math.PI) / angles));

  return (
    <Figure {...props} rotation={[0, Math.PI / angles, 0]}>
      <coneGeometry args={[radius, height, angles]} />
      <meshPhongMaterial color={color} transparent />
    </Figure>
  );
}
