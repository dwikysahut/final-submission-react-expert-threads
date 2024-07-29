import React from 'react';
import { PiChatsBold } from 'react-icons/pi';
import { MdLogout, MdOutlineLeaderboard } from 'react-icons/md';
import { Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncLogoutAuthUser } from '../../redux/authUser/action';

export default function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickLeaderboardHandler = () => {
    navigate('leaderboards');
  };
  const onClickThreadHandler = () => {
    navigate('/');
  };
  const onClickLogoutHandler = () => {
    dispatch(asyncLogoutAuthUser());
    navigate('/login');
  };
  return (
    <div className="w-full bottom-5 bg-transparent fixed flex justify-center items-center box-border">
      <div className=" flex gap-5  bg-slate-200 rounded-2xl p-3 shadow-2xl">
        <Box
          display="flex"
          as="button"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          onClick={onClickThreadHandler}
          className="hover:scale-125 duration-200 cursor-pointer"
        >
          <PiChatsBold size={20} />
          <Text fontSize="0.8rem">Threads</Text>
        </Box>
        <Box
          as="button"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          onClick={onClickLeaderboardHandler}
          className="hover:scale-125 duration-200 cursor-pointer"
        >
          <MdOutlineLeaderboard size={20} />

          <Text fontSize="0.8rem">Leaderboards</Text>
        </Box>
        <Box
          as="button"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          onClick={onClickLogoutHandler}
          className="hover:scale-125 duration-200 cursor-pointer"
        >
          <MdLogout size={20} />

          <Text fontSize="0.8rem">Logout</Text>
        </Box>
      </div>
    </div>
  );
}
