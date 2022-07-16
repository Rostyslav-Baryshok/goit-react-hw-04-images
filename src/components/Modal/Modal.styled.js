import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.overlay};
  z-index: 1200;
`;

export const ModalStyled = styled.div`
  max-width: 950px;
  max-height: 750px;
`;
