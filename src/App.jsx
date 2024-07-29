import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import HomeLayout from './pages/HomeLayout/Home';
import Loading from './components/atom/Loading';
import { fetchMe } from './redux/authUser/action';
import AddThreads from './pages/Threads/AddThreads';
import Leaderboards from './pages/Leaderboards/Leaderboards';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);
  useEffect(() => {}, [authUser]);
  const authRoute = () => {
    if (authUser?.user) {
      return (
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="thread/:threadId" element={<Detail />} />
            <Route path="thread/create" element={<AddThreads />} />
            <Route path="leaderboards" element={<Leaderboards />} />
            <Route path="/*" element={<NotFound redirectPage="" />} />
          </Route>
          <Route path="/*" element={<NotFound redirectPage="" />} />
        </Routes>
      );
    }
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<NotFound redirectPage="" />} />
      </Routes>
    );
  };
  if (authUser.isPreload) return null;
  return (
    <div className="relative h-[100vh]">
      <Loading />
      <ChakraProvider>
        <main>{authRoute()}</main>
      </ChakraProvider>
    </div>
  );
}
export default App;
