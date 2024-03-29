'use client';

import {useAppDispatch} from '@/lib/redux';
import React, {useState} from 'react';
import {Button, FormControl, FormLabel, Input, useColorModeValue} from '@chakra-ui/react';
import {ErrorType, useSignUpMutation} from '@/lib/redux/api';
import {logUserIn, setLogInError} from './logUser';
import Loading from '../../components/global/Loading';
import {HttpSignUp} from '@/shared/HttpEndpoints/auth';
import {setImage} from '@/app/utils/setImage';

function SignUp() {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const [signUpData, setSignUpData] = useState<HttpSignUp.reqTemplate>({
    nickname: '',
    password: '',
    email: '',
    avatar: undefined,
  });
  const dispatch = useAppDispatch();
  const [signUp, {isLoading}] = useSignUpMutation();

  const signUpUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signUp([signUpData]).unwrap();
      logUserIn(dispatch, res, true);
    } catch (error) {
      setLogInError(
        dispatch,
        (error as ErrorType).status === 409 ? 'Nickname already taken' : 'Something went wrong',
      );
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={e => signUpUser(e)}>
        <FormControl isRequired>
          <FormLabel color="blue.400">
            Nickname: {signUpData.nickname && signUpData.nickname.length < 3 && ' 3 characters min'}
            {signUpData.nickname && signUpData.nickname.length > 12 && ' 12 characters max'}
          </FormLabel>
          <Input
            type="text"
            name="nickname"
            minLength={3}
            maxLength={12}
            autoComplete="username"
            value={signUpData.nickname}
            onChange={e => setSignUpData({...signUpData, nickname: e.target.value})}
            bg={bgColor}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="blue.400">Email:</FormLabel>
          <Input
            type="email"
            name="email"
            autoComplete="email"
            value={signUpData.email}
            onChange={e => setSignUpData({...signUpData, email: e.target.value})}
            bg={bgColor}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="blue.400">
            Password:{signUpData.password && signUpData.password.length < 3 && ' 3 characters min'}
          </FormLabel>
          <Input
            type="password"
            name="password"
            minLength={3}
            autoComplete="new-password"
            value={signUpData.password}
            onChange={e => setSignUpData({...signUpData, password: e.target.value})}
            bg={bgColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="blue.400">Avatar</FormLabel>
          <Input
            type="file"
            name="avatar"
            max={1}
            accept="image/*"
            onChange={e => setSignUpData({...signUpData, avatar: setImage(e, dispatch)})}
            bg={bgColor}
          />
        </FormControl>
        <br />
        <Button type="submit">Sign Up</Button>
      </form>
    </>
  );
}

export default SignUp;
