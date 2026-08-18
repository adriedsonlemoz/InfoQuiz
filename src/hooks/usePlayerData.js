import { useEffect, useMemo, useState } from 'react';
import { loadPlayerData, savePlayerData } from '../storage/playerStorage.js';
import {
  applyEnergyRecharge,
  formatEnergyTimer,
  getEnergyRemainingMs,
  MAX_ENERGY,
} from '../energy/energy.js';

export function usePlayerData() {
  const [playerData, setPlayerData] = useState(loadPlayerData);
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    savePlayerData(playerData);
  }, [playerData]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      setPlayerData((current) => applyEnergyRecharge(current, currentTime));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const energyTimer = useMemo(() => {
    if (playerData.energia >= MAX_ENERGY) return 'MAX';
    return formatEnergyTimer(getEnergyRemainingMs(playerData, now));
  }, [now, playerData]);

  return { playerData, setPlayerData, energyTimer };
}
