'use client';

import {setLogInError} from '@/app/auth/components/logUser';
import {isInGameSelector, isLoginSelector, set2fa} from '@/lib/redux';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {Nav, clearRedirectTo, selectRedirectTo} from '@/lib/redux/slices/navigationSlice';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';
import Loading from './Loading';
import {useEffect, useState} from 'react';
import {SocketService} from '@/services/websocket/socketService';
import {UserStatusType} from '@/shared/HttpEndpoints/interfaces';

type NavigationState = {url: string; replace: boolean};

function Navigation({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isLogin = useAppSelector(isLoginSelector);
  const navigation = useAppSelector(selectRedirectTo);
  const isInGame = useAppSelector(isInGameSelector);

  const auth2FACode = searchParams.get('auth2FACode');
  const userIdString = searchParams.get('userId');
  const userId = userIdString ? parseInt(userIdString) : undefined;
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  let redirection: NavigationState | undefined;
  let sideEffect: (() => void) | undefined;

  if (pathname === '/auth/code') {
    if (isLogin) redirection = redirect({route: '/', isReplace: false});
  } else if (pathname === '/auth') {
    if (isLogin) redirection = redirect({route: '/', isReplace: false});
    else if (searchParams.has('OAuth42Error')) {
      sideEffect = () => setLogInError(dispatch, '42 OAuth error: Unauthorized');
      redirection = redirect({route: '/auth', isReplace: true});
    } else if (auth2FACode && userId) {
      sideEffect = () => dispatch(set2fa({auth2FACode, userId, isSignUp: false}));
      redirection = redirect({route: '/auth', isReplace: true});
    }
  } else if (!isLogin) redirection = redirect({route: '/auth'});
  else if (isInGame && pathname !== '/game')
    redirection = redirect({route: '/game', isReplace: true});
  else if (navigation) {
    redirection = redirect(navigation);
    sideEffect = () => dispatch(clearRedirectTo());
  }
  const isSocketConnected = SocketService.isSocketConnected();

  useEffect(() => {
    if (!isSocketConnected) return;
    let status: UserStatusType = 'chilling';
    if (pathname.includes('/chat')) status = 'onChat';
    else if (pathname.includes('/game')) status = 'onGame';

    SocketService.emit('setUserStatus', {status});
  }, [pathname, isSocketConnected]);

  useEffect(() => {
    if (redirection && !isRedirecting) {
      setIsRedirecting(true);

      if (sideEffect) sideEffect();

      if (redirection.replace) router.replace(redirection.url, {scroll: false});
      else router.push(redirection.url, {scroll: false});
    } else if (!redirection && isRedirecting) setIsRedirecting(false);
  }, [redirection]);

  if (redirection || isRedirecting) return <Loading />;
  else return <>{children}</>;
}

const redirect = (navigation: Nav): NavigationState => {
  let url: string = navigation.route;

  if (navigation.params) {
    url += '?';
    for (const key in navigation.params) {
      url += `${key}=${navigation.params[key]}&`;
    }
    url = url.slice(0, -1);
  }
  if (navigation.hash) url += `#${navigation.hash}`;

  return {url, replace: navigation.isReplace ?? false};
};

export default Navigation;
