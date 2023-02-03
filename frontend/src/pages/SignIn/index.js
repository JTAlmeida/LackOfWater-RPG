import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiFillGithub } from 'react-icons/ai';
import AuthLayout from '../../layouts/Auth';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';
import UserContext from '../../contexts/UserContext';
import useSignIn from '../../hooks/api/useSignIn';
import useSignInWithFireBase from '../../hooks/api/useSignInWithFirebase';
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { app } from '../../services/firebaseConfig';
import logo from '../../assets/images/logo.png';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();
  const { signInFirebase } = useSignInWithFireBase();

  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

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
      toast('Login realizado com sucesso!');
      navigate('/');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  return (
    <AuthLayout background={'black'}>
      <Row>
        <img src={logo} alt="Event Logo" width="60px" />
        <Title>Lack of Water RPG</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>
            Entrar
          </Button>
        </form>
        <Button fullWidth onClick={handleLoginFromGithub}>
          <AiFillGithub fontSize={'25'} />
          <h3>Entrar com Github</h3>
        </Button>
      </Row>

      <Row>
        <Link to="/sign-up">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
