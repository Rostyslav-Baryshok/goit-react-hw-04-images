import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalStyled } from './Modal.styled';

export class Modal extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.addLisetenerEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.addLisetenerEsc);
  }

  addLisetenerEsc = e => {
    const { closeModal } = this.props;
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  onOverlayClick = e => {
    const { closeModal } = this.props;
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  render() {
    const { image } = this.props;
    const { url, alt } = image;

    return (
      <Overlay onClick={this.onOverlayClick}>
        <ModalStyled>
          <img src={url} alt={alt} />
        </ModalStyled>
      </Overlay>
    );
  }
}
