import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { register, login } from '../../redux/apiCalls';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  Agreement,
  Button,
  Error,
} from './RegisterStyles';

function Register() {
  const navigate = useNavigate();
  const [userName, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);
  

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { userName, email, password });
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="confirm password" type="password" onChange={(e) => setPasswordAgain(e.target.value)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
          <Error>{password !== passwordAgain && 'Password Confirmation Not Match'}</Error>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;
