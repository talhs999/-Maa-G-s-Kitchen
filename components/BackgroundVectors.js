'use client';

import styles from './BackgroundVectors.module.css';

export default function BackgroundVectors() {
  return (
    <div className={styles.vectorLayer}>
      {/* Subtle spice/splash pattern 1 */}
      <svg className={styles.splash1} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="var(--primary-yellow)" opacity="0.04" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,72.3,41.2C63.1,53.3,50.3,63.1,36.5,70.5C22.7,77.8,7.9,82.8,-7.4,81.1C-22.7,79.4,-38.4,71,-51.1,60.1C-63.8,49.2,-73.4,35.8,-78.4,21.1C-83.3,6.3,-83.5,-9.7,-78.8,-24.5C-74.1,-39.3,-64.5,-52.8,-52,-60.7C-39.5,-68.6,-24.1,-70.9,-8.8,-75.6C6.5,-80.4,13,-87.6,30.6,-83.6Z" transform="translate(100 100)" />
      </svg>
      
      {/* Chili Illustration Overlay */}
      <svg className={styles.chiliVector} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '20%', left: '5%', width: '150px', opacity: 0.03, fill: 'var(--primary-yellow)' }}>
        <path d="M495.8,44.7c-21.3-21.3-55.8-21.3-77.1,0L241.1,222.3c-10.7,10.7-16.7,25.2-16.7,40.3c0,15.1,6,29.6,16.7,40.3l37.1,37.1c10.7,10.7,25.2,16.7,40.3,16.7c15.1,0,29.6-6,40.3-16.7l177.6-177.6C517.1,100.5,517.1,66,495.8,44.7z M342.3,313.4c-4.8,4.8-11.2,7.5-18.1,7.5c-6.9,0-13.3-2.7-18.1-7.5l-37.1-37.1c-4.8-4.8-7.5-11.2-7.5-18.1c0-6.9,2.7-13.3,7.5-18.1l159.2-159.2c10-10,26.2-10,36.2,0c10,10,10,26.2,0,36.2L342.3,313.4z" />
        <path d="M128,256c-70.7,0-128,57.3-128,128s57.3,128,128,128s128-57.3,128-128S198.7,256,128,256z M128,460.8c-41.2,0-76.8-35.6-76.8-76.8c0-41.2,35.6-76.8,76.8-76.8s76.8,35.6,76.8,76.8C204.8,425.2,169.2,460.8,128,460.8z" />
      </svg>

      {/* Subtle splash pattern 2 */}
      <svg className={styles.splash2} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="var(--primary-yellow)" opacity="0.02" d="M38.1,-65.4C50.3,-58.4,61.9,-49.6,69.5,-38.4C77.1,-27.1,80.7,-13.6,79.6,-0.6C78.5,12.3,72.7,24.6,64.4,35.1C56.1,45.5,45.3,54.1,33.5,60.5C21.6,66.8,8.8,70.8,-3.3,76.5C-15.4,82.2,-26.8,89.5,-37.2,88.1Z" transform="translate(100 100)" />
      </svg>

      {/* Grid cross patterns */}
      <div className={styles.crossPattern} />
    </div>
  );
}
