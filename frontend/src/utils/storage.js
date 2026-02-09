import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (user) => {
  await AsyncStorage.setItem('USER', JSON.stringify(user));
};

export const getUser = async () => {
  const data = await AsyncStorage.getItem('USER');
  return data ? JSON.parse(data) : null;
};

export const clearUser = async () => {
  await AsyncStorage.removeItem('USER');
};
