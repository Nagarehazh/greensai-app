import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { publicRequest } from '../../requestMethods';
import { addProduct } from '../../redux/cartRedux';
import {
  Container,
  Wrapper,
  ImgContainer,
  Image,
  InfoContainer,
  Title,
  Desc,
  Price,
  Filter,
  FilterTitle,
  AddContainer,
  AmountContainer,
  Amount,
  Remove,
  Add,
  Button,
} from './ProductPageStyles';
import {
  Announcement,
  Footer,
  NavBar,
  Newsletter,
} from '../../components';
import fullData from '../../constants/fullData.json'

function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = parseInt((location.pathname.split('/')[2]));
  const productId = fullData.find((item) => item.id === id);
  const [product] = React.useState(productId);
  const [quantity, setQuantity] = React.useState(1);

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity }));
  };

  return (
    <Container>
      <NavBar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}y</Title>
          <Desc>{product.desc}
          </Desc>
          <Price>${product.price}</Price>
          <Filter>
            <FilterTitle>{product.age} years old</FilterTitle>
          </Filter>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity('dec')}>
                -
              </Remove>
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity('inc')}>
                +
              </Add>
            </AmountContainer>
            <Button onClick={handleAddToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default Product;
