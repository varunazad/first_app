export const SET_TOKEN = 'SET_TOKEN';
export const VOICE_TOKEN = 'VOICE_TOKEN';
export const SET_ID = 'SET_ID';
export const SET_SPLASH = 'SET_SPLASH';

export const tokenHandler = userToken => {
  return {type: SET_TOKEN, userToken: userToken};
};
// export const welcomeHandler = welcome =>
// {
//   console.log("called welcome");
//   return {type: SET_SPLASH, welcome: welcome};
// };
export const voiceHandler = voice => {
  return {type: VOICE_TOKEN, voice: voice};
};
export const welcomeHandler = welcome => {
  return {type: SET_SPLASH, welcome: welcome};
};
export const storeIdHandler = id => {
  return {type: SET_ID, storeId: id};
};
