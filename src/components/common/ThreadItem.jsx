/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-extraneous-dependencies */
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { FaReply } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { diffTime } from '../../utils/helpers';
import ThumbsUp from '../atom/ThumbsUp';
import ThumbsDown from '../atom/ThumbsDown';
import { asyncDownVoteThread, asyncNeutralVoteThread, asyncUpVoteThread } from '../../redux/threads/action';

export default function ThreadItem({ item, isDetail = false }) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);
  const isUpVoted = item?.upVotesBy.includes(authUser.user.id);
  const isDownVoted = item?.downVotesBy.includes(authUser.user.id);

  const onUpVoteThread = () => {
    console.log(isUpVoted);
    if (isUpVoted) {
      dispatch(asyncNeutralVoteThread({ id: item.id, isUpVote: true, isDetail }));
    } else if (isDownVoted) {
      dispatch(asyncNeutralVoteThread({ id: item.id, isUpVote: false, isDetail }));
      dispatch(asyncUpVoteThread(item.id, isDetail));
    } else {
      dispatch(asyncUpVoteThread(item.id, isDetail));
    }
  };
  const onDownVoteThread = () => {
    if (isDownVoted) {
      dispatch(asyncNeutralVoteThread({ id: item.id, isUpVote: false, isDetail }));
    } else if (isUpVoted) {
      dispatch(asyncNeutralVoteThread({ id: item.id, isUpVote: true, isDetail }));
      dispatch(asyncDownVoteThread(item.id, isDetail));
    } else {
      dispatch(asyncDownVoteThread(item.id, isDetail));
    }
  };
  return (
    <Box className="border-b " onClick={() => {}}>
      <button
        className="flex px-4 py-0 my-2 border-gray-500 border rounded-md hover:bg-slate-700 hover:text-white transition-all duration-100"
        type="button"
      >
        <Text as="p" fontSize="0.7rem">
          {item?.category}
        </Text>
      </button>
      <Box>
        {isDetail ? (
          <Text className="mt-3 font-bold">
            {' '}
            {item?.title}
          </Text>
        ) : (
          <Link to={`/thread/${item.id}`}>
            <Text className="mt-3">
              {' '}
              {item?.title}
            </Text>
          </Link>
        )}
        <div fontSize="0.8rem" className="elipsis-text my-2" dangerouslySetInnerHTML={{ __html: item?.body }} />

        <Flex gap="3" marginBottom="1rem" alignItems="center">
          <ThumbsUp item={item} isUpVoted={isUpVoted} onCLickHandler={onUpVoteThread} />
          <ThumbsDown item={item} isDownVoted={isDownVoted} onCLickHandler={onDownVoteThread} />
          {!isDetail && (
            <Text as="button" className="flex gap-2">
              <FaReply size={15} />
              <Text fontSize="0.7rem" margin={0}>
                {item?.totalComments}
              </Text>
            </Text>
          )}
          <Text fontSize="0.7rem" margin={0}>
            {diffTime(item?.createdAt)}
          </Text>
          <Text fontSize="0.7rem" margin={0}>
            Dibuat Oleh
            {' '}
            <img src={item?.owner?.avatar} className="w-[20px] h-[20px] rounded-full inline" />
            <span className="font-bold">
              {' '}
              {item?.owner?.name}
            </span>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

ThreadItem.propTypes = {
  item: PropTypes.object.isRequired,
  isDetail: PropTypes.bool,
};
