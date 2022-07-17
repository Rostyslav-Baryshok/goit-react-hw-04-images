import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalStyled } from './Modal.styled';

export const Modal = ({ image, closeModal }) => {
  useEffect(() => {
    const addLisetenerEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', addLisetenerEsc);

    return () => {
      document.removeEventListener('keydown', addLisetenerEsc);
    };
  }, [closeModal]);

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const { url, alt } = image;

  return (
    <Overlay onClick={onOverlayClick}>
      <ModalStyled>
        <img src={url} alt={alt} />
      </ModalStyled>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
