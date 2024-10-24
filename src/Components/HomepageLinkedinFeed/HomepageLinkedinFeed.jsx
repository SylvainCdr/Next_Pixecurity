import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './style.module.scss'; // Import du module SCSS

export const HomepageLinkedinFeed = () => {

  const [linkedinFeed, setLinkedinFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  

 

  useEffect(() => {
    fetch('http://localhost:3001/linkedin-feed')
      .then(response => response.json())
      .then(data => {
        setLinkedinFeed(data.elements); // Parfois les posts sont dans 'elements'
        setLoading(false);
      })
      .catch(error => console.error('Erreur:', error));
  }, []);

  return (
    <div className={styles.linkedinFeed}>
      <h2>LinkedIn Feed</h2>
      <Slider>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );

};


