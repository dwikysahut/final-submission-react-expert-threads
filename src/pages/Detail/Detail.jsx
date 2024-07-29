import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ThreadItem from '../../components/common/ThreadItem';
import CommentInput from '../../components/atom/CommentInput';
import CommentList from '../../components/common/CommentList';
import { asyncGetThread } from '../../redux/threadDetail/action';

export default function Detail() {
  const dispatch = useDispatch();
  const { threadId } = useParams();
  const { thread = null } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncGetThread(threadId));
  }, []);
  return (
    <Box
      minHeight="80vh"
      backgroundColor="white"
      borderRadius="20px"
      margin="3rem"
      marginTop="80px"
      padding="4rem"
    >
      {thread && <ThreadItem item={thread} isDetail />}
      <CommentInput id={threadId} />
      <CommentList />
    </Box>
  );
}
