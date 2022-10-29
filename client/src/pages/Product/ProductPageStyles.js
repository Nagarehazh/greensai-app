import styled from 'styled-components';

const Container = styled.div`
  
`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    align-items: center;
    @media ${(props) => props.theme.breakpoints.sm} {
        flex-direction: column;
        padding: 10px;
    }
`;
const ImgContainer = styled.div`
    flex: 1;

`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    @media ${(props) => props.theme.breakpoints.sm} {
        height: 40vh;
    }
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    @media ${(props) => props.theme.breakpoints.sm} {
        padding: 10px;
    }
`;

const Title = styled.h1`
    font-weight: 500;
`;

const Desc = styled.p`
   margin: 20px 0px;    
`;

const Price = styled.span`
    font-weight: 300;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    @media ${(props) => props.theme.breakpoints.sm} {
        width: 100%;
    }
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 300;
`;

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
    gap: 10px;
    @media ${(props) => props.theme.breakpoints.sm} {
        width: 100%;
    }
`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Remove = styled.button`
    cursor: pointer;
    border: none;   
    font-size: 20px;
    padding: 5px;
    font-weight: 500;
    border-radius: 50%;
    color: teal;
    &:hover {
        color: white;
        background-color: #DA86C0;
    }
`;

const Add = styled.button`
    cursor: pointer;
    border: none;
    padding: 5px;
    font-size: 20px;
    font-weight: 500;
    border-radius: 50%;
    color: teal;
    &:hover {
        color: white;
        background-color: green;
    }
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.5s ease;
    &:hover {
    background-color: #008080;
    color: white;
    border-radius: 10px;
}
`;

export {
  Container,
  Wrapper,
  ImgContainer,
  Image,
  InfoContainer,
  Title,
  Desc,
  Price,
  FilterContainer,
  Filter,
  FilterTitle,
  AddContainer,
  AmountContainer,
  Amount,
  Remove,
  Add,
  Button,
};
