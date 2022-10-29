import React from 'react';
import { SearchOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {
  Container,
  Circle,
  Image,
  Icon,
  Info,
} from './ProductStyles';

function Product({ item }) {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <Link to={`/product/${item.id}`}>
            <SearchOutlined style={{ padding: '5px', width: '35px', height: '35px' }} />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
}

export default Product;

