import {AppDispatch, setNotification} from '@/lib/redux';

const FILE_UPLOAD_MAX_SIZE = 1024 * 1024;

export const setImage = (e: React.ChangeEvent<HTMLInputElement>, dispatch: AppDispatch) => {
  if (!e.target.files?.[0]) return;
  if (e.target.files[0].size > FILE_UPLOAD_MAX_SIZE) {
    dispatch(
      setNotification({
        status: 'error',
        title: 'Image too big',
        description: 'Image must be less than 1MB',
      }),
    );
    e.target.files = null;
    e.target.value = '';
    return undefined;
  }
  return e.target.files[0];
};
