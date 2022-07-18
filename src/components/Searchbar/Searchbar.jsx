import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';

import { Header, FormStyle, Button, FieldStyle } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.resetForm();
        }}
      >
        <FormStyle>
          <Button type="submit">
            <ImSearch style={{ width: 20, height: 20, marginTop: 5 }} />
          </Button>

          <FieldStyle
            name="name"
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormStyle>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
