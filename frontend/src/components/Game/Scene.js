import GameContext from '../../contexts/GameContext';
import { useContext } from 'react';
import styled from 'styled-components';
import handleOption from './handleOption';
import Battle from './Battle';

export default function Scene() {
  const { char, scenes, isBattling, setIsBattling, setSceneId, setEnemyId, setIsAlive, currentHP, setCurrentHP } =
    useContext(GameContext);

  let sceneOption1;
  let sceneOption2;

  const scene = scenes?.find((scene) => scene.id === char?.currentSceneId);

  if (scene?.SceneOptions[0].Option.description) {
    sceneOption1 = scene.SceneOptions[0];
  }

  if (scene?.SceneOptions[1]?.Option.description) {
    sceneOption2 = scene.SceneOptions[1];
  }

  return (
    <>
      <div>
        <p>{scene?.description}</p>
        <div>
          {sceneOption1 !== undefined && isBattling === false && (
            <Button
              onClick={() => {
                handleOption({
                  option: sceneOption1,
                  setIsBattling,
                  setSceneId,
                  setEnemyId,
                  setIsAlive,
                  currentHP,
                  setCurrentHP,
                });
              }}
            >
              {sceneOption1?.Option.description}
            </Button>
          )}
          {sceneOption2 !== undefined && isBattling === false && (
            <Button
              onClick={() => {
                handleOption({ option: sceneOption2, setIsBattling, setSceneId, setEnemyId, currentHP, setCurrentHP });
              }}
            >
              {sceneOption2?.Option.description}
            </Button>
          )}
        </div>
      </div>
      {isBattling === true && <Battle />}
    </>
  );
}

const Button = styled.button`
  width: 40%;
  border-radius: 20px;
  border: 1px solid white;
  background-color: white;
  cursor: pointer;
  font-size: 16px;

  &&:hover {
    border: 3px solid #add8e6;
    background: black;
    color: #add8e6;
  }

  @media (max-width: 600px) {
    width: 80%;
    margin-bottom: 10px;
  }
`;
