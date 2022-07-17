import { useState, useEffect } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar';
import { api } from './services/image-search-api';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [openModalObject, setOpenModalObject] = useState(null);
  const [status, setStatus] = useState('idle');
  const [isFullImage, setIsFullImage] = useState(false);

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    setStatus('pending');

    try {
      api(searchName, page).then(({ totalImage, images }) => {
        if (totalImage === 0) {
          toast.error('Nothing found');
          setStatus('rejected');
          return;
        }

        setItems(prevState => {
          if (totalImage === prevState.length) {
            setIsFullImage(true);
            setItems([...prevState, ...images]);
            setStatus('rejected');

            return;
          }

          setItems([...prevState, ...images]);
          setStatus('rejected');

          return;
        });
      });
    } catch (error) {
      setStatus('rejected');
    }
  }, [page, searchName]);

  const hendeleSubmitSearchForm = ({ name }) => {
    const validName = name.trim();
    if (validName === '') {
      toast.error('The search field must be filled');
      return;
    }

    if (searchName === validName) {
      toast.error('Replace the search term');
      return;
    }

    setSearchName(validName);
    setPage(1);
    setItems([]);
    setOpenModalObject(null);
    setStatus('idle');
    setIsFullImage(false);
  };

  const hendleOpenModal = (url, alt) => {
    const modalObject = {
      url,
      alt,
    };
    setOpenModalObject(modalObject);
  };

  const closeModal = () => {
    setOpenModalObject(null);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  if (status === 'idle') {
    return (
      <>
        <Searchbar onSubmit={hendeleSubmitSearchForm} />
      </>
    );
  }

  if (status === 'panding') {
    return (
      <>
        <Searchbar onSubmit={hendeleSubmitSearchForm} />

        <ImageGallery items={items} hendleOpenModal={hendleOpenModal} />

        <Loader />
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <Searchbar onSubmit={hendeleSubmitSearchForm} />

        <ImageGallery items={items} hendleOpenModal={hendleOpenModal} />

        {openModalObject && (
          <Modal image={openModalObject} closeModal={closeModal} />
        )}

        {!isFullImage && <Button onClick={loadMore}>Load More</Button>}
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <Searchbar onSubmit={hendeleSubmitSearchForm} />
      </>
    );
  }
};
