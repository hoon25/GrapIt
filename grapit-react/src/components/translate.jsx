export function translate(figureType) {
  switch (figureType) {
    case 'twoPointedLine':
      return '선분';
    case 'plane':
      return '평면';
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
      return '정십이면체';
    case 'icosahedron':
      return '정이십면체';
    case 'cylinder':
      return '원기둥';
    case 'truncatedCone':
      return '원뿔대';
    case 'cone':
      return '원뿔';
    case 'pyramid':
      return '각뿔';
    case 'prism':
      return '각기둥';
    case 'frustum':
      return '각뿔대';
    case 'Line':
      return '일차함수';
    case 'TwoD':
      return '이차함수';
    case 'Circle':
      return '원';
    default:
      return '###';
  }
}
