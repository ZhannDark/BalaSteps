import Title from 'antd/es/typography/Title';
import React from 'react';
import news1 from '../../images/main_content/news/photo3 2.png';
import news2 from '../../images/main_content/news/photo4 1.png';
import news3 from '../../images/main_content/news/photo5 1.png';

const News = () => {
  return (
    <div className="news-section">
      <div className="news-title-container">
        <Title className="news-title">
          <div className="news-title-line"></div>
          NEWS
          <div className="news-title-line"></div>
        </Title>
      </div>
      <div className="news-container">
        <div className="news-item">
          <img src={news1} alt="News 1" className="news-image" />
          <p className="news-text">
            The issues of parents raising special needs children were discussed
            at the JSDP platform.
          </p>
        </div>
        <div className="news-item">
          <img src={news2} alt="News 2" className="news-image" />
          <p className="news-text">A special day for special children.</p>
        </div>
        <div className="news-item">
          <img src={news3} alt="News 3" className="news-image" />
          <p className="news-text">
            A sports relay competition was held among special needs children in
            Nur-Sultan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
