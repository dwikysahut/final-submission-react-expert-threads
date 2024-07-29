import { Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/atom/FormInput';
import { asyncPostThread } from '../../redux/threads/action';

export default function AddThreads() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ title: '', body: '', category: '' });
  const onChangeHandler = (e) => {
    console.log(e.target.name);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = () => {
    dispatch(asyncPostThread(formState));
    navigate('/');
  };
  return (
    <Box bg="white" margin="1rem" borderRadius={20} padding="2rem">
      <FormInput
        name="title"
        errorMessage="Judul harus diisi"
        title="Judul"
        color="black"
        value={formState.title}
        onChange={onChangeHandler}
        type="text"
      />
      <FormInput
        name="body"
        color="black"
        errorMessage="Isi harus diisi"
        title="Isi"
        value={formState.body}
        onChange={onChangeHandler}
        type="text"
      />
      <FormInput
        name="category"
        errorMessage="Category harus diisi"
        title="Category"
        color="black"
        value={formState.category}
        onChange={onChangeHandler}
        type="text"
      />
      <Button w="full" marginTop="1rem" onClick={onSubmitHandler}>
        Submit
      </Button>
    </Box>
  );
}
