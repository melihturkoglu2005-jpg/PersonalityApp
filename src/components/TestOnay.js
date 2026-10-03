import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { PillButton, TextButton } from './ui';

const KALICI_ANAHTAR = 'indoles.testUyarisiOnaylandi';

// Aynı ziyaret içinde MBTI'dan Enneagram'a geçerken tekrar sormamak için.
let oturumOnayi = false;

function Kutucuk({ isaretli, onPress, etiket }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isaretli }}
      accessibilityLabel={etiket}
      style={s.kutuSatir}
    >
      <View
        style={[
          s.kutu,
          { borderColor: isaretli ? colors.textPrimary : colors.textMuted, backgroundColor: isaretli ? colors.textPrimary : 'transparent' },
        ]}
      >
        {isaretli && <Text style={s.tik}>✓</Text>}
      </View>
      <Text style={[s.kutuYazi, { color: colors.textPrimary }]}>{etiket}</Text>
    </Pressable>
  );
}

// Teste başlamadan önce bir kez gösterilen uyarı. "Bir daha gösterme" işaretlenirse
// onay cihazda saklanır ve tekrar sorulmaz.
export default function TestOnay({ navigation, children }) {
  const { colors } = useTheme();
  const [durum, setDurum] = useState(oturumOnayi ? 'tamam' : 'yukleniyor');
  const [okudum, setOkudum] = useState(false);
  const [birDahaGosterme, setBirDahaGosterme] = useState(false);

  useEffect(() => {
    if (oturumOnayi) return;
    let iptal = false;
    AsyncStorage.getItem(KALICI_ANAHTAR)
      .then((v) => {
        if (iptal) return;
        if (v === '1') { oturumOnayi = true; setDurum('tamam'); } else setDurum('sor');
      })
      .catch(() => { if (!iptal) setDurum('sor'); });
    return () => { iptal = true; };
  }, []);

  function devamEt() {
    if (!okudum) return;
    oturumOnayi = true;
    if (birDahaGosterme) AsyncStorage.setItem(KALICI_ANAHTAR, '1').catch(() => {});
    setDurum('tamam');
  }

  if (durum === 'tamam') return children;

  return (
    <>
      {children}
      <View
        style={[
          s.kaplama,
          { backgroundColor: durum === 'yukleniyor' ? colors.background : 'rgba(255,255,255,0.97)' },
          Platform.OS === 'web' ? { position: 'fixed' } : null,
        ]}
      >
        {durum === 'sor' && (
          <View style={[s.kart, { borderColor: colors.border, backgroundColor: colors.background }]}>
            <Text style={[s.baslik, { color: colors.textPrimary }]}>Başlamadan önce</Text>
            <Text style={[s.metin, { color: colors.textSecondary }]}>
              Test sonuçları kesin psikolojik tanı niteliği taşımaz ve profesyonel psikolojik değerlendirmenin yerini tutmaz. Bunu biliyorum.
            </Text>

            <View style={{ marginTop: 24, gap: 14 }}>
              <Kutucuk isaretli={okudum} onPress={() => setOkudum(!okudum)} etiket="Okudum ve anlıyorum" />
              <Kutucuk isaretli={birDahaGosterme} onPress={() => setBirDahaGosterme(!birDahaGosterme)} etiket="Bu uyarıyı bir daha gösterme" />
            </View>

            <View style={s.alt}>
              <PillButton label="Teste devam et" onPress={devamEt} disabled={!okudum} />
              <TextButton label="Vazgeç" onPress={() => navigation.navigate('Home')} />
            </View>
          </View>
        )}
      </View>
    </>
  );
}

const s = StyleSheet.create({
  kaplama: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, alignItems: 'center', justifyContent: 'center', padding: 20 },
  kart: { width: '100%', maxWidth: 520, borderWidth: 1, borderRadius: 20, padding: 32 },
  baslik: { fontFamily: SERIF, fontSize: 38, letterSpacing: -0.8 },
  metin: { fontFamily: FONT, fontSize: 15, lineHeight: 24, marginTop: 12 },
  kutuSatir: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  kutu: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  tik: { color: '#FFFFFF', fontSize: 14, lineHeight: 16 },
  kutuYazi: { fontFamily: FONT, fontSize: 15 },
  alt: { marginTop: 32, flexDirection: 'row', alignItems: 'center', gap: 20, flexWrap: 'wrap' },
});
