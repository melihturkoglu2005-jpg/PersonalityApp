import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTestAutoAdvance } from '../hooks/useTestAutoAdvance';
import TestAutoAdvanceToggle from '../components/TestAutoAdvanceToggle';
import { useTheme } from '../theme/ThemeContext';
import { mbtiQuestions } from '../data/mbtiQuestions';
import QuestionCard from '../components/QuestionCard';
import TestFrame from '../components/TestFrame';
import { PillButton, TextButton } from '../components/ui';

const OTOMATIK_ILERLEME_MS = 320;

export default function MBTIScreen({ navigation, route }) {
  const { isDark, colors } = useTheme();
  const [soruIndex, setSoruIndex] = useState(0);
  const [cevaplar,  setCevaplar]  = useState({});
  const { cevapIleIlerle, setCevapIleIlerle } = useTestAutoAdvance();
  const otomatikGeriSonrasi = useRef(false);
  const otomatikIlerlemeRef = useRef(null);

  useEffect(
    () => () => {
      if (otomatikIlerlemeRef.current) {
        clearTimeout(otomatikIlerlemeRef.current);
        otomatikIlerlemeRef.current = null;
      }
    },
    []
  );

  const mevcutSoru  = mbtiQuestions[soruIndex];
  const toplamSoru  = mbtiQuestions.length;
  const seciliDeger = cevaplar[mevcutSoru.id];
  const sonSoru     = soruIndex === toplamSoru - 1;
  const ilerleme    = ((soruIndex + 1) / toplamSoru) * 100;

  function puanSec(puan) {
    const onceki = cevaplar[mevcutSoru.id];
    const yeni = { ...cevaplar, [mevcutSoru.id]: puan };
    setCevaplar(yeni);
    if (!cevapIleIlerle) return;
    if (onceki === puan) {
      if (!otomatikGeriSonrasi.current) return;
      otomatikGeriSonrasi.current = false;
    } else {
      otomatikGeriSonrasi.current = false;
    }
    if (otomatikIlerlemeRef.current) {
      clearTimeout(otomatikIlerlemeRef.current);
    }
    const sonraki = () => {
      otomatikIlerlemeRef.current = null;
      if (sonSoru) {
        navigation.navigate('Result', { ...(route.params || {}), mbtiCevaplari: yeni });
      } else {
        setSoruIndex((i) => i + 1);
      }
    };
    otomatikIlerlemeRef.current = setTimeout(sonraki, OTOMATIK_ILERLEME_MS);
  }

  function devamEt() {
    if (!seciliDeger) return;
    if (sonSoru) {
      navigation.navigate('Result', { ...(route.params || {}), mbtiCevaplari: cevaplar });
    } else {
      setSoruIndex((i) => i + 1);
    }
  }

  function soruyaGit(i) {
    if (otomatikIlerlemeRef.current) {
      clearTimeout(otomatikIlerlemeRef.current);
      otomatikIlerlemeRef.current = null;
    }
    otomatikGeriSonrasi.current = true;
    setSoruIndex(i);
  }

  return (
    <TestFrame
      navigation={navigation}
      baslik="MBTI Testi"
      sira={soruIndex + 1}
      toplam={toplamSoru}
      aksan={colors.primary}
      not={`${mevcutSoru.fonksiyon} bilişsel fonksiyonu`}
      cevaplanan={mbtiQuestions.map((q) => cevaplar[q.id] !== undefined)}
      onGit={soruyaGit}
      kontrol={
        <TestAutoAdvanceToggle
          value={cevapIleIlerle}
          onValueChange={setCevapIleIlerle}
          accentColor={colors.primary}
        />
      }
    >
      <QuestionCard
        soru={mevcutSoru.soru}
        soruNo={soruIndex + 1}
        toplamSoru={toplamSoru}
        seciliDeger={seciliDeger}
        onSecim={puanSec}
        renk={colors.primary}
        progressGizle
        cevapIleIlerle={cevapIleIlerle}
      />

      <View style={s.aksiyonlar}>
        <TextButton
          label="Önceki"
          disabled={soruIndex === 0}
          onPress={() => {
            if (soruIndex > 0) {
              otomatikGeriSonrasi.current = true;
              setSoruIndex((i) => i - 1);
            }
          }}
        />
        {!cevapIleIlerle && (
          <PillButton
            label={sonSoru ? 'Sonucu gör' : 'Sonraki'}
            onPress={devamEt}
            disabled={!seciliDeger}
          />
        )}
      </View>
    </TestFrame>
  );
}

const s = StyleSheet.create({
  aksiyonlar: { marginTop: 36, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
