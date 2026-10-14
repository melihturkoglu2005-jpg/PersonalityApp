import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { useTestAutoAdvance } from '../hooks/useTestAutoAdvance';
import TestAutoAdvanceToggle from '../components/TestAutoAdvanceToggle';
import { useTheme } from '../theme/ThemeContext';
import { mbtiQuestions } from '../data/mbtiQuestions';
import QuestionCard from '../components/QuestionCard';
import TestFrame from '../components/TestFrame';
import { PillButton, TextButton } from '../components/ui';

import { FONT } from '../theme/constants';
import { firstUnansweredIndex, isTestComplete, isValidAnswer } from '../utils/testCompletion';

const OTOMATIK_ILERLEME_MS = 320;

export default function MBTIScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [soruIndex, setSoruIndex] = useState(0);
  const [cevaplar,  setCevaplar]  = useState({});
  const [eksikUyarisi, setEksikUyarisi] = useState(false);
  const { cevapIleIlerle, setCevapIleIlerle } = useTestAutoAdvance();
  const otomatikIlerlemeRef = useRef(null);

  useFocusEffect(useCallback(() => () => {
    clearTimeout(otomatikIlerlemeRef.current);
    otomatikIlerlemeRef.current = null;
  }, []));

  useEffect(
    () => () => {
      if (otomatikIlerlemeRef.current) {
        clearTimeout(otomatikIlerlemeRef.current);
        otomatikIlerlemeRef.current = null;
      }
    },
    [cevapIleIlerle]
  );

  const mevcutSoru  = mbtiQuestions[soruIndex];
  const toplamSoru  = mbtiQuestions.length;
  const seciliDeger = cevaplar[mevcutSoru.id];
  const sonSoru     = soruIndex === toplamSoru - 1;
  const tamamlandi = isTestComplete(mbtiQuestions, cevaplar);
  const eksikSayisi = mbtiQuestions.filter((q) => !isValidAnswer(cevaplar[q.id])).length;

  function puanSec(puan) {
    if (!isValidAnswer(puan)) return;
    clearTimeout(otomatikIlerlemeRef.current);
    otomatikIlerlemeRef.current = null;
    const yeni = { ...cevaplar, [mevcutSoru.id]: puan };
    setCevaplar(yeni);
    if (!cevapIleIlerle) return;
    const sonraki = () => {
      otomatikIlerlemeRef.current = null;
      if (isTestComplete(mbtiQuestions, yeni)) {
        navigation.navigate('Result', { ...(route.params || {}), mbtiCevaplari: yeni });
      } else if (sonSoru) {
        setEksikUyarisi(true);
        soruyaGit(firstUnansweredIndex(mbtiQuestions, yeni));
      } else {
        setSoruIndex(soruIndex + 1);
      }
    };
    otomatikIlerlemeRef.current = setTimeout(sonraki, OTOMATIK_ILERLEME_MS);
  }

  function devamEt() {
    clearTimeout(otomatikIlerlemeRef.current);
    otomatikIlerlemeRef.current = null;
    if (isTestComplete(mbtiQuestions, cevaplar)) {
      navigation.navigate('Result', { ...(route.params || {}), mbtiCevaplari: cevaplar });
    } else if (sonSoru) {
      setEksikUyarisi(true);
      soruyaGit(firstUnansweredIndex(mbtiQuestions, cevaplar));
    } else if (isValidAnswer(seciliDeger)) {
      setSoruIndex((i) => i + 1);
    }
  }

  function soruyaGit(i) {
    if (otomatikIlerlemeRef.current) {
      clearTimeout(otomatikIlerlemeRef.current);
      otomatikIlerlemeRef.current = null;
    }
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
      cevaplanan={mbtiQuestions.map((q) => isValidAnswer(cevaplar[q.id]))}
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

      {!tamamlandi && (sonSoru || eksikUyarisi) && (
        <View style={{ marginTop: 24 }}>
          <Text accessibilityLiveRegion="polite" style={{ fontFamily: FONT, fontSize: 14, lineHeight: 21, color: colors.textSecondary }}>
            Sonuçları görmek için kalan {eksikSayisi} soruyu yanıtla.
          </Text>
          <TextButton label="İlk eksik soruya git" onPress={() => soruyaGit(firstUnansweredIndex(mbtiQuestions, cevaplar))} />
        </View>
      )}

      <View style={s.aksiyonlar}>
        <TextButton
          label="Önceki"
          disabled={soruIndex === 0}
          onPress={() => soruIndex > 0 && soruyaGit(soruIndex - 1)}
        />
        {(!cevapIleIlerle || tamamlandi) && (
          <PillButton
            label={sonSoru || tamamlandi ? 'Sonucu gör' : 'Sonraki'}
            onPress={devamEt}
            disabled={!isValidAnswer(seciliDeger) || (sonSoru && !tamamlandi)}
          />
        )}
      </View>
    </TestFrame>
  );
}

const s = StyleSheet.create({
  aksiyonlar: { marginTop: 36, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
