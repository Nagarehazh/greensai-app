import styled from 'styled-components';

const Container = styled.div`
display: flex;
padding: 20px;
justify-content: space-between;
@media ${(props) => props.theme.breakpoints.sm} {
    flex-direction: column;
    padding: 0px;
}
`;

export {
  Container,
};
