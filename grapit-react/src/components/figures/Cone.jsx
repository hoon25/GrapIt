import { Figure } from '../Figure';

export default function Cone(props) {
  const { radius, height, color } = props;

  return (
    <Figure {...props}>
      <coneGeometry args={[radius, height, 32]} />
      <meshPhongMaterial color={color} transparent />
    </Figure>
  );
}
