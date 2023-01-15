import { Line } from '@react-three/drei/core';

export default function TwoPointedLine(props) {
  const { point1, point2, color } = props;

  return <Line points={[...point1, ...point2]} linewidth={4} color={color} />;
}
