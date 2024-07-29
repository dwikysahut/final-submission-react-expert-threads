/* eslint-disable react/no-array-index-key */
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';

export default function CommentList() {
  const { thread = null } = useSelector((states) => states);
  console.log(thread);

  return (
    <Box className="gap-3 flex flex-col justify-center items-center">
      <Text className="mb-1 w-100" fontWeight="bold">
        Komentar (
        {thread?.comments?.length}
        )
      </Text>
      {thread?.comments?.map((item, index) => (
        <CommentItem threadId={thread.id} item={item} key={index} />
      ))}
    </Box>
  );
}
