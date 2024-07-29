/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import LeaderboardItem from './LeaderboardItem';

export default function LeaderboardList() {
  const { leaderboards = null } = useSelector((states) => states);

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      {leaderboards?.length > 0 ? leaderboards?.map((item) => <LeaderboardItem item={item} />) : <></>}
    </Box>
  );
}
