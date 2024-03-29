'use client';

import React, {useState} from 'react';
import {ErrorType, useSignInMutation} from '@/lib/redux/api/';
import {logUserIn, setLogInError} from './logUser';
import Loading from '../../components/global/Loading';
import {Button, FormControl, FormLabel, Input, useColorModeValue} from '@chakra-ui/react';
import {useAppDispatch, set2fa} from '@/lib/redux';
import {HttpSignIn} from '@/shared/HttpEndpoints/auth';

function SignIn() {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
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
      if (res.authToken && res.refreshToken)
        logUserIn(
          dispatch,
          {
            authToken: res.authToken,
            refreshToken: res.refreshToken,
            userId: res.userId,
          },
          false,
        );
      else if (res.auth2FACode)
        dispatch(
          set2fa({
            auth2FACode: res.auth2FACode,
            userId: res.userId,
            isSignUp: false,
          }),
        );
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
          <FormLabel color="blue.400">
            Nickname: {signInData.nickname && signInData.nickname.length < 3 && ' 3 characters min'}
            {signInData.nickname && signInData.nickname.length > 12 && ' 12 characters max'}
          </FormLabel>
          <Input
            type="text"
            minLength={3}
            maxLength={12}
            name="nickname"
            autoComplete="username"
            value={signInData.nickname}
            onChange={e => setSignInData({...signInData, nickname: e.target.value})}
            bg={bgColor}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="blue.400">
            Password:{signInData.password && signInData.password.length < 3 && ' 3 characters min'}
          </FormLabel>
          <Input
            type="password"
            name="password"
            minLength={3}
            autoComplete="current-password"
            value={signInData.password}
            onChange={e => setSignInData({...signInData, password: e.target.value})}
            bg={bgColor}
          />
        </FormControl>
        <br />
        <Button type="submit">Sign In</Button>
      </form>
    </>
  );
}

export default SignIn;
