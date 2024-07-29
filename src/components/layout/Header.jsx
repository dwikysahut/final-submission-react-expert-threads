import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function Header() {
  return (
    <Box
      height="60px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      position="fixed"
      bg="#4F6F52"
    >
      <Text fontSize="1.5rem" fontWeight="bold" color="#E8DFCA" align="center">
        E - Forum
      </Text>
    </Box>
  );
}
