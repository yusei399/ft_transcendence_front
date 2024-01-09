'use client';

import React, {useState} from 'react';
import {useAppDispatch} from '@/lib/redux/hook';
import {ErrorType, useSignInMutation} from '@/lib/redux/api/';
import {setLogInError} from './logUser';
import Loading from '../../components/global/Loading';
import {Button, FormControl, FormLabel, Input} from '@chakra-ui/react';
import {set2fa} from '@/lib/redux';
import {HttpSignIn} from '@/shared/HttpEndpoints/auth';

function SignIn() {
  const dispatch = useAppDispatch();
  const [signInData, setSignInData] = useState<HttpSignIn.reqTemplate>({
    nickname: '',
    password: '',
  });

  const [signIn, {isLoading}] = useSignInMutation();

  const signInUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn([signInData]).unwrap();
      dispatch(set2fa({...res, isSignUp: false}));
    } catch (error) {
      setLogInError(
        dispatch,
        (error as ErrorType).status === 401 ? 'Invalid credential' : 'Something went wrong',
      );
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={e => signInUser(e)}>
        <FormControl isRequired>
          <FormLabel>Nickname:</FormLabel>
          <Input
            type="text"
            name="nickname"
            autoComplete="username"
            value={signInData.nickname}
            onChange={e => setSignInData({...signInData, nickname: e.target.value})}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
            value={signInData.password}
            onChange={e => setSignInData({...signInData, password: e.target.value})}
          />
        </FormControl>
        <Button type="submit">Sign In</Button>
      </form>
    </>
  );
}

export default SignIn;
