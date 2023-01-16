import { Line } from '@react-three/drei/core';
import { useState } from 'react';

export default function TwoPointedLine(props) {
  const { point1, point2, color } = props;
  const [hovered, setHover] = useState(false);

  return (
    <Line
      points={[...point1, ...point2]}
      linewidth={hovered || props.thick ? 10 : 4}
      color={color}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    />
  );
}
