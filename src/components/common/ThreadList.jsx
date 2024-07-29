/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ThreadItem from './ThreadItem';

export default function ThreadList() {
  const { threads = null } = useSelector((states) => states);
  const [searchParams] = useSearchParams();
  const filteredThreads = searchParams.get('category')
    ? threads?.filter((item) => item.category.includes(searchParams.get('category')))
    : threads;

  console.log(threads);
  return (
    <Box className="flex flex-col gap-3">
      {filteredThreads?.length > 0 ? (
        filteredThreads.map((item, index) => <ThreadItem key={index} item={item} />)
      ) : (
        <></>
      )}
    </Box>
  );
}
