import { Box, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LeaderboardList from '../../components/common/LeaderboardList';
import { asyncGetAllLeaderboards } from '../../redux/leaderboards/action';

export default function Leaderboards() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetAllLeaderboards());
  }, []);
  return (
    <Box className="bg-white mx-7 p-5 rounded-xl">
      <Box>
        <Text as="h3" fontWeight="bold" fontSize="1.2rem">
          Klasemen Pengguna Aktif
        </Text>
        <LeaderboardList />
      </Box>
    </Box>
  );
}
