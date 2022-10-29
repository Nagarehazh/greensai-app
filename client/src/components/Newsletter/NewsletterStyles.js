import styled from 'styled-components';
import newsletterImage from '../../images/newsletter.jpg';

const Container = styled.div`
    height: 60vh;
    background-image: url(${newsletterImage});
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
    
`;
const Desc = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
    @media ${(props) => props.theme.breakpoints.sm} {
        text-align: center;
    }
`;
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    @media ${(props) => props.theme.breakpoints.sm} {
        width: 80%;
    }
`;
const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`;
const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
    &:hover {
        transform: scale(1.1);
        border-radius: 5px;
    }
`;

export {
  Container,
  Title,
  Desc,
  InputContainer,
  Input,
  Button,
};
