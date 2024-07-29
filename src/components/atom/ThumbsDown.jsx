/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';

export default function ThumbsDown({ item, onCLickHandler, isDownVoted }) {
  return (
    <Text as="button" className="flex gap-2">
      {isDownVoted ? (
        <FaThumbsDown size={15} onClick={onCLickHandler} />
      ) : (
        <FaRegThumbsDown size={15} onClick={onCLickHandler} />
      )}
      <Text fontSize="0.7rem" margin={0}>
        {item?.downVotesBy?.length}
      </Text>
    </Text>
  );
}

ThumbsDown.propTypes = {
  item: PropTypes.object.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  onCLickHandler: PropTypes.func.isRequired,
};
