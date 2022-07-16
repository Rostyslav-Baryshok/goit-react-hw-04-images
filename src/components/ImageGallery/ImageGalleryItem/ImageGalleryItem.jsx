import PropTypes from 'prop-types';

import { Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  largeImageURL,
  onClick,
}) => {
  return (
    <Item id={id} onClick={() => onClick(largeImageURL, tags)}>
      <img src={webformatURL} alt={tags} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
