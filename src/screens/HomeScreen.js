import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

function WebHero({ navigation }) {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.innerWidth < 900,
    []
  );
  const menuItems = [
    { label: 'Home', color: '#000000', screen: 'Home' },
    { label: 'Studio', color: '#6F6F6F', screen: 'MBTI' },
    { label: 'About', color: '#6F6F6F', screen: 'Enneagram' },
    { label: 'Journal', color: '#6F6F6F', screen: 'Kaynaklar' },
    { label: 'Reach Us', color: '#6F6F6F', screen: 'CharacterGuide' },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const fadeDuration = 0.5;

    const tick = () => {
      if (!video.duration) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const t = video.currentTime;
      const d = video.duration;
      const timeLeft = d - t;

      if (t < fadeDuration) {
        video.style.opacity = String(t / fadeDuration);
      } else if (timeLeft < fadeDuration) {
        video.style.opacity = String(timeLeft / fadeDuration);
      } else {
        video.style.opacity = '1';
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.style.opacity = '0';
    video.play().catch(() => {});
    video.addEventListener('ended', handleEnded);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: '300px', inset: 'auto 0 0 0', zIndex: 0, overflow: 'hidden' }}>
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0 }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, #FFFFFF 0%, transparent 50%, #FFFFFF 100%)',
          boxShadow: 'inset 0 -180px 260px -70px rgba(255, 255, 255, 1)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <nav style={{ padding: '24px 32px' }}>
          <div
            style={{
              maxWidth: '80rem',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigation.navigate('Home')}
                style={{
                  background: 'transparent',
                  border: 0,
                  padding: 0,
                  color: '#000000',
                  fontSize: '30px',
                  letterSpacing: '-0.02em',
                  fontFamily: '"Instrument Serif", serif',
                  cursor: 'pointer',
                }}
              >
                Aethera<sup style={{ fontSize: '12px', top: '-1.1em', position: 'relative' }}>®</sup>
              </button>
              {!isMobile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => navigation.navigate(item.screen)}
                      style={{
                        background: 'transparent',
                        border: 0,
                        fontSize: '14px',
                        color: item.color,
                        fontFamily: '"Inter", sans-serif',
                        transition: 'color 220ms ease',
                        cursor: 'pointer',
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => navigation.navigate('MBTI')}
              style={{
                borderRadius: '9999px',
                padding: '10px 24px',
                fontSize: '14px',
                background: '#000000',
                color: '#FFFFFF',
                border: 0,
                fontFamily: '"Inter", sans-serif',
                transform: 'scale(1)',
                transition: 'transform 180ms ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Begin Journey
            </button>
          </div>
          {isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px', gap: '16px', flexWrap: 'wrap' }}>
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigation.navigate(item.screen)}
                  style={{
                    background: 'transparent',
                    border: 0,
                    fontSize: '14px',
                    color: item.color,
                    fontFamily: '"Inter", sans-serif',
                    transition: 'color 220ms ease',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>

        <section style={{ paddingTop: 'calc(8rem - 75px)', paddingBottom: '10rem', paddingLeft: '24px', paddingRight: '24px' }}>
          <div
            style={{
              maxWidth: '80rem',
              margin: '0 auto',
              minHeight: '60vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <h1
              className="animate-fade-rise"
              style={{
                margin: 0,
                maxWidth: '80rem',
                color: '#000000',
                fontFamily: '"Instrument Serif", serif',
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: '-2.46px',
                fontSize: 'clamp(3rem, 9vw, 7rem)',
              }}
            >
              Beyond <em style={{ color: '#6F6F6F', fontStyle: 'italic' }}>silence,</em> we build{' '}
              <em style={{ color: '#6F6F6F', fontStyle: 'italic' }}>the eternal.</em>
            </h1>

            <p
              className="animate-fade-rise-delay"
              style={{
                marginTop: '32px',
                maxWidth: '50rem',
                color: '#6F6F6F',
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
                lineHeight: 1.7,
              }}
            >
              Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft
              digital havens for deep work and pure flows.
            </p>

            <div className="animate-fade-rise-delay-2" style={{ marginTop: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => navigation.navigate('MBTI')}
                style={{
                  borderRadius: '9999px',
                  padding: '20px 56px',
                  fontSize: '16px',
                  background: '#000000',
                  color: '#FFFFFF',
                  border: 0,
                  fontFamily: '"Inter", sans-serif',
                  transform: 'scale(1)',
                  transition: 'transform 180ms ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Begin Journey
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function HomeScreen({ navigation }) {
  if (Platform.OS === 'web') return <WebHero navigation={navigation} />;

  return (
    <View style={s.nativeFallback}>
      <Text style={s.nativeTitle}>Indoles</Text>
      <Text style={s.nativeSubtitle}>Web hero tasarimi web surumu icin uygulanmistir.</Text>
      <TouchableOpacity style={s.nativeButton} onPress={() => navigation.navigate('MBTI')}>
        <Text style={s.nativeButtonText}>Begin Journey</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  nativeFallback: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  nativeTitle: {
    color: '#000000',
    fontSize: 38,
    marginBottom: 12,
  },
  nativeSubtitle: {
    color: '#6F6F6F',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 28,
  },
  nativeButton: {
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  nativeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
