import React from 'react';
import {
  Container,
} from './CategoriesStyles';
import { categories } from '../../constants/data';
import CategoryItem from '../CategoryItem/CategoryItem';

function Categories() {
  return (
    <Container>
      {categories.map((item, i) => (
        <CategoryItem item={item} key={i} />
      ))}
    </Container>
  );
}

export default Categories;

