'use client';

import Loading from '@/app/components/global/Loading';
import {ErrorType, useResend2FAMutation, useVerify2FAMutation} from '@/lib/redux/api';
import {Http2FA, HttpResend2FA} from '@/shared/HttpEndpoints/auth';
import {Button, FormControl, FormLabel, HStack, Input} from '@chakra-ui/react';
import {useState} from 'react';
import {logUserIn, setLogInError} from './logUser';
import {authSelector, clear2fa, useAppDispatch, useAppSelector} from '@/lib/redux';

function Auth2FA() {
  const {auth2FACode, userId, isSignUp} = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const [confirmCode, setConfirmCode] = useState<string>('');
  const [resentAfterError, setResentAfterError] = useState<boolean>(false);
  const [verify2FA, {isLoading, isError}] = useVerify2FAMutation();
  const [resend2FA, {isLoading: isResending}] = useResend2FAMutation();

  if (auth2FACode === undefined || userId === undefined || isSignUp === undefined) {
    dispatch(clear2fa());
    return <Loading />;
  }

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
      const loginPayload = {
        userId: res.userInfo.userId,
        authToken: res.authToken,
        refreshToken: res.refreshToken,
      };
      logUserIn(dispatch, loginPayload, isSignUp);
    } catch (error) {
      setLogInError(
        dispatch,
        (error as ErrorType).status === 403 ? 'Invalid 2FA code' : 'Something went wrong',
      );
    }
    setConfirmCode('');
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
              onChange={e => setConfirmCode(e.target.value)}
            />
          </FormControl>
          <Button type="submit" isDisabled={confirmCode.length !== 6}>
            Confirm
          </Button>
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
