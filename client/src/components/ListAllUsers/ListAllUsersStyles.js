import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
    width: 100%;
    height: 100%;
    padding: 20px;
`;

const IsLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
`;

const CardIpBanned = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
    background-color: trasparent;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const ButtonEdit = styled.button`
    border: none;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.type === "true" ? "red" : "#fcf1ed"};
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
`;

const ContainerModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;

    h1 {
        font-size: 4.2rem;
        font-weight: 800;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.8rem;
        margin-bottom: 20px;
    }

`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
`;

const Input = styled.input`
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1.6rem;
`;

const ButtonModal = styled.button`
margin-top: 2rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #e6e6e6;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #4caf50;
        color: white;
        transform: scale(1.1);
    }
`;



const SelectCategory = styled.select`
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1.6rem;
`;

const OptionCategory = styled.option`
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1.6rem;
`;


export {
    Container,
    CardsContainer,
    IsLoading,
    CardIpBanned,
    ButtonEdit,
    ContainerModal,
    Form,
    Input,
    ButtonModal,
    SelectCategory,
    OptionCategory
}