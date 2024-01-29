import { useState, useEffect } from 'react';
import axios from 'axios';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import styles from './MemeGallery.module.css';

const InfiniteMemeGallery = () => {
  const [memes, setMemes] = useState([]);
  const [after, setAfter] = useState(null);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get(`https://www.reddit.com/r/memes.json?limit=24${after ? `&after=${after}` : ''}`);
        const newMemes = response.data.data.children;
        setMemes((prevMemes) => [...prevMemes, ...newMemes]);
        setAfter(response.data.data.after);
      } catch (error) {
        console.error('Error fetching memes:', error);
      }
    };

    fetchMemes();
  }, [after]);

  const handleLoadMore = () => {
    // Fetch more memes when the user scrolls to the bottom
    fetchMemes();
  };

  return (
    <div>
      <h2 className={styles.galleryTitle}>Meme Gallery</h2>
      <div className={styles.galleryContainer}>
        <Gallery>
          {memes.map((meme, index) => (
            <Item
              key={index}
              original={meme.data.url}
              thumbnail={meme.data.thumbnail}
              width={meme.data.width}
              height={meme.data.height}
            >
              {({ ref, open }) => (
                <div
                  ref={ref}
                  className={styles.memeImageWrapper}
                  onClick={open}
                >
                  <img
                    src={meme.data.thumbnail}
                    alt={`Meme ${index}`}
                    className={styles.memeImage}
                  />
                </div>
              )}
            </Item>
          ))}
        </Gallery>
      </div>
      <div style={{ height: '50px' }}></div>
      {/* Add a spacer div to trigger infinite scrolling */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleLoadMore}>Load More Memes</button>
      </div>
    </div>
  );
};

export default InfiniteMemeGallery;
