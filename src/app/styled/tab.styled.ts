import { Nav, Card } from 'react-bootstrap';
import styled from 'styled-components';
import { font } from './function/_font.styled';

export const TabLink = styled(Nav.Link)`
  color: var(--black-600);
  background: var(--white);
  padding: 0.667rem 1.067rem;
  gap: 0.533rem;
  font-weight: 500;
  font-size: 0.867rem;
  line-height: 150%;
  ${font({})}

  &.active {
    font-weight: 600;
    color: var(--primary);
    box-shadow: inset 0px -2px 0px 0px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const CardHeader = styled(Card.Header)`
  border-radius: 6px 6px 0px 0px !important;
  border-color: var(--black-50);
  padding: 1.133rem 1.067rem;
  font-weight: 600;
  font-size: 0.867rem;
  line-height: 150%;
  color: var(--black);
`
export const CardFooter = styled(Card.Footer)`
  padding: 1.133rem 1.067rem;
  border-radius: 0px 0px 6px 6px;
  border-color: var(--black-50);
`
