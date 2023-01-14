import React from 'react';

import './hero.css';
import { Button } from './Button';

const Hero = () => {
  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>수학을 쉽게 Grap-It</h1>
      <p>그래프가 어려운 학생을 위한 최고의 과외 서비스</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          그래프 그려보기
        </Button>
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
