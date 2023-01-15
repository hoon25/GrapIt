import circleImg from './circle.png';
import styled from 'styled-components';

function OCR() {
  return (
    <div style={{ position: 'relative' }}>
      <img
        src={circleImg}
        style={{
          width: '40%',
          height: '40%',
        }}
      />
      <canvas
        style={{
          width: '10%',
          height: '10%',
          position: 'absolute',
          top: '60%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
        }}
      />
      <canvas
        style={{
          width: '10%',
          height: '10%',
          position: 'absolute',
          top: '30%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
        }}
      />
    </div>
  );
}

export default OCR;
