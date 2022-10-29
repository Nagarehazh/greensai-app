import styled from 'styled-components';

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
    animation: animateCard 1s;
    @keyframes animateCard {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media ${(props) => props.theme.breakpoints.sm} {
        height: 40vh;
    }
`;
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`;
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
    &:hover {
    background-color: #008080;
    color: white;
    border-radius: 10px;
}
`;

export {
  Container,
  Image,
  Info,
  Title,
  Button,
};
