import React from 'react';
import Header from './Header';
import TabNavigation from './TabNavigation';
import Footer from './Footer';

const Portfolio = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <TabNavigation />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;