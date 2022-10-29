import React from 'react';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logoblack from '../../images/logob.png';

import {
  Container,
  Wrapper,
  Left,
  Center,
  Logo,
  Right,
  MenuItem,
} from './NavBarStyles';

function NavBar() {
  let quantity = useSelector((state) => state.cart.quantity);

  // localstorage get quantity
  if (localStorage.getItem('quantity')) {
    quantity = JSON.parse(localStorage.getItem('cart')).quantity;
    React.useEffect(() => {
      // localstorage get quantity
      quantity = JSON.parse(localStorage.getItem('cart')).quantity;
    }, [quantity]);
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <img src={logoblack} alt="Logo" width="35" />
          </Link>
        </Left>
        <Center><Logo>GREENSAI</Logo></Center>
        <Right>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined style={{ width: '20px', height: '20px' }} />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default NavBar;
