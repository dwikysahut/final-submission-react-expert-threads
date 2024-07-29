/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <section>
      <Container display="flex" maxW="100%" bg="lightgrey" minH="100vh" flexDirection="column" margin={0} padding={0}>
        <Header />
        <Box marginTop="4rem">{children}</Box>
        <Footer />
      </Container>
    </section>
  );
}
MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
