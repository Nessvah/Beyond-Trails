import { useAuth } from "../hook/useAuth";

export const getUserInfo = async () => {
  const { user } = useAuth();

  const response = await getUserInfo(user);

  return response.data;
};
