/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';

export default function AddButton({ onCLickHandler }) {
  return (
    <Box
      className="cursor-pointer fixed right-5 z-50 bottom-5 h-16 bg-green-700 rounded-full w-16 flex justify-center items-center"
      onClick={onCLickHandler}
    >
      <FaPlusCircle color="white" size={30} />
    </Box>
  );
}

AddButton.propTypes = {
  onCLickHandler: PropTypes.func.isRequired,
};
