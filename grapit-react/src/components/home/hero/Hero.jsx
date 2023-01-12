import React from 'react';
import Heading from '../../common/Heading';
import './hero.css';

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <Heading
            title="수학을 쉽게 Grap-It "
            subtitle="그래프가 어려운 학생을 위한 최고의 과외 서비스"
          />

          <form className="flex">
            <div className="box">
              {/* <h4>그래프 그려보기</h4> */}
              <button className="custom-btn btn-3">그래프 그려보기</button>
            </div>
            <div className="box">
              {/* <h4>맞춤 선생님 확인하기</h4> */}
              <button className="custom-btn btn-3">맞춤 선생님 확인하기</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
