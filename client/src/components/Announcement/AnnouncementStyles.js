import styled from 'styled-components';

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    max-width: 100vw;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
`;

const H4 = styled.h4`
width: 100%;
animation: animate 33s linear infinite;
@keyframes animate {
    100% {
        transform: translateX(-50%);
    }
    0% {
        transform: translateX(100%);
    }
}
@media ${(props) => props.theme.breakpoints.sm} {
    animation: animate 10s linear infinite;
    text-align: center;
}
`;

export {
  Container,
  H4,
};
