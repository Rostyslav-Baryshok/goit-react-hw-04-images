import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px 16px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.accent};
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.light};
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  min-width: 180px;
  box-shadow: 0px 2px 3px 1px #28338a;
  display: block;
  margin: 20px auto;

  :hover {
    transition: all 0.3s ease;
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
