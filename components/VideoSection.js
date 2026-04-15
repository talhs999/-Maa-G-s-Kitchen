'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './VideoSection.module.css';

const videos = [
  { id: '1', src: '/videos/vid1.mp4' },
  { id: '2', src: '/videos/vid2.mp4' },
  { id: '3', src: '/videos/vid3.mp4' },
  { id: '4', src: '/videos/vid4.mp4' },
];

export default function VideoSection() {
  return (
    <section className={`section ${styles.videoSection}`}>
      <div className="container">
        <motion.div
           className="section-header"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <span className="section-label">Authentic Experience</span>
          <h2>Maa G's Kitchen in Action 🔥</h2>
          <p>See our traditional recipes being crafted exactly how we make them in our kitchen.</p>
        </motion.div>

        <div className={styles.videoGrid}>
          {videos.map((vid, i) => (
             <VideoCard key={vid.id} src={vid.src} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ src, index }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // Fast speed per user request
    }
  }, []);

  return (
    <motion.div 
      className={styles.videoCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
       <video 
         ref={videoRef}
         src={src} 
         autoPlay 
         loop 
         muted 
         playsInline 
         className={styles.videoContent}
       />
       <div className={styles.videoOverlay}>
          {/* Subtle gradient overlay to match aesthetic */}
       </div>
    </motion.div>
  );
}
