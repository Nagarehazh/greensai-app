import React from 'react';
import { publicRequest } from '../../requestMethods';
import {
  Container,
} from './ProductsStyles';
import fullData from '../../constants/fullData.json'
import Product from '../Product/Product';

function Products({ cat, age, sort }) {
  const [products] = React.useState(fullData);
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  

  React.useEffect(() => {
    age === 'all'
      ? setFilteredProducts(products)
      : setFilteredProducts(
        products.filter((product) => product.age.includes(age)),
      );
  }, [products, age]);

  React.useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts(
        filteredProducts.sort((a, b) => b._id - a._id),
      );
    } else if (sort === 'asc') {
      setFilteredProducts(
        filteredProducts.sort((a, b) => a.price - b.price),
      );
    } else if (sort === 'desc') {
      setFilteredProducts(
        filteredProducts.sort((a, b) => b.price - a.price),
      );
    }
  }, [sort, filteredProducts]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item, i) => <Product item={item} key={i} />)
        : products
          .slice(0, 8)
          .map((item, i) => <Product item={item} key={i} />)}
    </Container>
  );
}

export default Products;
