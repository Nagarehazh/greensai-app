import React from 'react';
import {
  Overlay,
  ModalContainer,
  EncabezadoModal,
  ButtonClose,
} from './ModalStyles';



function Modal({ children, modal, setModal }) {
    
  return (
    <>
      {modal
        && (
        <Overlay>
          <ModalContainer>
            <EncabezadoModal>
              <h3>Greensai Dashboard</h3>
            </EncabezadoModal>
            <ButtonClose onClick={() => setModal(!modal)}>X</ButtonClose>
            {children}
          </ModalContainer>
        </Overlay>
        )}
    </>
  );
}

export default Modal;
