import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Animated, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { SERIF } from '../theme/constants';
import { getCharImageUris } from '../data/characterImage';

// Yuvarlak portre. Önce baş harf zemini görünür, fotoğraf yüklenince üstüne yumuşakça belirir.
// Kaynak başarısız olursa sıradaki kaynak denenir; hepsi başarısızsa baş harf kalır.
//   ring → verilirse portrenin etrafında renkli halka çizer
export default function Portrait({ char, size = 64, ring }) {
  const { colors } = useTheme();
  const kaynaklar = getCharImageUris(char);
  const [sira, setSira] = useState(0);
  const [hata, setHata] = useState(kaynaklar.length === 0);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSira(0);
    setHata(getCharImageUris(char).length === 0);
    opacity.setValue(0);
  }, [char.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function yuklendi() {
    Animated.timing(opacity, { toValue: 1, duration: 260, useNativeDriver: Platform.OS !== 'web' }).start();
  }

  function basarisiz() {
    if (sira + 1 < kaynaklar.length) setSira(sira + 1);
    else setHata(true);
  }

  const dis = ring ? size + 8 : size;
  const ic = (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.surfaceHover, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: SERIF, fontSize: size * 0.42, color: colors.textMuted }}>{char.name.charAt(0)}</Text>
      {!hata && (
        <Animated.View style={{ position: 'absolute', top: 0, left: 0, width: size, height: size, opacity }}>
          <Image
            key={kaynaklar[sira]}
            source={{ uri: kaynaklar[sira] }}
            style={{ width: size, height: size }}
            resizeMode="cover"
            onLoad={yuklendi}
            onError={basarisiz}
            accessibilityLabel={char.name}
          />
        </Animated.View>
      )}
    </View>
  );

  if (!ring) return ic;
  return (
    <View style={{ width: dis, height: dis, borderRadius: dis / 2, borderWidth: 2, borderColor: ring, padding: 2 }}>
      {ic}
    </View>
  );
}
