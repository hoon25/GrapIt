import { Figure } from '../Figure';

export default function Frustum(props) {
  const { length1, length2, height, angles, color } = props;

  const r1 = length1 / Math.sqrt(2 - 2 * Math.cos((2 * Math.PI) / angles));
  const r2 = length2 / Math.sqrt(2 - 2 * Math.cos((2 * Math.PI) / angles));

  return (
    <Figure {...props} rotation={[0, Math.PI / angles, 0]}>
      <cylinderGeometry args={[r1, r2, height, angles]} />
      <meshPhongMaterial color={color} transparent />
    </Figure>
  );
}
