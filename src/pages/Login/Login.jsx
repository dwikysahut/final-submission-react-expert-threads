import {
  Container, Box, Heading, Tabs, TabList, Tab, TabPanels, TabPanel,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthForm from '../../components/AuthForm';
import { asyncLoginAuthUser, asyncRegisterAuthUser } from '../../redux/authUser/action';

export default function Login() {
  const [isRegisterTab, setIsRegisterTab] = useState(false);
  const dispatch = useDispatch();

  const onSubmitRegister = (value) => {
    dispatch(asyncRegisterAuthUser(value));
  };
  const onSubmitLogin = (value) => {
    const { email, password } = value;
    dispatch(asyncLoginAuthUser({ email, password }));
  };
  return (
    <Container maxW="100%" height="100vh" display="flex" padding="2rem" justifyContent="center" alignItems="center">
      <Box width="80%" height="80%" className="flex" bg="#1A4D2E" boxShadow="2xl" rounded="2xl">
        <Box flex={1} width="100%" justifyContent="center" display="flex" alignItems="center">
          <Heading as="h1" size="2xl" lineHeight="normal" noOfLines={3} textAlign="center" color="white">
            Selamat Datang
          </Heading>
        </Box>
        <Box
          flex={1}
          width="100%"
          justifyContent="center"
          display="flex"
          padding="1rem"
          flexDirection="column"
          alignItems="center"
        >
          <Tabs width="100%" variant="enclosed">
            <TabList color="#E8DFCA" paddingBlock="0.1rem">
              <Tab color="#F5EFE6" onClick={() => setIsRegisterTab(false)}>
                Login
              </Tab>
              <Tab color="#F5EFE6" onClick={() => setIsRegisterTab(true)}>
                Register
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AuthForm isRegister={isRegisterTab} title="Login" onSubmitHandler={onSubmitLogin} />
              </TabPanel>
              <TabPanel>
                <AuthForm isRegister={isRegisterTab} title="Register" onSubmitHandler={onSubmitRegister} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Container>
  );
}
