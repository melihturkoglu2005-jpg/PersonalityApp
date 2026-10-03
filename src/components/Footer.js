import React from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout, GRID } from '../theme/useLayout';

export default function Footer({ navigation }) {
  const { colors } = useTheme();
  const { gutter } = useLayout();

  return (
    <View style={[s.root, { borderTopColor: colors.border }]}>
      <View style={[s.inner, { paddingHorizontal: gutter, maxWidth: GRID + gutter * 2 }]}>
        <View style={s.row}>
          <Pressable onPress={() => navigation.navigate('Home')} accessibilityRole="button" accessibilityLabel="Ana sayfa">
            <Text style={s.brand}>
              Indoles<Text style={s.sup}>®</Text>
            </Text>
          </Pressable>
          <View style={s.links}>
            <Pressable onPress={() => navigation.navigate('Kaynaklar')} accessibilityRole="link">
              <Text style={[s.link, { color: colors.textSecondary }]}>Kaynaklar</Text>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('mailto:destek@indoles.com')} accessibilityRole="link">
              <Text style={[s.link, { color: colors.textSecondary }]}>İletişim</Text>
            </Pressable>
          </View>
        </View>

        <Text style={[s.note, { color: colors.textMuted }]}>
          Bu platform yalnızca akademik ve kişisel gelişim amaçlıdır. Test sonuçları kesin psikolojik tanı niteliği taşımaz ve profesyonel psikolojik değerlendirmenin yerini tutmaz.
        </Text>
        <Text style={[s.note, { color: colors.textMuted }]}>
          © {new Date().getFullYear()} Indoles. Psikoloji ve tipoloji literatürüne dayalı kişilik analizi.
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root:  { alignSelf: 'stretch', width: '100%', marginTop: 72, borderTopWidth: 1 },
  inner: { width: '100%', alignSelf: 'center', paddingTop: 28, paddingBottom: 40, gap: 12 },
  row:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  brand: { color: '#000000', fontSize: 26, letterSpacing: -0.5, fontFamily: SERIF },
  sup:   { fontSize: 11, position: 'relative', top: -12 },
  links: { flexDirection: 'row', alignItems: 'center', gap: 22 },
  link:  { fontSize: 13, fontFamily: FONT },
  note:  { fontSize: 12, lineHeight: 18, fontFamily: FONT, maxWidth: 640 },
});
