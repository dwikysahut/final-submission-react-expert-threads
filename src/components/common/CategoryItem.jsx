/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryItem({ item, onChangeCategoryHandler }) {
  return (
    <button
      className="flex px-4 py-1 border-gray-800 border rounded-xl hover:bg-slate-700 hover:text-white transition-all duration-100"
      type="button"
      onClick={() => onChangeCategoryHandler(item.category)}
    >
      <Text as="p" fontSize="0.8rem">
        #
        {item.category}
      </Text>
    </button>
  );
}
CategoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  onChangeCategoryHandler: PropTypes.func.isRequired,
};
