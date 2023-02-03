import GameContext from '../../contexts/GameContext';
import { useContext, useState, useEffect } from 'react';
import useUpsertCharItem from '../../hooks/api/useUpsertCharItem';
import styled from 'styled-components';
import Item from './Item';
import { toast } from 'react-toastify';

function rollD4() {
  return Math.floor(Math.random() * (4 - 1) + 1);
}

function rollD20() {
  return Math.floor(Math.random() * (20 - 1) + 1);
}

function rollDropChance() {
  return (Math.random() * (1 - 0) + 0).toFixed(2);
}

function checkRandomEncounter() {
  const roll = rollD20();

  if (roll >= 15) {
    return 'continue';
  }

  if (roll > 0 && roll < 8) {
    return 8;
  }

  if (roll >= 8 && roll < 15) {
    return 9;
  }
}

function damageCalc({ char, enemy, type }) {
  const playerRoll = rollD4();
  const enemyRoll = rollD4();

  if (type === 'enemy') {
    return enemy?.atk + enemyRoll - (char?.def + playerRoll);
  }

  if (type === 'player') {
    return char?.atk + playerRoll - (enemy?.def + enemyRoll);
  }
}

function minReceivedDamage(enemy, char) {
  if (enemy?.atk + 1 - (char?.def + 4) < 0) {
    return 0;
  }
  return enemy?.atk + 1 - (char?.def + 4);
}

export default function Battle() {
  const {
    char,
    enemies,
    enemyId,
    isBattling,
    setIsBattling,
    setIsAlive,
    setSceneId,
    currentHP,
    setCurrentHP,
    setEnemyXP,
    giveItem,
    setGiveItem,
  } = useContext(GameContext);
  const [enemyCurrentHP, setEnemyCurrentHP] = useState(1);
  const { upsertCharItem } = useUpsertCharItem();

  const enemy = enemies?.find((enemy) => enemy.id === enemyId);
  const charPotion = char?.CharacterItems.find((charItem) => charItem.itemId === 1);

  useEffect(() => {
    setCurrentHP(char?.hp);
    setEnemyCurrentHP(enemy?.hp);
  }, [enemies, isBattling]);

  useEffect(() => {
    if (giveItem === true && enemy?.EnemyItems !== undefined) {
      enemy?.EnemyItems.map(async(enemyItem) => {
        const roll = rollDropChance();
        const dropChance = enemyItem.dropChance / 100;

        if (roll >= dropChance) {
          await upsertCharItem({ quantity: charPotion?.quantity + 1 || 1 }, char?.id, enemyItem.itemId);

          setGiveItem(false);
        }
      });
    }
  }, [giveItem]);

  if (currentHP <= 0 && char !== undefined) {
    localStorage.setItem('isBattling', false);
    localStorage.setItem('nextScene', 1);
    localStorage.setItem('enemyId', 1);
    setIsBattling(false);
    setCurrentHP(0);
    setSceneId(1);
    setIsAlive(false);
    return toast('Você morreu!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
  }

  if (enemyCurrentHP <= 0 && char !== undefined) {
    toast('Você venceu!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
    localStorage.setItem('isBattling', false);
    setIsBattling(false);
    setCurrentHP(currentHP);
    setEnemyXP(enemy?.exp);
    setGiveItem(true);

    const nextScene = Number(localStorage.getItem('nextScene'));

    if (nextScene !== 7) {
      const res = checkRandomEncounter();

      if (res === 'continue') {
        setSceneId(Number(localStorage.getItem('nextScene')));
      } else {
        setSceneId(res);
      }
    } else setSceneId(7);
  }

  return (
    <div>
      <Player>
        Char: {char?.name} | lvl:{char?.lvl} | xp:{char?.xp}/{char?.lvl * 50 + (char?.lvl - 1) * (50 * (char?.lvl - 1))}{' '}
        | atk: {char?.atk} | def: {char?.def}
        <p>
          HP:{currentHP}/{char?.lvl * 10 + 90}
        </p>
      </Player>
      <Enemy>
        {enemy?.name}
        <p>
          HP: {enemyCurrentHP || 0}/{enemy?.hp}
        </p>
        <img src={enemy?.imgUrl} alt="enemy" />
      </Enemy>
      <Button
        onClick={() => {
          const playerDamage = damageCalc({ char, enemy, type: 'player' });
          if (playerDamage >= 0) {
            setEnemyCurrentHP(enemyCurrentHP - playerDamage);
          }

          if (enemyCurrentHP - playerDamage > 0) {
            const enemyDamage = damageCalc({ char, enemy, type: 'enemy' });
            if (enemyDamage >= 0) {
              setCurrentHP(currentHP - enemyDamage);
            }
          }
        }}
      >
        ATACAR! <br />
        (Dano causado: {char?.atk + 1 - (enemy?.def + 4)}~{char?.atk + 4 - (enemy?.def + 1)}) <br />
        (Dano recebido: {minReceivedDamage(enemy, char)}~{enemy?.atk + 4 - (char?.def + 1)})
      </Button>
      <Tip>Dica: Você sempre é o primeiro a atacar e não sofrerá dano caso mate o inimigo.</Tip>

      <Item enemyDamage={damageCalc({ char, enemy, type: 'enemy' })} />
    </div>
  );
}

const Player = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  font-size: 20px;

  p {
    font-size: 20px;
    color: red;
  }
`;

const Enemy = styled.div`
  width: 40%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;

  img {
    height: 150px;
    width: 150px;
    margin-top: -35px;
  }
`;

const Button = styled.button`
  width: auto;
  padding-bottom: 5px;
  border-radius: 20px;
  border: 1px solid white;
  background-color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &&:hover {
    border: 3px solid #add8e6;
    background: black;
    color: #add8e6;
  }
`;

const Tip = styled.p`
  font-size: 14px;
`;
