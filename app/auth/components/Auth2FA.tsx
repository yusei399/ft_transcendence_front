'use client';

import Loading from '@/app/components/global/Loading';
import {ErrorType, useResend2FAMutation, useVerify2FAMutation} from '@/lib/redux/api';
import {Http2FA, HttpResend2FA} from '@/shared/HttpEndpoints/auth';
import {Button, FormControl, FormLabel, HStack, Input} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {auth2FAError, logUserIn} from './logUser';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {authSelector, clear2fa} from '@/lib/redux';

function Auth2FA() {
  const {auth2FACode, userId, isSignUp} = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const [confirmCode, setConfirmCode] = useState<string>('');
  const [resentAfterError, setResentAfterError] = useState<boolean>(false);
  const [verify2FA, {isLoading, isError}] = useVerify2FAMutation();
  const [resend2FA, {isLoading: isResending}] = useResend2FAMutation();

  useEffect(() => {
    if (auth2FACode === undefined || userId === undefined || isSignUp === undefined)
      dispatch(clear2fa());
  }, [auth2FACode, userId, isSignUp]);

  if (auth2FACode === undefined || userId === undefined || isSignUp === undefined)
    return <Loading />;

  const submit2FA = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reqBody: Http2FA.reqTemplate = {
      auth2FACode,
      auth2FAConfirmCode: confirmCode,
      userId,
    };
    setResentAfterError(false);
    try {
      const res = await verify2FA([reqBody]).unwrap();
      logUserIn(dispatch, res.authToken, isSignUp);
    } catch (error) {
      auth2FAError(dispatch, error as ErrorType);
    }
  };

  const resendCode = async () => {
    const reqBody: HttpResend2FA.reqTemplate = {
      auth2FACode,
      userId,
    };
    try {
      await resend2FA([reqBody]).unwrap();
      setResentAfterError(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {(isLoading || isResending) && <Loading />}
      {(!isError || resentAfterError) && (
        <form onSubmit={e => submit2FA(e)}>
          <FormControl isRequired>
            <FormLabel>Confirmation Code:</FormLabel>
            <Input
              type="text"
              name="code"
              value={confirmCode}
              onChange={e => setConfirmCode(e.target.value)}></Input>
          </FormControl>
          <Button type="submit">Confirm</Button>
        </form>
      )}
      <HStack spacing="24px">
        <Button type="button" onClick={resendCode}>
          resend code
        </Button>
        <Button type="button" onClick={() => dispatch(clear2fa())}>
          Abort
        </Button>
      </HStack>
    </>
  );
}

export default Auth2FA;
