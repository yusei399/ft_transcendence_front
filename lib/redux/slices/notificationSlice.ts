/* Core */
import {AlertStatus} from '@chakra-ui/react';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export type Notification = {
  id: number;
  title: string;
  description: string;
  status: AlertStatus;
};

type SetNotificationPayload = Omit<Notification, 'id'>;
type RemoveNotificationByIdPayload = Notification['id'];

interface NotificationSliceState {
  nextId: number;
  notifications: Notification[];
}

const initialState: NotificationSliceState = {
  nextId: 0,
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<SetNotificationPayload>) => {
      const hasSameNotif = state.notifications.some(
        notification =>
          notification.title === action.payload.title &&
          notification.description === action.payload.description &&
          notification.status === action.payload.status,
      );
      if (hasSameNotif) return;

      state.notifications.push({
        ...action.payload,
        id: state.nextId,
      });
      state.nextId++;
    },
    removeNotificationById: (state, action: PayloadAction<RemoveNotificationByIdPayload>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload,
      );
    },
    clearNotifications: state => {
      state.nextId = 0;
      state.notifications = [];
    },
  },
});

export const {setNotification, removeNotificationById, clearNotifications} =
  notificationSlice.actions;
export const notificationSelector = (state: RootState) => state.notification.notifications;
export default notificationSlice.reducer;
