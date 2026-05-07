import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import SoftPressable from './SoftPressable';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = isWeb && width >= 1024;


export default function TopNav({ navigation }) {
  const links = [
    { label: 'Kişilik Tipleri', screen: 'KisilikTipleri' },
    { label: 'Karakterler',     screen: 'CharacterGuide' },
    { label: 'Kaynaklar',       screen: 'Kaynaklar' },
  ];

  return (
    <View style={s.wrap}>
      <View style={s.inner}>
        <TouchableOpacity
          style={s.brand}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Ana sayfa"
        >
          <Text style={s.brandTitle}>
            Indoles
            <Text style={s.brandSup}>®</Text>
          </Text>
        </TouchableOpacity>

        <View style={s.rightRow}>
          <View style={s.links}>
            {links.map((item) => (
              <SoftPressable
                key={item.label}
                containerStyle={s.linkWrap}
                style={s.linkBtn}
                onPress={() => navigation.navigate(item.screen)}
                hoverScale={1.02}
              >
                <Text style={s.linkText}>{item.label}</Text>
              </SoftPressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:  { backgroundColor: '#FFFFFF' },
  inner: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand:      { flexDirection: 'row', alignItems: 'center' },
  brandTitle: {
    color: '#000000',
    fontSize: 30,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'web' ? '"Instrument Serif", serif' : undefined,
  },
  brandSup: {
    fontSize: 12,
    position: 'relative',
    top: -14,
  },
  rightRow:   { flexDirection: 'row', alignItems: 'center', gap: 14 },
  links:      { flexDirection: 'row', alignItems: 'center', gap: 6 },
  linkWrap:   { width: 'auto' },
  linkBtn:    { paddingHorizontal: isDesktop ? 12 : 10, paddingVertical: 8, borderRadius: 10 },
  linkText: {
    color: '#6F6F6F',
    fontSize: isDesktop ? 14 : 13,
    fontFamily: Platform.OS === 'web' ? '"Inter", sans-serif' : undefined,
    fontWeight: '500',
  },
});
