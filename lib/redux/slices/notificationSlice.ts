/* Core */
import {AlertStatus, ToastId} from '@chakra-ui/react';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

type Notification = {
  id: number;
  chakraId?: ToastId;
  title: string;
  description: string;
  status: AlertStatus;
};

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
    setNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'chakraId'>>) => {
      state.notifications.push({...action.payload, id: state.nextId, chakraId: undefined});
      state.nextId++;
    },
    setChakraId: (
      state,
      action: PayloadAction<{id: Notification['id']; chakraId: Notification['chakraId']}>,
    ) => {
      const notification = state.notifications.find(
        notification => notification.id === action.payload.id,
      );
      if (notification) notification.chakraId = action.payload.chakraId;
    },
    removeNotificationById: (state, action: PayloadAction<Notification['id']>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload,
      );
    },
  },
});

export const {setNotification, setChakraId, removeNotificationById} = notificationSlice.actions;
export const notificationSelector = (state: RootState) => state.notification.notifications;
export default notificationSlice.reducer;
