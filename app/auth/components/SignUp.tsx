'use client';

import {useAppDispatch} from '@/lib/redux/hook';
import React, {useState} from 'react';
import {Button, FormControl, FormLabel, Input} from '@chakra-ui/react';
import {ErrorType, useSignUpMutation} from '@/lib/redux/api';
import {setLogInError} from './logUser';
import Loading from '../../components/global/Loading';
import {set2fa} from '@/lib/redux';
import {HttpSignUp} from '@/shared/HttpEndpoints/auth';

function SignUp() {
  const [signUpData, setSignUpData] = useState<HttpSignUp.reqTemplate>({
    nickname: '',
    password: '',
    email: '',
  });
  const dispatch = useAppDispatch();
  const [signUp, {isLoading}] = useSignUpMutation();

  const signUpUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signUp([signUpData]).unwrap();
      dispatch(set2fa({...res, isSignUp: true}));
    } catch (error) {
      setLogInError(dispatch, error as ErrorType);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={e => signUpUser(e)}>
        <FormControl isRequired>
          <FormLabel>Nickname:</FormLabel>
          <Input
            type="text"
            name="nickname"
            value={signUpData.nickname}
            onChange={e => setSignUpData({...signUpData, nickname: e.target.value})}></Input>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            name="email"
            value={signUpData.email}
            onChange={e => setSignUpData({...signUpData, email: e.target.value})}></Input>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password:</FormLabel>
          <Input
            autoComplete="on"
            type="password"
            name="password"
            value={signUpData.password}
            onChange={e => setSignUpData({...signUpData, password: e.target.value})}></Input>
        </FormControl>
        <Button type="submit">Sign Up</Button>
      </form>
    </>
  );
}

export default SignUp;
