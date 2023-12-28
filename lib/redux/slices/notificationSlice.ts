/* Core */
import {AlertStatus} from '@chakra-ui/react';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

type Notification = {
  id: number;
  isShown: boolean;
  title: string;
  description: string;
  status: AlertStatus;
};

type SetNotificationPayload = Omit<Notification, 'id' | 'isShown'>;
type SetNotificationAsShownPayload = Notification['id'];
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
      state.notifications.push({...action.payload, id: state.nextId, isShown: false});
      state.nextId++;
    },
    setNotificationAsShown: (state, action: PayloadAction<SetNotificationAsShownPayload>) => {
      const notification = state.notifications.find(
        notification => notification.id === action.payload,
      );
      if (notification) notification.isShown = true;
    },
    removeNotificationById: (state, action: PayloadAction<RemoveNotificationByIdPayload>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload,
      );
    },
  },
});

export const {setNotification, setNotificationAsShown, removeNotificationById} =
  notificationSlice.actions;
export const notificationSelector = (state: RootState) => state.notification.notifications;
export default notificationSlice.reducer;