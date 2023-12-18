'use client';

import React, {useState} from 'react';
import {useAppDispatch} from '@/lib/redux/hook';
import {ErrorType, useSignInMutation} from '@/lib/redux/api/';
import {HttpSignIn} from '@/shared/HttpEndpoints/auth';
import {logUserIn, setLogInError} from './logUser';
import Loading from '../../components/global/Loading';
import {Button, FormControl, FormLabel, Input} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';

function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signInData, setSignInData] = useState<HttpSignIn.reqTemplate>({
    nickname: '',
    password: '',
  });

  const [signIn, {isLoading}] = useSignInMutation();

  const signInUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {authToken} = await signIn([signInData]).unwrap();
      logUserIn(dispatch, authToken);
      router.push('/');
    } catch (error) {
      setLogInError(dispatch, error as ErrorType);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={e => signInUser(e)}>
      <FormControl isRequired>
        <FormLabel>Nickname:</FormLabel>
        <Input
          type="text"
          name="nickname"
          value={signInData.nickname}
          onChange={e => setSignInData({...signInData, nickname: e.target.value})}></Input>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password:</FormLabel>
        <Input
          autoComplete="on"
          type="password"
          name="password"
          value={signInData.password}
          onChange={e => setSignInData({...signInData, password: e.target.value})}></Input>
      </FormControl>
      <Button type="submit">Sign In</Button>
    </form>
  );
}

export default SignIn;
