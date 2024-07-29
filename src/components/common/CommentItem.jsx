/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Avatar, Box, Flex, Text,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ThumbsUp from '../atom/ThumbsUp';
import ThumbsDown from '../atom/ThumbsDown';
import { diffTime } from '../../utils/helpers';
import { asyncDownVoteComment, asyncNeutralVoteComment, asyncUpVoteComment } from '../../redux/comments/action';

export default function CommentItem({ item, threadId }) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);
  const isUpVoted = item?.upVotesBy.includes(authUser.user.id);
  const isDownVoted = item?.downVotesBy.includes(authUser.user.id);
  const onUpVoteComment = () => {
    if (isUpVoted) {
      dispatch(asyncNeutralVoteComment({ threadId, commentId: item.id, isUpVote: true }));
    } else if (isDownVoted) {
      dispatch(asyncNeutralVoteComment({ threadId, commentId: item.id, isUpVote: false }));
      dispatch(asyncUpVoteComment(threadId, item.id));
    } else {
      dispatch(asyncUpVoteComment(threadId, item.id));
    }
  };
  const onDownVoteThread = () => {
    if (isDownVoted) {
      dispatch(asyncNeutralVoteComment({ threadId, commentId: item.id, isUpVote: false }));
    } else if (isUpVoted) {
      dispatch(asyncNeutralVoteComment({ threadId, commentId: item.id, isUpVote: true }));
      dispatch(asyncDownVoteComment(threadId, item.id));
    } else {
      dispatch(asyncDownVoteComment(threadId, item.id));
    }
  };
  return (
    <Box className="flex flex-col gap-2 w-[50%] shadow-lg border-gray-500 border p-4 rounded-xl">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex justifyContent="center" gap="1rem" alignItems="center">
          <Avatar size="sm" name={item?.owner?.name} className="overflow-hidden justify-center flex items-center" />
          <Text fontSize="0.8rem">{item?.owner?.name}</Text>
        </Flex>
        <Text fontSize="0.7rem" fontWeight="light">
          {diffTime(item?.createdAt)}
        </Text>
      </Flex>
      <Text dangerouslySetInnerHTML={{ __html: item?.content }} />
      <Flex gap="1rem" marginTop="1rem">
        <ThumbsUp item={item} onCLickHandler={onUpVoteComment} isUpVoted={isUpVoted} />
        <ThumbsDown item={item} onCLickHandler={onDownVoteThread} isDownVoted={isDownVoted} />
      </Flex>
    </Box>
  );
}
CommentItem.propTypes = {
  item: PropTypes.object.isRequired,
  threadId: PropTypes.string.isRequired,
};
