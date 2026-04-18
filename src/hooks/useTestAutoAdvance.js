import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@PersonalityApp/test_cevap_ile_ilerle';

export function useTestAutoAdvance() {
  const [cevapIleIlerle, setCevapIleIlerleState] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY).then((v) => {
      if (!cancelled && v === '1') setCevapIleIlerleState(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const setCevapIleIlerle = useCallback((next) => {
    setCevapIleIlerleState(!!next);
    AsyncStorage.setItem(STORAGE_KEY, next ? '1' : '0');
  }, []);

  return { cevapIleIlerle, setCevapIleIlerle };
}
