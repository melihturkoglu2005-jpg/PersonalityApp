import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@PersonalityApp/test_cevap_ile_ilerle';

export function useTestAutoAdvance() {
  const [cevapIleIlerle, setCevapIleIlerleState] = useState(false);
  const userChanged = useRef(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY).then((v) => {
      if (!cancelled && !userChanged.current) setCevapIleIlerleState(v === '1');
    }).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const setCevapIleIlerle = useCallback((next) => {
    userChanged.current = true;
    setCevapIleIlerleState(!!next);
    AsyncStorage.setItem(STORAGE_KEY, next ? '1' : '0').catch(() => {});
  }, []);

  return { cevapIleIlerle, setCevapIleIlerle };
}
