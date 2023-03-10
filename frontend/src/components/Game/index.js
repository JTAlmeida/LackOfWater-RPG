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
            A humanidade sempre amou a busca por conhecimento e a tecnologia, n??o se importando com as consequ??ncias da
            evolu????o... A cria????o de m??quinas para fazer todo seu trabalho era de uma ajuda imensur??vel, portanto sempre
            se buscava aprimorar os rob??s, at?? chegar um ponto em que a intelig??ncia artificial se tornou consci??ncia e,
            consequentemente, os rob??s se tornaram mais do que ferramentas, viraram uma ra??a.
          </p>
          <p>
            A ra??a dos rob??s considerava humanos fracos por terem tantas necessidades prim??rias, enquanto eles podiam
            fazer v??rias coisas sem limita????o. Portanto, n??o queriam mais ser subordinados a estes mestres fracos e por
            ser t??o avan??ados conseguiam explorar as profundezas dos oceanos sem sucumbir ?? imensa press??o. Criaram uma
            cidade subaqu??tica e constru??ram um ex??rcito sem precedentes para eliminar os humanos.
          </p>
          <p>
            Com uma coisa eles n??o contavam: a ra??a humana ?? mais perseverante do que qualquer outra j?? existente e
            tinham criado e evolu??do os rob??s at?? este ponto, contavam com tecnologia t??o avan??ada quanto a deles e
            lutaram ferozmente por sua sobreviv??ncia, tanto que os desafiantes tiveram que bolar um plano s?? poss??vel
            com a tecnologia atual: ???os humanos n??o vivem sem ??gua, vamos acabar com eles por sua necessidade prim??ria
            inferior???.
          </p>
          <p>
            Foi ent??o que desenvolveram um mecanismo t??o poderoso que podia armazenar qualquer coisa em uma dimens??o
            alternativa que chamavam de ???Fim da Humanidade???. Com este mecanismo eles sugaram toda ??gua do planeta e os
            humanos entraram em desespero e tiveram brigas internas pela posse da ??gua remanescente.
          </p>
          <p>
            Neste momento voc??, um dos integrantes de elite do ex??rcito dos rob??s, decidiu com seu livre arb??trio que os
            humanos n??o mereciam tanto sofrimento e botaria um fim nesta guerra sem sentido, j?? que poderiam coexistir
            sem necessidade de demonstrar superioridade.{' '}
          </p>
          <p>
            Traindo sua pr??pria ra??a foi em busca do ???Fim da Humanidade??? para restaurar a ??gua, mas ele estava bem
            escondido em um labirinto com diversas salas que s?? o l??der dos rob??s e os guardi??es do labirinto sabiam o
            caminho para encontr??-lo.
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
