import {SET_TOKEN, VOICE_TOKEN, SET_ID, SET_SPLASH} from '../actions/user';
const initialState = {
  userToken: '',
  voice: 'Matthew',
  storeId: '',
  welcome: '0',
};

export default userReducer = ( state = initialState, action ) =>
{
  console.log('acc', action.type);
  switch (action.type) {
    case SET_TOKEN:
      return {...state, userToken: action.userToken};
    case SET_SPLASH:
      return {...state, welcome: action.welcome};
    case VOICE_TOKEN:
      return {...state, voice: action.voice};
    case SET_ID:
      return {...state, storeId: action.storeId};
    default:
      return state;
  }
};
