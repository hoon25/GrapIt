import React from 'react';
import Heading from '../../common/Heading';
import './Featured.css';
import FeaturedCard from './FeaturedCard';

const Featured = () => {
  return (
    <>
      <section className="featured background">
        <div className="container">
          <Heading
            title="Grap-It 제공 서비스"
            subtitle="Find All Type of Property."
          />
          <FeaturedCard />
        </div>
      </section>
    </>
  );
};

export default Featured;
