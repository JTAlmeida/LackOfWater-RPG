import { createContext } from 'react';
import useScenes from '../hooks/api/useScenes';
import useEnemies from '../hooks/api/useEnemies';
import useItems from '../hooks/api/useItems';
import useChar from '../hooks/api/useChar';
import { useState, useEffect } from 'react';

const GameContext = createContext();
export default GameContext;

export function GameProvider({ children }) {
  const battle = localStorage.getItem('isBattling');
  const currentScene = Number(localStorage.getItem('currentScene'));
  const currentEnemy = Number(localStorage.getItem('enemyId'));

  const { scenes } = useScenes();
  const { items } = useItems();
  const { enemies } = useEnemies();
  const { char, getChar } = useChar();
  const [isBattling, setIsBattling] = useState(JSON.parse(battle) || false);
  const [isAlive, setIsAlive] = useState(true);
  const [enemyId, setEnemyId] = useState(currentEnemy || 1);
  const [sceneId, setSceneId] = useState(currentScene || 1);
  const [currentHP, setCurrentHP] = useState(char?.hp);
  const [enemyXP, setEnemyXP] = useState(0);
  const [reloadChar, setReloadChar] = useState(false);
  const [giveItem, setGiveItem] = useState(true);
  const [usePotion, setUsePotion] = useState(false);

  useEffect(async() => {
    await getChar();
  }, [reloadChar, usePotion]);

  return (
    <GameContext.Provider
      value={{
        scenes,
        items,
        enemies,
        char,
        isBattling,
        setIsBattling,
        enemyId,
        setEnemyId,
        sceneId,
        setSceneId,
        isAlive,
        setIsAlive,
        currentHP,
        setCurrentHP,
        enemyXP,
        setEnemyXP,
        giveItem,
        setGiveItem,
        usePotion,
        setUsePotion,
        reloadChar,
        setReloadChar
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
