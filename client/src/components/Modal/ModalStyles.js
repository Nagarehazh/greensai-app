import styled from 'styled-components';

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

const ModalContainer = styled.div`
    width: 500px;
    min-height: 100px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
    padding: 20px;
    
    
`;

const EncabezadoModal = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #E8E8E8;

    h3 {
        font-weight: 500;
        font-size: 1.6rem;
        color: #1766DC;
`;

const ButtonClose = styled.button`
    background: transparent;
    border: none;
    font-size: 1.6rem;
    font-weight: 500;
    color: #1766DC;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    &:hover {
        background: #F2F2F2;
    }
`;

export {
  Overlay,
  ModalContainer,
  EncabezadoModal,
  ButtonClose,
};

