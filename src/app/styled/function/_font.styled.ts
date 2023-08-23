import get from 'lodash/get';
import { STYLED_CONFIG } from '../_config.styled';

interface IFont {
  color?: string;
  size?: string;
  weight?: string;
  family?: 'primary' | 'secondary';
}

const font = ({ color, size, family, weight }: IFont) => `
  color: ${color || 'inherit'};
  font-size: ${size || 'inherit'};
  font-weight: ${weight || undefined};
  font-family: ${
    get(STYLED_CONFIG, `font.${family}`) || get(STYLED_CONFIG, `font.primary`)
  }, sans-serif;
`;

export { font };
