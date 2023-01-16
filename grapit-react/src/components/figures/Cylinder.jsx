import { Figure } from '../Figure';

export default function Cylinder(props) {
  const { radius, height, color } = props;

  return (
    <Figure {...props}>
      <cylinderGeometry args={[radius, radius, height, 32]} />
      <meshPhongMaterial color={color} transparent />
    </Figure>
  );
}
