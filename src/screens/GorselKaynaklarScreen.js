import React from 'react';
import { View, Text, Pressable, Linking, StyleSheet } from 'react-native';
import { Screen, Wrap, PageHeader } from '../components/ui';
import { personalityData } from '../data/personalityData';
import { FONT, SERIF } from '../theme/constants';
import { useTheme } from '../theme/ThemeContext';

// These are the recorded remote fallback files. The old image downloader did
// not preserve the original file or license metadata for its local copies.
const SOURCES = [...new Map(Object.values(personalityData)
  .flatMap((type) => type.characters || [])
  .map((person) => [person.name, person])).values()]
  .sort((a, b) => a.name.localeCompare(b.name, 'tr'));

function sourcePage(imageUrl) {
  return imageUrl?.replace('title=Special:Redirect/file/', 'title=File:');
}

export default function GorselKaynaklarScreen({ navigation }) {
  const { colors } = useTheme();
  return (
    <Screen navigation={navigation} active="Hakkimizda">
      <PageHeader title="Görsel kaynakları ve atıflar" sub="Karakter rehberinin kayıtlı görsel kaynakları ve atıf bilgilerinin mevcut durumu." />
      <Wrap max={900}>
        <View style={[s.note, { backgroundColor: colors.surfaceLight }]}>
          <Text accessibilityRole="header" style={[s.heading, { color: colors.textPrimary }]}>Atıf kayıtları hakkında</Text>
          <Text style={[s.body, { color: colors.textSecondary }]}>Karakter fotoğraflarının yerel kopyaları Wikipedia üzerinden alınmıştır. İlk indirmelerde her fotoğrafın özgün dosya sayfası, eser sahibi ve lisansı ayrıca kaydedilmemiştir. Bu nedenle aşağıdaki liste tamamlanmış bir lisans ve atıf dökümü değildir.</Text>
          <Text style={[s.body, { color: colors.textSecondary }]}>Wikipedia bağlantıları kişilerin kaynak sayfalarına, Wikimedia Commons bağlantıları ise sitede yedek görsel olarak kayıtlı dosyalara gider. Yerel fotoğraf ile yedek görsel farklı olabilir. Yerel kopyaların eser sahibi ve lisans eşleştirmeleri henüz doğrulanmamıştır; tüm fotoğrafların aynı lisansa sahip olduğu varsayılmamalıdır.</Text>
        </View>
        {SOURCES.map((person) => (
          <View key={person.name} style={[s.row, { borderBottomColor: colors.border }]}>
            <Text accessibilityRole="header" style={[s.name, { color: colors.textPrimary }]}>{person.name}</Text>
            <View style={s.links}>
              <Pressable accessibilityRole="link" accessibilityLabel={`${person.name}: Wikipedia kaynak sayfası`} onPress={() => Linking.openURL(`https://en.wikipedia.org/wiki/${encodeURIComponent(person.name.replace(/ /g, '_'))}`)}>
                <Text style={[s.link, { color: colors.textSecondary }]}>Wikipedia kaynak sayfası ↗</Text>
              </Pressable>
              {!!person.imageUrl && <Pressable accessibilityRole="link" accessibilityLabel={`${person.name}: Commons yedek görsel bilgisi`} onPress={() => Linking.openURL(sourcePage(person.imageUrl))}>
                <Text style={[s.link, { color: colors.textSecondary }]}>Commons yedek görsel bilgisi ↗</Text>
              </Pressable>}
            </View>
          </View>
        ))}
      </Wrap>
    </Screen>
  );
}

const s = StyleSheet.create({
  note: { borderRadius: 16, padding: 24, gap: 14, marginBottom: 12 },
  heading: { fontFamily: SERIF, fontSize: 28 },
  body: { fontFamily: FONT, fontSize: 15, lineHeight: 25 },
  row: { paddingVertical: 22, borderBottomWidth: 1, gap: 12 },
  name: { fontFamily: FONT, fontWeight: '500', fontSize: 17 },
  links: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 24, rowGap: 12 },
  link: { fontFamily: FONT, fontSize: 14, lineHeight: 22, textDecorationLine: 'underline' },
});
