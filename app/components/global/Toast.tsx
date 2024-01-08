'use client';

import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {notificationSelector, removeNotificationById} from '@/lib/redux/slices/notificationSlice';
import {useToast} from '@chakra-ui/react';
import {useEffect} from 'react';

const toastDuration = 3000;
const titleMaxLength = 40;
const descriptionMaxLength = 60;

function Toast() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(notificationSelector);

  useEffect(() => {
    notifications.forEach(notif => {
      const id = notif.id.toString();
      if (toast.isActive(id)) return;

      const toastId = toast({
        id,
        title: notif.title?.trim().substring(0, titleMaxLength),
        description: notif.description?.trim().substring(0, descriptionMaxLength),
        status: notif.status,
        duration: toastDuration,
        isClosable: true,
        position: 'bottom',
      });
      setTimeout(() => toast.close(toastId), toastDuration);
      dispatch(removeNotificationById(notif.id));
    });
  }, [notifications]);

  return null;
}

export default Toast;
