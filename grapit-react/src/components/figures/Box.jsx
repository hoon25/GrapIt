import { Figure } from '../Figure';

export default function Box(props) {
  const { size, color } = props;

  return (
    <Figure {...props}>
      <boxGeometry args={size} />
      <meshPhongMaterial color={color} transparent />
    </Figure>
  );
}
