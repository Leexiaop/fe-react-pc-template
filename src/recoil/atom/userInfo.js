import { atom } from 'recoil';

const userInfoState = atom({
	key: 'userInfo',
	default: {
		userName: ''
	}
});
export default userInfoState;
