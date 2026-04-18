import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isTablet  = width >= 768 && !isWeb;
const isDesktop = width >= 1024 && isWeb;

// Mor = katılmıyorum (sol), Yeşil = katılıyorum (sağ)
const SECENEKLER = {
  1: { metin: 'Kesinlikle Katılmıyorum', renk: '#7C3AED', boyut: 1.0 },
  2: { metin: 'Katılmıyorum',            renk: '#A78BFA', boyut: 0.8 },
  3: { metin: 'Nötr',                    renk: '#9CA3AF', boyut: 0.6 },
  4: { metin: 'Katılıyorum',             renk: '#16A34A', boyut: 0.8 },
  5: { metin: 'Kesinlikle Katılıyorum',  renk: '#15803D', boyut: 1.0 },
};

export default function QuestionCard({ soru, soruNo, toplamSoru, seciliDeger, onSecim, renk, progressGizle }) {
  return (
    <View style={styles.kart}>

      {/* Soru numarası */}
{!progressGizle && (
        <View style={styles.ustBilgi}>
          <Text style={styles.soruNo}>Soru {soruNo} / {toplamSoru}</Text>
          <View style={styles.ilerlemeCubugu}>
            <View style={[styles.ilerlemeDoluluk, { width: `${(soruNo / toplamSoru) * 100}%`, backgroundColor: renk }]} />
          </View>
        </View>
      )}

      {/* Soru metni */}
      <Text style={styles.soruMetni}>{soru}</Text>

      {/* Seçim alanı */}
      <View style={styles.secimAlani}>
        <View style={styles.etiketSatiri}>
          <Text style={styles.solEtiket}>Katılmıyorum</Text>
          <Text style={styles.sagEtiket}>Katılıyorum</Text>
        </View>

        <View style={styles.daireContainer}>
          {[1, 2, 3, 4, 5].map((puan) => {
            const secili = seciliDeger === puan;
            const s = SECENEKLER[puan];
            const temel = isDesktop ? 48 : 40;
            const boyut = temel * s.boyut;
            return (
              <TouchableOpacity
                key={puan}
                style={[
                  styles.daireButon,
                  {
                    width: boyut, height: boyut, borderRadius: boyut / 2,
                    borderColor: s.renk, borderWidth: secili ? 3 : 2,
                    backgroundColor: secili ? s.renk : 'transparent',
                  },
                ]}
                onPress={() => onSecim(puan)}
                activeOpacity={0.7}
              />
            );
          })}
        </View>

        {seciliDeger && (
          <Text style={[styles.seciliAciklama, { color: SECENEKLER[seciliDeger].renk }]}>
            {SECENEKLER[seciliDeger].metin}
          </Text>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  kart: {
    backgroundColor: colors.surface,
    borderRadius: isDesktop ? 16 : 12,
    padding: isDesktop ? 40 : 24,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: isDesktop ? 0 : isTablet ? 32 : 24,
    maxWidth: isDesktop ? 900 : '100%',
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ustBilgi:       { marginBottom: isDesktop ? 32 : 20 },
  soruNo:         { fontSize: isDesktop ? 14 : 12, color: colors.textSecondary, fontWeight: '500', marginBottom: isDesktop ? 12 : 8, textTransform: 'uppercase', letterSpacing: 1 },
  ilerlemeCubugu: { height: 4, backgroundColor: colors.border, borderRadius: 2, overflow: 'hidden' },
  ilerlemeDoluluk:{ height: '100%', borderRadius: 2 },
  soruMetni:      { fontSize: isDesktop ? 20 : 16, color: colors.textPrimary, lineHeight: isDesktop ? 30 : 24, marginBottom: isDesktop ? 40 : 32, fontWeight: '400' },
  secimAlani:     { gap: isDesktop ? 24 : 20 },
  etiketSatiri:   { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: isDesktop ? 16 : 8 },
  solEtiket:      { fontSize: isDesktop ? 16 : 14, color: '#7C3AED', fontWeight: '600' },
  sagEtiket:      { fontSize: isDesktop ? 16 : 14, color: '#15803D', fontWeight: '600' },
  daireContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: isDesktop ? 16 : 4, paddingVertical: isDesktop ? 20 : 16 },
  daireButon:     { alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  seciliAciklama: { fontSize: isDesktop ? 14 : 12, fontWeight: '600', textAlign: 'center', marginTop: isDesktop ? 8 : 6 },
});