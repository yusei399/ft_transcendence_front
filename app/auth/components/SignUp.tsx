'use client';

import {useAppDispatch} from '@/lib/redux/hook';
import React, {useState} from 'react';
import {Button, FormControl, FormLabel, Input} from '@chakra-ui/react';
import {ErrorType, useSignUpMutation} from '@/lib/redux/api';
import {logUserIn, setLogInError} from './logUser';
import Loading from '../../components/global/Loading';
import {HttpSignUp} from '@/shared/HttpEndpoints/auth';
import {setImage} from '@/app/utils/setImage';

function SignUp(): JSX.Element {
  const [signUpData, setSignUpData] = useState<HttpSignUp.reqTemplate>({
    nickname: '',
    password: '',
    email: '',
    avatar: undefined,
  });
  const dispatch = useAppDispatch();
  const [signUp, {isLoading}] = useSignUpMutation();

  const signUpUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
          <FormLabel>
            Nickname: {signUpData.nickname && signUpData.nickname.length < 3 && ' 3 characters min'}
            {signUpData.nickname && signUpData.nickname.length > 20 && ' 20 characters max'}
          </FormLabel>
          <Input
            type="text"
            name="nickname"
            minLength={3}
            maxLength={20}
            autoComplete="username"
            value={signUpData.nickname}
            onChange={e => setSignUpData({...signUpData, nickname: e.target.value})}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            name="email"
            autoComplete="email"
            value={signUpData.email}
            onChange={e => setSignUpData({...signUpData, email: e.target.value})}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>
            Password:{signUpData.password && signUpData.password.length < 3 && ' 3 characters min'}
          </FormLabel>
          <Input
            type="password"
            name="password"
            minLength={3}
            autoComplete="new-password"
            value={signUpData.password}
            onChange={e => setSignUpData({...signUpData, password: e.target.value})}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Avatar</FormLabel>
          <Input
            type="file"
            name="avatar"
            max={1}
            accept="image/*"
            onChange={e => setSignUpData({...signUpData, avatar: setImage(e, dispatch)})}></Input>
        </FormControl>
        <Button type="submit">Sign Up</Button>
      </form>
    </>
  );
}

export default SignUp;
