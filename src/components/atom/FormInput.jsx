/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import {
  FormControl, FormErrorMessage, FormHelperText, FormLabel, Input,
} from '@chakra-ui/react';
import React from 'react';

export default function FormInput({
  title, type, value, name, onChange, helperText, errorMessage, color = '#F5EFE6',
}) {
  const isError = value[name] === '';
  return (
    <FormControl isInvalid={isError}>
      <FormLabel color={color}>{title}</FormLabel>
      <Input color={color} type={type} value={value} name={name} placeholder={title} onChange={onChange} />
      {isError ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : (
        <FormHelperText fontSize="xs" color={color}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
FormInput.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  color: PropTypes.string,
};
