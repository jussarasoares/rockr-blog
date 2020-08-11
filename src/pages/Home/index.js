import React, { useState, useEffect } from 'react';

import Card from '../../components/Card';
import api from '../../services/api';

import './styles.css';

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api
      .get('articles', {
        params: { _page: 1, _limit: 11 },
      })
      .then((response) => {
        setArticles(response.data);
      });
  }, []);

  let gridCount = 0;
  const gridClass = [
    'double',
    'double',
    'single-right',
    'double photo-right',
    'double photo-right',
    'single-left',
  ];

  return (
    <div className="home">
      <div className="home__posts">
        {articles.map((article) => {
          if (gridCount > 5) {
            gridCount = 0;
          }

          const cardClass = `home__post ${gridClass[gridCount]}`;
          gridCount++;

          const description = `${article.article
            .replace(/<p>/g, '')
            .replace(/<\/p>/g, ' ')
            .substr(0, 100)} ...`;

          return (
            <Card
              className={cardClass}
              title={article.title}
              description={description}
              photo={article.imageUrl}
              author={article.author}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
