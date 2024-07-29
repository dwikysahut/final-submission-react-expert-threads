/* eslint-disable import/no-extraneous-dependencies */
import {
  Box, Button, Text, Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncPostComment } from '../../redux/comments/action';

export default function CommentInput({ id }) {
  const [stateInput, setStateInput] = useState({ field: '' });
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setStateInput({ field: e?.target?.value });
  };
  const onSubmitComment = () => {
    if (stateInput.field === '') {
      alert('Komentar harus diisi');
    } else {
      dispatch(asyncPostComment(id, stateInput.field));
      setStateInput({ field: '' });
    }
  };

  return (
    <Box className="my-4">
      {/* <ThreadItem item={}/> */}
      <Text as="h3" fontWeight="bold" marginBottom="1rem">
        Beri Komentar
      </Text>
      <Textarea
        borderRadius="15px"
        padding="1rem"
        value={stateInput.field}
        onChange={onChangeHandler}
        placeholder="Tulis Komentar"
        size=""
      />
      <Button
        onClick={onSubmitComment}
        marginTop="1rem"
        w="100%"
        disabled={stateInput.field === ''}
        colorScheme="blackAlpha"
      >
        Kirim
      </Button>
    </Box>
  );
}

CommentInput.propTypes = {
  id: PropTypes.string.isRequired,
};
