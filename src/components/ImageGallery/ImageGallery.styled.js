import styled from 'styled-components';

export const List = styled.ul`
  grid-gap: 16px;
  list-style: none;
  display: grid;
  column-gap: 20px;
  padding: 0 15px;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
`;
