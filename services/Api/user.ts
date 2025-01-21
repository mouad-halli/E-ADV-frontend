import $api from '@/services/Api/API';
import { UserType } from '@/types/user';

export const getMe = async (): Promise<UserType> => {
    return (await $api.get('user/me')).data
}