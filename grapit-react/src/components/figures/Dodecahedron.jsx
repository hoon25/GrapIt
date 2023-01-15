import { Figure } from '../Figure';

export default function Dodecahedron(props) {
  const { length, color } = props;

  // console.log("Dodecahedron");
  // console.log(props);

  return (
    <Figure {...props}>
      <dodecahedronGeometry args={[length, 0]} />
      <meshPhongMaterial color={color} transparent />
    </Figure>
  );
}
