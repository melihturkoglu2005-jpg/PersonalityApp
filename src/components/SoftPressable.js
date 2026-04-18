import React, { useRef } from 'react';
import { Animated, Easing, Platform, Pressable } from 'react-native';

const isWeb = Platform.OS === 'web';

export default function SoftPressable({
  children,
  onPress,
  style,
  containerStyle,
  disabled,
  hoverScale = 1.015,
  hoverLift = -2,
}) {
  const anim = useRef(new Animated.Value(0)).current;

  const runAnim = (toValue) => {
    Animated.timing(anim, {
      toValue,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, hoverScale],
  });
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, hoverLift],
  });

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        disabled={disabled}
        onHoverIn={isWeb ? () => runAnim(1) : undefined}
        onHoverOut={isWeb ? () => runAnim(0) : undefined}
        style={({ pressed }) => [
          style,
          pressed && !disabled ? { opacity: 0.9 } : null,
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
