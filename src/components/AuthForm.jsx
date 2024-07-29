/* eslint-disable import/no-extraneous-dependencies */
import {
  Box, Button, Heading, Spacer,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from './atom/FormInput';

export default function AuthForm({ title, isRegister = false, onSubmitHandler }) {
  const [field, setField] = useState({ email: '', password: '', name: '' });

  const onChangeFieldHandler = (type) => (e) => {
    setField((prevState) => ({ ...prevState, [type]: e.target?.value }));
  };

  return (
    <>
      <Heading as="h1" size="lg" width="100%" lineHeight="normal" textAlign="left" color="white" marginBottom="1rem">
        {title}
      </Heading>
      <Box paddingInline="3rem" width="100%">
        <FormInput
          title="Username"
          name="email"
          errorMessage="Email Harus diisi"
          helperText="Isi Email (ex: aaa.gmail.com)"
          type="email"
          onChange={onChangeFieldHandler('email')}
          value={field.email}
        />
        <Spacer margin="0.5rem" />
        <FormInput
          title="Password"
          name="password"
          errorMessage="Password Harus diisi"
          helperText="Isi Password"
          type="password"
          onChange={onChangeFieldHandler('password')}
          value={field.password}
        />
        <Spacer margin="0.5rem" />
        {isRegister && (
          <FormInput
            title="Nama"
            name="name"
            errorMessage="Nama Harus diisi"
            helperText="Isi Nama"
            type="text"
            onChange={onChangeFieldHandler('name')}
            value={field.name}
          />
        )}
        <Spacer margin="0.7rem" />
        <Button width="100%" name="submit" onClick={() => onSubmitHandler(field)}>
          Submit
        </Button>
      </Box>
    </>
  );
}

AuthForm.propTypes = {
  isRegister: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
};
