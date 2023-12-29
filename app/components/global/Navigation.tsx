'use client';

import {setLogInError} from '@/app/auth/components/logUser';
import {isLoginSelector, set2fa} from '@/lib/redux';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {Nav, clearRedirectTo, selectRedirectTo} from '@/lib/redux/slices/navigationSlice';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
import Loading from './Loading';

function Navigation({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isLogin = useAppSelector(isLoginSelector);
  const navigation = useAppSelector(selectRedirectTo);

  let isRedirecting = false;

  useEffect(() => {
    if (!isLogin && pathname !== '/auth') isRedirecting = redirect({route: '/auth'}, router);
    else if (isLogin && pathname === '/auth') isRedirecting = redirect({route: '/auth'}, router);
  }, [isLogin, pathname]);

  useEffect(() => {
    if (pathname !== '/auth') return;

    if (searchParams.has('OAuth42Error')) {
      setLogInError(dispatch, '42 OAuth error: Unauthorized');
      isRedirecting = redirect({route: '/auth', isReplace: true}, router);
    } else {
      const auth2FACode = searchParams.get('auth2FACode');
      const userIdString = searchParams.get('userId');
      const userId = userIdString ? parseInt(userIdString) : undefined;
      if (auth2FACode && userId) {
        dispatch(set2fa({auth2FACode, userId, isSignUp: false}));
        isRedirecting = redirect({route: '/auth', isReplace: true}, router);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (navigation) {
      isRedirecting = redirect(navigation, router);
      dispatch(clearRedirectTo());
    }
  }, [navigation]);

  if (isRedirecting) return <Loading />;

  return <>{children}</>;
}

const redirect = (navigation: Nav, router: AppRouterInstance): boolean => {
  let url = navigation.route as string;

  if (navigation.params) {
    url += '?';
    for (const key in navigation.params) {
      url += `${key}=${navigation.params[key]}&`;
    }
    url = url.slice(0, -1);
  }
  if (navigation.hash) url += `#${navigation.hash}`;

  if (navigation.isReplace) router.replace(url, {scroll: false});
  else router.push(url, {scroll: false});

  return true;
};

export default Navigation;
