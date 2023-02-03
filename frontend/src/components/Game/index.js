import GameContext from '../../contexts/GameContext';
import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from '../Wrapper';
import logo from '../../assets/images/logo.png';
import useCreateChar from '../../hooks/api/useCreateChar';
import useUpdateChar from '../../hooks/api/useUpdateChar';
import { toast } from 'react-toastify';
import Scene from './Scene';
import Swal from 'sweetalert2';

export default function Game() {
  const { char, isAlive, sceneId, currentHP, enemyXP, reloadChar, setReloadChar } = useContext(GameContext);
  const { createChar } = useCreateChar();
  const { updateChar } = useUpdateChar();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: '' });

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function sendStartGame(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      await createChar(form);
      setIsLoading(false);
      Swal.fire({
        title: 'Char criado com sucesso!',
        confirmButtonText: 'OK',
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      toast('Houve um erro ao criar o personagem!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      setIsLoading(false);
    }
  }

  useEffect(async() => {
    if (isAlive !== true || sceneId !== 1) {
      try {
        let currentXP;
        if (char?.currentSceneId === 9) {
          currentXP = char.xp;
        } else {
          currentXP = enemyXP + char.xp;
        }

        let currentLVL;
        if (currentXP >= char?.lvl * 50 + (char?.lvl - 1) * (50 * (char?.lvl - 1))) {
          currentLVL = Number(char?.lvl + 1);
        } else {
          currentLVL = char?.lvl;
        }
        const currentATK = 15 + 5 * currentLVL;
        const currentDEF = 3 + currentLVL;

        await updateChar(
          {
            currentSceneId: sceneId,
            atk: currentATK,
            def: currentDEF,
            hp: currentHP,
            xp: currentXP,
            lvl: currentLVL,
            isAlive: isAlive,
          },
          char?.id
        );
        setReloadChar(!reloadChar);
      } catch (error) {
        console.error(error);
      }
    }
  }, [isAlive, sceneId]);

  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      {char && isAlive ? (
        <>
          <Scene char={char} />
        </>
      ) : (
        <div>
          <p>
            A humanidade sempre amou a busca por conhecimento e a tecnologia, não se importando com as consequências da
            evolução... A criação de máquinas para fazer todo seu trabalho era de uma ajuda imensurável, portanto sempre
            se buscava aprimorar os robôs, até chegar um ponto em que a inteligência artificial se tornou consciência e,
            consequentemente, os robôs se tornaram mais do que ferramentas, viraram uma raça.
          </p>
          <p>
            A raça dos robôs considerava humanos fracos por terem tantas necessidades primárias, enquanto eles podiam
            fazer várias coisas sem limitação. Portanto, não queriam mais ser subordinados a estes mestres fracos e por
            ser tão avançados conseguiam explorar as profundezas dos oceanos sem sucumbir à imensa pressão. Criaram uma
            cidade subaquática e construíram um exército sem precedentes para eliminar os humanos.
          </p>
          <p>
            Com uma coisa eles não contavam: a raça humana é mais perseverante do que qualquer outra já existente e
            tinham criado e evoluído os robôs até este ponto, contavam com tecnologia tão avançada quanto a deles e
            lutaram ferozmente por sua sobrevivência, tanto que os desafiantes tiveram que bolar um plano só possível
            com a tecnologia atual: “os humanos não vivem sem água, vamos acabar com eles por sua necessidade primária
            inferior”.
          </p>
          <p>
            Foi então que desenvolveram um mecanismo tão poderoso que podia armazenar qualquer coisa em uma dimensão
            alternativa que chamavam de “Fim da Humanidade”. Com este mecanismo eles sugaram toda água do planeta e os
            humanos entraram em desespero e tiveram brigas internas pela posse da água remanescente.
          </p>
          <p>
            Neste momento você, um dos integrantes de elite do exército dos robôs, decidiu com seu livre arbítrio que os
            humanos não mereciam tanto sofrimento e botaria um fim nesta guerra sem sentido, já que poderiam coexistir
            sem necessidade de demonstrar superioridade.{' '}
          </p>
          <p>
            Traindo sua própria raça foi em busca do “Fim da Humanidade” para restaurar a água, mas ele estava bem
            escondido em um labirinto com diversas salas que só o líder dos robôs e os guardiões do labirinto sabiam o
            caminho para encontrá-lo.
          </p>
          {isLoading ? (
            <>
              <Form onSubmit={sendStartGame}>
                <Input
                  disabled
                  placeholder="Insira o nome do seu personagem para inciar o jogo"
                  name="name"
                  type="text"
                  required
                />
                <Button disabled type="submit">
                  Loading...
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Form onSubmit={sendStartGame}>
                <Input
                  placeholder="Insira o nome do seu personagem para inciar o jogo"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleForm}
                  required
                />
                <Button type="submit">Iniciar jogo!</Button>
              </Form>
            </>
          )}
        </div>
      )}
    </Wrapper>
  );
}

const Button = styled.button`
  height: 10%;
  width: 80%;

  height: 37px;
  box-shadow: 0px 2px 10px 0px #00000040;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  @media (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

const Form = styled.form``;

const Input = styled.input`
  height: 30px;
  width: 320px;
  margin-bottom: 10px;
  padding: 5px;
`;
