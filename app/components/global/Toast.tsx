'use client';

import {notificationSelector, removeNotificationById, setNotificationAsShown} from '@/lib/redux';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {Wrap, useToast} from '@chakra-ui/react';
import {useEffect} from 'react';

const toastDuration = 6000;
const titleMaxLength = 20;
const descriptionMaxLength = 40;

function Toast() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(notificationSelector);

  useEffect(() => {
    notifications.forEach(notif => {
      if (notif.isShown) return;
      const toastId = toast({
        title: notif.title?.trim().substring(0, titleMaxLength),
        description: notif.description?.trim().substring(0, descriptionMaxLength),
        status: notif.status,
        duration: toastDuration,
        isClosable: true,
        position: 'bottom',
        onCloseComplete: () => dispatch(removeNotificationById(notif.id)),
      });
      dispatch(setNotificationAsShown(notif.id));
      setTimeout(() => {
        dispatch(removeNotificationById(notif.id));
        toast.close(toastId);
      }, toastDuration);
    });
  }, [notifications]);

  return <Wrap />;
}

export default Toast;
