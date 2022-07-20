import { useState, useEffect } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar';
import { api } from './services/image-search-api';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [openModalObject, setOpenModalObject] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [isFullImage, setIsFullImage] = useState(false);

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    setStatus(Status.PENDING);

    try {
      api(searchName, page).then(({ totalImage, images }) => {
        if (totalImage === 0) {
          toast.error('Nothing found');
          setStatus(Status.REJECTED);
          return;
        }

        setItems(prevState => {
          if (totalImage === prevState.length) {
            setIsFullImage(true);
            setItems([...prevState, ...images]);
            setStatus(Status.RESOLVED);

            return;
          }

          setItems([...prevState, ...images]);
          setStatus(Status.RESOLVED);

          return;
        });
      });
    } catch (error) {
      setStatus(Status.REJECTED);
    }
  }, [page, searchName]);

  const hendleSubmitSearchForm = ({ name }) => {
    const validName = name.trim();
    if (validName === '') {
      toast.warn('The search field must be filled');
      return;
    }

    if (searchName === validName) {
      toast.warn('Replace the search term');
      return;
    }

    setSearchName(validName);
    setPage(1);
    setItems([]);
    setOpenModalObject(null);
    setStatus(Status.IDLE);
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

  return (() => {
    switch (status) {
      case Status.IDLE:
        return <Searchbar onSubmit={hendleSubmitSearchForm} />;
      case Status.PENDING:
        return (
          <>
            <Searchbar onSubmit={hendleSubmitSearchForm} />

            <ImageGallery items={items} hendleOpenModal={hendleOpenModal} />

            <Loader />
          </>
        );
      case Status.RESOLVED:
        return (
          <>
            <Searchbar onSubmit={hendleSubmitSearchForm} />

            <ImageGallery items={items} hendleOpenModal={hendleOpenModal} />

            {openModalObject && (
              <Modal image={openModalObject} closeModal={closeModal} />
            )}

            {!isFullImage && <Button onClick={loadMore}>Load More</Button>}
          </>
        );
      case Status.REJECTED:
        return <Searchbar onSubmit={hendleSubmitSearchForm} />;
      default:
        return <></>;
    }
  })();
};
