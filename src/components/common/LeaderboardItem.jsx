/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

export default function LeaderboardItem({ item }) {
  return (
    <Box borderBottom="1px" borderColor="gray" padding="1rem">
      <Flex alignItems="center" gap="1rem" paddingInline="1rem">
        <img src={item?.user?.avatar} className="rounded-full w-12 h-12" alt={`foto-${item?.user?.name}`} />
        <Flex justifyContent="space-between" flex={1} alignItems="center">
          <Text>{item?.user?.name}</Text>
          <Text>{item?.score}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
LeaderboardItem.propTypes = {
  item: PropTypes.object.isRequired,
};
