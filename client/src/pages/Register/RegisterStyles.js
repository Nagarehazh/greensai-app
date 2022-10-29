import styled from 'styled-components';

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)
),
url("https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
display: flex;
align-items: center;
justify-content: center;

`;

const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: white;
@media ${(props) => props.theme.breakpoints.sm} {
    width: 75%;
}
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 400;
`;

const Form = styled.form`
display: flex;
flex-wrap: wrap;
`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`;

const Agreement = styled.span`
font-size: 12px;
margin: 20px 0px;
`;

const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;

`;

const Error = styled.span`
    color: red;
`;

export {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  Agreement,
  Button,
  Error,
};
