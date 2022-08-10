import { instance } from './ApiProvider';

export const getNotifications = async () => {
  return instance.get(`/api/v1/Notification`);
};

export const readNotification = async (dataId) => {
  return instance.put(`/api/v1/Notification/${dataId}?isRead=true`);
};
