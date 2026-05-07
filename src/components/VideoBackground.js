import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

const FADE_DURATION = 0.5;

export default function VideoBackground() {
  const { colors } = useTheme();
  const videoRef = useRef(null);
  const rafRef   = useRef(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      if (!video.duration) { rafRef.current = requestAnimationFrame(tick); return; }
      const t = video.currentTime;
      const d = video.duration;
      const timeLeft = d - t;
      if (t < FADE_DURATION) {
        video.style.opacity = String(t / FADE_DURATION);
      } else if (timeLeft < FADE_DURATION) {
        video.style.opacity = String(timeLeft / FADE_DURATION);
      } else {
        video.style.opacity = '1';
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => { video.currentTime = 0; video.play(); }, 100);
    };

    video.style.opacity = '0';
    video.play().catch(() => {});
    rafRef.current = requestAnimationFrame(tick);
    video.addEventListener('ended', handleEnded);
    return () => { cancelAnimationFrame(rafRef.current); video.removeEventListener('ended', handleEnded); };
  }, []);

  if (Platform.OS !== 'web') return null;

  const bg = colors.background;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <div style={{
        position: 'absolute', top: '280px', left: 0, right: 0, bottom: 0,
        overflow: 'hidden', zIndex: 0,
      }}>
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0 }}
        />
      </div>
      {/* Gradient: tema rengiyle video üzerini örter */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: `linear-gradient(to bottom, ${bg} 0%, transparent 30%, transparent 70%, ${bg} 100%)`,
      }} />
    </View>
  );
}
