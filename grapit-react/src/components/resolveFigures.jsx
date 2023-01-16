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
    case 'tetrahedron':
      length = calculateRadius(length, 'tetrahedron');
      break;
    case 'octahedron':
      length = calculateRadius(length, 'octahedron');
      break;
    case 'dodecahedron':
      length = calculateRadius(length, 'dodecahedron');
      break;
    case 'icosahedron':
      length = calculateRadius(length, 'icosahedron');
      break;
    default:
      break;
  }

  switch (type) {
    case 'box':
      return (
        <Box key={figureId} color={color} size={size} position={position} />
      );
    case 'cube':
      return <Cube key={figureId} {...figure} />;
    case 'sphere':
      return <Sphere key={figureId} {...figure} />;
    case 'twoPointedLine':
      return <TwoPointedLine key={figureId} {...figure} />;
    case 'tetrahedron':
      return <Tetrahedron key={figureId} {...figure} length={length} />;
    case 'octahedron':
      return <Octahedron key={figureId} {...figure} length={length} />;
    case 'dodecahedron':
      return <Dodecahedron key={figureId} {...figure} length={length} />;
    case 'icosahedron':
      return <Icosahedron key={figureId} {...figure} length={length} />;

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
    default:
      return null;
  }
}
