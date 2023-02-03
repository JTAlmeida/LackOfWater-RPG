import GameContext from '../../contexts/GameContext';
import { useContext, useState, useEffect } from 'react';
import useUpsertCharItem from '../../hooks/api/useUpsertCharItem';
import potion from '../../assets/images/potion.png';
import styled from 'styled-components';
import { toast } from 'react-toastify';

export default function Item({ enemyDamage }) {
  const { char, currentHP, setCurrentHP, items, usePotion, setUsePotion } = useContext(GameContext);
  const { upsertCharItem } = useUpsertCharItem();

  const potion = items?.find((item) => item.id === 1);
  const charPotion = char?.CharacterItems.find((charItem) => charItem.itemId === 1);

  return (
    <ItemWrapper>
      {charPotion?.quantity > 0 ? (
        <>
          {potion?.name}
          <Potion
            hasPotion={true}
            onClick={async() => {
              const maxHP = char?.lvl * 10 + 90;
              if (currentHP + maxHP >= maxHP) {
                setCurrentHP(maxHP - enemyDamage);
              } else {
                setCurrentHP(currentHP + maxHP - enemyDamage);
              }

              await upsertCharItem({ quantity: charPotion.quantity - 1 }, char?.id, 1);
              setUsePotion(!usePotion);
            }}
          >
            <p>{charPotion.quantity}</p>
          </Potion>
          {potion?.description}
          <p>Dica: ao usar poções você sofre o dano do inimigo após receber a cura.</p>
        </>
      ) : (
        <>
          {potion?.name}
          <Potion
            hasPotion={false}
            onClick={() => {
              toast('Você não possui poções!', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
            }}
          >
            <p>0</p>
          </Potion>
          {potion?.description}
        </>
      )}
    </ItemWrapper>
  );
}

const Potion = styled.div`
  border-radius: 30px;
  border: 1px solid green;
  display: flex;
  width: 50px !important;
  height: 50px !important;
  background-color: green;
  background-image: url(${potion});
  background-repeat: no-repeat;
  background-size: 50px;
  font-size: 20px;
  ${(props) => (props.hasPotion ? 'color: white;' : 'color: red;')}
  ${(props) => (props.hasPotion ? 'cursor: pointer;' : '')};

  p {
    width: 50px;
    height: 50px;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid green;
  font-size: 14px;

  >p{
    font-size: 16px;
  }
`;
