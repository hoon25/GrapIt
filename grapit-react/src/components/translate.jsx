export function translate(figureType) {
  switch (figureType) {
    case 'twoPointedLine':
      return '선분';
    case 'sphere':
      return '구';
    case 'platonicSolid':
      return '정다면체';
    case 'tetrahedron':
      return '정사면체';
    case 'cube':
      return '정육면체';
    case 'octahedron':
      return '정팔면체';
    case 'dodecahedron':
      return '정십면체';
    case 'icosahedron':
      return '정이십면체';
    default:
      return '###';
  }
}
