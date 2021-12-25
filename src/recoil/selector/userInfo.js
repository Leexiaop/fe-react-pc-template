import { selector } from 'recoil';
import { userInfoState } from '../atom';
import api from '../../assets/api/api';
import url from '../../assets/api/url';

const userState = selector({
	key: 'userState',
	get: async ({ get }) => {
		const obj = get(userInfoState);
		const { data } = await api.get(url.getUserinfo);
		return { ...obj, ...data };
	}
});
export default userState;
