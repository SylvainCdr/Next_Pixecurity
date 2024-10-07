import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './style.module.scss'; // Import du module SCSS

export const HomepageLinkedinFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const linkedInClientId = "78dsuja4oxkhno";
  const linkedInClientSecret = "WPL_AP1.wuccEDJUBCZw86nj.6MLFiA=="; // Replace with your actual client secret
  const redirectUri = "http://localhost:3000/callback";
  const linkedInAuth = () => {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedInClientId}&redirect_uri=${redirectUri}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
  };

  const getAccessToken = async (code) => {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${linkedInClientId}&client_secret=${linkedInClientSecret}`,
    });

    const data = await response.json();
    return data.access_token;
  };

  const fetchCompanyPosts = async (accessToken) => {
    const response = await fetch('https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:organization:YOUR_COMPANY_ID', { // Replace with your company ID
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des posts LinkedIn');
    }

    const data = await response.json();
    setPosts(data.elements); // Assuming 'elements' contains the post data
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      const fetchData = async () => {
        try {
          const accessToken = await getAccessToken(code);
          await fetchCompanyPosts(accessToken);
        } catch (error) {
          setError('Erreur lors de la récupération des données LinkedIn');
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      linkedInAuth(); // Redirect to LinkedIn auth if no code present
    }
  }, []);

  // Options for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.linkedinFeedContainer}>
      <h1>Flux LinkedIn</h1>
      {loading && <p>Chargement du flux...</p>}
      {error && <p>{error}</p>}
      
      <Slider {...settings}>
        {posts.map((post, index) => (
          <div key={index} className={styles.slickSlide}>
            <div className={styles.postCard}>
              <a href={post.permalinkUrl} target="_blank" rel="noopener noreferrer">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                {post.image && <img src={post.image} alt={post.title} />}
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
