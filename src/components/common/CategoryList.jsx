/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';

export default function CategoryList({ onChangeCategoryHandler }) {
  const { threads = null } = useSelector((states) => states);

  return (
    <Box className="flex flex-row gap-3">
      {threads?.length > 0 ? (
        threads.map((item, index) => (
          <CategoryItem key={index} item={item} threads onChangeCategoryHandler={onChangeCategoryHandler} />
        ))
      ) : (
        <>Tidak ada thread</>
      )}
    </Box>
  );
}
CategoryItem.propTypes = {
  onChangeCategoryHandler: PropTypes.func.isRequired,
};
