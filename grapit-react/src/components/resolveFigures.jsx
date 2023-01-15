import Box from './figures/Box';
import Cube from './figures/Cube';
import Sphere from './figures/Sphere';
import Tetrahedron from './figures/Tetrahedron';
import TwoPointedLine from './figures/TwoPointedLine';
import Octahedron from './figures/Octahedron';
import Dodecahedron from './figures/Dodecahedron';
import Icosahedron from './figures/Icosahedron';

export function resolveFigures(figure, i) {
  let {
    figureId,
    type,
    color,
    position,
    length,
    radius,
    point1,
    point2,
    size,
  } = figure;

  if (type !== 'twoPointedLine' && position.length === 1) {
    position = [0, 0, 0];
  }

  switch (type) {
    case 'box':
      return (
        <Box key={figureId} color={color} size={size} position={position} />
      );
    case 'cube':
      return (
        <Cube
          key={figureId}
          figureId={figureId}
          color={color}
          length={length}
          position={position}
        />
      );
    case 'sphere':
      return <Sphere key={figureId} {...figure} />;
    case 'twoPointedLine':
      return <TwoPointedLine key={figureId} {...figure} />;
    case 'tetrahedron':
      return (
        <Tetrahedron
          key={figureId}
          length={calculateRadius(length, 'tetrahedron')}
          {...figure}
        />
      );
    case 'octahedron':
      return (
        <Octahedron
          key={figureId}
          length={calculateRadius(length, 'octahedron')}
          {...figure}
        />
      );
    case 'dodecahedron':
      return (
        <Dodecahedron
          key={figureId}
          length={calculateRadius(length, 'dodecahedron')}
          {...figure}
        />
      );
    case 'icosahedron':
      return (
        <Icosahedron
          key={figureId}
          length={calculateRadius(length, 'icosahedron')}
          {...figure}
        />
      );

    default:
      return null;
  }
}

function calculateRadius(l, type) {
  switch (type) {
    case 'tetrahedron':
      return l * 0.612372;
    case 'octahedron':
      return l * 0.707107;
    case 'dodecahedron':
      return l * 1.401259;
    case 'icosahedron':
      return l * 0.951057;
  }
}
