/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CategoryList from '../../components/common/CategoryList';
import ThreadList from '../../components/common/ThreadList';
import { asyncGetAllThreads } from '../../redux/threads/action';
import AddButton from '../../components/atom/AddButton';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { threads = null } = useSelector((states) => states);

  const onChangeCategoryHandler = (value) => {
    setSearchParams({ category: value });
  };
  useEffect(() => {
    dispatch(asyncGetAllThreads());
  }, []);
  return (
    <Box maxWidth="1000px" minWidth="800px" bg="white" margin="0 auto" padding="80px 2rem" minH="100vh">
      <AddButton onCLickHandler={() => navigate('thread/create')} />
      <Text as="h2" className="my-3 font-bold text-2xl">
        Kategori Tersedia
      </Text>
      <CategoryList onChangeCategoryHandler={onChangeCategoryHandler} />
      <Text as="h2" className="my-3 font-bold text-2xl">
        Threads
      </Text>
      <ThreadList />
    </Box>
  );
}
