import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar';
import { api } from './services/image-search-api';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchName: '',
    page: 1,
    items: [],
    openModalObject: null,
    status: 'idle',
    isFullImage: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchName, page } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.searchName !== this.state.searchName
    ) {
      this.setState({ status: 'pending' });

      try {
        api(searchName, page).then(({ totalImage, images }) => {
          this.setState(prevState => {
            if (totalImage === 0) {
              toast.error('Nothing found');
              return {
                status: 'rejected',
              };
            }

            if (totalImage === prevState.items.length) {
              return {
                isFullImage: true,
                items: [...prevState.items, ...images],
                status: 'resolved',
              };
            }

            return {
              items: [...prevState.items, ...images],
              status: 'resolved',
            };
          });
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  hendeleSubmitSearchForm = ({ name }) => {
    const validName = name.trim();
    if (validName === '') {
      toast.error('The search field must be filled');
      return;
    }

    if (this.state.searchName === validName) {
      toast.error('Replace the search term');
      return;
    }

    this.setState({
      searchName: validName,
      page: 1,
      items: [],
      openModalObject: null,
      status: 'idle',
      isFullImage: false,
    });
  };

  hendleOpenModal = (url, alt) => {
    const modalObject = {
      url,
      alt,
    };
    this.setState({ openModalObject: modalObject });
  };

  closeModal = () => {
    this.setState({ openModalObject: null });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { items, openModalObject, status, isFullImage } = this.state;
    if (status === 'idle') {
      return <Searchbar onSubmit={this.hendeleSubmitSearchForm} />;
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.hendeleSubmitSearchForm} />

          <ImageGallery items={items} hendleOpenModal={this.hendleOpenModal} />
          <Loader />
          {items.length !== 0 && !isFullImage && (
            <Button onClick={this.loadMore}>Load More</Button>
          )}
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.hendeleSubmitSearchForm} />

          <ImageGallery items={items} hendleOpenModal={this.hendleOpenModal} />

          {openModalObject && (
            <Modal image={openModalObject} closeModal={this.closeModal} />
          )}

          {items.length !== 0 && !isFullImage && (
            <Button onClick={this.loadMore}>Load More</Button>
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return <Searchbar onSubmit={this.hendeleSubmitSearchForm} />;
    }
  }
}
