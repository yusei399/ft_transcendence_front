'use client';

import {setLogInError} from '@/app/auth/components/logUser';
import {isLoginSelector, set2fa} from '@/lib/redux';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {Nav, clearRedirectTo, selectRedirectTo} from '@/lib/redux/slices/navigationSlice';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';
import Loading from './Loading';
import {useEffect, useState} from 'react';

type NavigationState = {url: string; replace: boolean};

function Navigation({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isLogin = useAppSelector(isLoginSelector);
  const navigation = useAppSelector(selectRedirectTo);

  const auth2FACode = searchParams.get('auth2FACode');
  const userIdString = searchParams.get('userId');
  const userId = userIdString ? parseInt(userIdString) : undefined;

  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  let redirection: NavigationState | undefined;
  let sideEffect: (() => void) | undefined;

  if (pathname === '/auth') {
    if (searchParams.has('OAuth42Error')) {
      sideEffect = () => setLogInError(dispatch, '42 OAuth error: Unauthorized');
      redirection = redirect({route: '/auth', isReplace: true});
    } else if (auth2FACode && userId) {
      sideEffect = () => dispatch(set2fa({auth2FACode, userId, isSignUp: false}));
      redirection = redirect({route: '/auth', isReplace: true});
    } else if (isLogin) redirection = redirect({route: '/'});
  } else if (!isLogin) redirection = redirect({route: '/auth'});
  else if (navigation) {
    redirection = redirect(navigation);
    sideEffect = () => dispatch(clearRedirectTo());
  }

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