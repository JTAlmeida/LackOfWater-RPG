import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiFillGithub } from 'react-icons/ai';
import UserContext from '../../contexts/UserContext';
import AuthLayout from '../../layouts/Auth';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Row, Title, Label } from '../../components/Auth';
import Link from '../../components/Link';
import useSignUp from '../../hooks/api/useSignUp';
import useSignInWithFireBase from '../../hooks/api/useSignInWithFirebase';
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { app } from '../../services/firebaseConfig';
import logo from '../../assets/images/logo.png';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingSignUp, signUp } = useSignUp();
  const { signInFirebase } = useSignInWithFireBase();

  const navigate = useNavigate();

  const { setUserData } = useContext(UserContext);

  const provider = new GithubAuthProvider();
  const auth = getAuth(app);

  async function handleLoginFromGithub() {
    try {
      const responseFirebase = await signInWithPopup(auth, provider);
      const userData = await signInFirebase({
        email: responseFirebase.user.email,
        idSession: responseFirebase.user.uid,
      });
      setUserData(userData);
      toast('Inscrito com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast('Não foi possível fazer o cadastro!');
    }
  }

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas devem ser iguais!');
    } else {
      try {
        await signUp(email, password);
        toast('Inscrito com sucesso! Por favor, faça login.');
        navigate('/sign-in');
      } catch (error) {
        toast('Não foi possível fazer o cadastro!');
      }
    }
  }

  return (
    <AuthLayout background={'black'}>
      <Row>
        <img src={logo} alt="logo" width="60px" />
        <Title>Lack of Water RPG</Title>
      </Row>
      <Row>
        <Label>Inscrição</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Repita sua senha"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignUp}>
            Inscrever
          </Button>
        </form>
        <Button fullWidth onClick={handleLoginFromGithub}>
          <AiFillGithub fontSize={'25'} />
          <h3>Inscrever com Github</h3>
        </Button>
      </Row>
      <Row>
        <Link to="/sign-in" margintop="true">
          Já está inscrito? Faça login
        </Link>
      </Row>
    </AuthLayout>
  );
}
