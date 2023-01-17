// import React from 'react';
// import { Link } from 'react-router-dom';
// import './hero.css';
// import { Button } from './Button';
// import './Button.css';
// import { Buttonas } from './buttonas';

// const Hero = () => {
//   return (
//     <div className="hero-container">
//       <video src="/videos/video-1.mp4" autoPlay loop muted />
//       <h1>수학을 쉽게 Grap-It</h1>
//       <p>그래프가 어려운 학생을 위한 최고의 과외 서비스</p>
//       <div className="hero-btns">
//         <Buttonas
//           className="btns"
//           buttonStyle="btn--outline"
//           buttonSize="btn--large"
//         >
//           그래프 그려보기
//         </Buttonas>
//         <Button
//           className="btns"
//           buttonStyle="btn--primary"
//           buttonSize="btn--large"
//           onClick={console.log('왱')}
//         >
//           맞춤 선생님 찾기 <i className="far fa-play-circle" />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from 'react';
import { Link } from 'react-router-dom';
import './hero.css';
import { Button } from './Button';
import './Button.css';
import { Buttonas } from './buttonas';
import Typewriter from 'typewriter-effect';
// import { home } from './data1';

const Hero = () => {
  return (
    <div className="hero-container">
      <video
        className="main-video"
        src="/videos/video-1.mp4"
        autoPlay
        loop
        muted
      />
      <h1>
        <Typewriter
          options={{
            strings: ['수학을 쉽게 Grap-It', '중등 수학 플랫폼'],
            autoStart: true,
            loop: true,
            typeSpeed: 70,
            deleteSpeed: 70,
          }}
        />
      </h1>
      {/* <h1>수학을 쉽게 Grap-It</h1> */}
      <p>그래프가 어려운 학생을 위한 최고의 과외 서비스</p>
      <div className="hero-btns">
        <Buttonas
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          그래프 그려보기
        </Buttonas>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={console.log('왱')}
        >
          맞춤 선생님 찾기 <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
