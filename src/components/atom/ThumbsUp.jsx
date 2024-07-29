/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

export default function ThumbsUp({ item, onCLickHandler, isUpVoted }) {
  return (
    <Box as="button" className="flex gap-2 z-50">
      {isUpVoted ? (
        <FaThumbsUp size={15} onClick={onCLickHandler} />
      ) : (
        <FaRegThumbsUp size={15} onClick={onCLickHandler} />
      )}
      <Text fontSize="0.7rem" margin={0}>
        {item?.upVotesBy?.length}
      </Text>
    </Box>
  );
}

ThumbsUp.propTypes = {
  item: PropTypes.object.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  onCLickHandler: PropTypes.func.isRequired,
};
