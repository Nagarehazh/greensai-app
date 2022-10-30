import React from 'react';
import {
  Container,
} from './ProductsStyles';
import fullData from '../../constants/fullData.json'
import Product from '../Product/Product';

function Products({ cat, age, sort }) {
  const productByCategory = fullData.filter((item) => item.categories[0] === cat);
  const [products] = React.useState(productByCategory);
  const [filteredProducts, setFilteredProducts] = React.useState(products);

  React.useEffect(() => {
    age === 'all'
      ? setFilteredProducts(products)
      : setFilteredProducts(
        products.filter((product) => product.age[0] === parseInt(age)));

  }, [products, age]);

  React.useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts(
        filteredProducts.sort((a, b) => b.id - a.id),
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
