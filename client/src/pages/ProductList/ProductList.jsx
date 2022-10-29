import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  Container,
  Title,
  FilterContainer,
  Filter,
  FilterText,
  Select,
  Option,
} from './ProductListStyles';
import {
  NavBar,
  Announcement,
  Products,
  Newsletter,
  Footer,
} from '../../components';

function ProductList() {
  const location = useLocation();
  const cat = (location.pathname.split('/')[2]);

  const [sort, setSort] = React.useState('newest');
  const [age, setAge] = React.useState('all');

  return (
    <Container>
      <NavBar />
      <Announcement />
      <Title>{(cat.charAt(0).toUpperCase()) + cat.slice(1)} Bonsai</Title>
      <FilterContainer>
        <Filter><FilterText>Filter Products:</FilterText>
          <Select name="agebonsai" onChange={(e) => setAge(e.target.value)}>
            <Option value="all">Age(Years Old)</Option>
            <Option value="5">5</Option>
            <Option value="15">15</Option>
            <Option value="30">30</Option>
          </Select>
        </Filter>
        <Filter><FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} age={age} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default ProductList;
