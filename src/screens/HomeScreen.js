import React, { useEffect, useRef } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import TopNav from '../components/TopNav';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

const BTN = {
  borderRadius: '9999px',
  padding: '20px 44px',
  fontSize: '16px',
  fontFamily: '"Inter", system-ui, sans-serif',
  transform: 'scale(1)',
  transition: 'transform 180ms ease',
  cursor: 'pointer',
};

function WebHero({ navigation }) {
  const videoRef = useRef(null);
  const rafRef = useRef(null);

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
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          autoPlay
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
        <TopNav navigation={navigation} active="Home" seffaf />

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
              position: 'relative',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-72px -6%',
                zIndex: -1,
                pointerEvents: 'none',
                background:
                  'radial-gradient(ellipse 52% 50% at 50% 50%, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.86) 50%, rgba(255,255,255,0) 100%)',
              }}
            />
            <h1
              className="animate-fade-rise"
              style={{
                margin: 0,
                maxWidth: '80rem',
                color: '#000000',
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: '-2.46px',
                fontSize: 'clamp(3rem, 9vw, 7rem)',
              }}
            >
              Kendi <em style={{ color: '#4A4A4A', fontStyle: 'italic' }}>kişilik yapını</em> keşfet,{' '}
              <em style={{ color: '#4A4A4A', fontStyle: 'italic' }}>doğru yolunu</em> netleştir.
            </h1>

            <p
              className="animate-fade-rise-delay"
              style={{
                marginTop: '32px',
                maxWidth: '50rem',
                color: '#2E2E2E',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              Test sonuçları kesin psikolojik tanı niteliği taşımaz ve profesyonel psikolojik değerlendirmenin yerini tutmaz.
            </p>

            <div className="animate-fade-rise-delay-2" style={{ marginTop: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => navigation.navigate('MBTI')}
                style={{ ...BTN, background: '#000000', color: '#FFFFFF', border: 0 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                MBTI testini çöz
              </button>
              <button
                onClick={() => navigation.navigate('Enneagram')}
                style={{ ...BTN, background: 'rgba(255,255,255,0.9)', color: '#000000', border: '1px solid #000000' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Enneagram testini çöz
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
      <Text style={s.nativeSubtitle}>MBTI ve Enneagram testleriyle kişiliğini analiz et.</Text>
      <TouchableOpacity style={s.nativeButton} onPress={() => navigation.navigate('Testler')}>
        <Text style={s.nativeButtonText}>Testleri gör</Text>
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
