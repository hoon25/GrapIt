import { Figure } from '../Figure';

export default function Sphere(props) {
  const { radius, color } = props;

  // console.log("Sphere");
  // console.log(props);

  return (
    <Figure {...props}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhongMaterial color={color} transparent />
    </Figure>
  );
}
