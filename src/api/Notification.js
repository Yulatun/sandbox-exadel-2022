import { instance } from './ApiProvider';

export const getNotifications = async (params) => {
  const userId = params.queryKey[1];
  const response = instance.get(`/api/v1/Notification?userId=${userId}`);

  return response;
};

export const readNotification = async (data, userId) => {
  return instance.put(
    `/api/v1/Notification/${data.id}?userId=${userId}&isRead=true`
  );
};
