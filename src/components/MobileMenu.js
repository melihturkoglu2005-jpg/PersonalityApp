import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT } from '../theme/constants';
import SoftPressable from './SoftPressable';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function MobileMenu({ isVisible, onClose, navigation }) {
  const { isDark, colors } = useTheme();
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const menuItems = [
    { label: 'Kişilik Tipleri', screen: 'KisilikTipleri', icon: '🌟' },
    { label: 'Karakterler', screen: 'CharacterGuide', icon: '🎭' },
    { label: 'Kaynaklar', screen: 'Kaynaklar', icon: '📚' },
  ];

  const handleMenuPress = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[
          s.overlay,
          { opacity: overlayAnim, backgroundColor: 'rgba(0,0,0,0.5)' }
        ]}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      <Animated.View
        style={[
          s.menuContainer,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={s.menuHeader}>
          <Text style={[s.menuTitle, { color: colors.textPrimary }]}>Menü</Text>
          <TouchableOpacity
            onPress={onClose}
            style={[s.closeBtn, { borderColor: colors.border }]}
          >
            <Text style={[s.closeText, { color: colors.textSecondary }]}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={s.menuItems}>
          {menuItems.map((item, index) => (
            <SoftPressable
              key={index}
              style={[s.menuItem, { borderColor: colors.border }]}
              onPress={() => handleMenuPress(item.screen)}
            >
              <Text style={s.menuIcon}>{item.icon}</Text>
              <Text style={[s.menuLabel, { color: colors.textPrimary }]}>
                {item.label}
              </Text>
              <Text style={[s.menuArrow, { color: colors.textMuted }]}>›</Text>
            </SoftPressable>
          ))}
        </View>

        <View style={[s.divider, { backgroundColor: colors.border }]} />

        <View style={s.menuFooter}>
          <Text style={[s.footerText, { color: colors.textMuted }]}>
            indoles - Kişilik Keşif Uygulaması
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 1000,
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.75,
    maxWidth: 320,
    borderWidth: 1,
    borderRightWidth: 0,
    zIndex: 1001,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '900',
    fontFamily: FONT,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  menuItems: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 2,
    borderWidth: 1,
    borderBottomWidth: 2,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FONT,
  },
  menuArrow: {
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  menuFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT,
    textAlign: 'center',
  },
});
