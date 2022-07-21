export const Types = {
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_FOLLOWERS_REQUEST: 'GET_FOLLOWERS_REQUEST',
  GET_FOLLOWERS_SUCCESS: 'GET_FOLLOWERS_SUCCESS',
  GET_FOLLOWING_REQUEST: 'GET_FOLLOWING_REQUEST',
  GET_FOLLOWING_SUCCESS: 'GET_FOLLOWING_SUCCESS',
};

export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST
});

export const getUsersSuccess = (data: any) => ({
  type: Types.GET_USERS_SUCCESS,
  payload: { data }
});

export const getUserRequest = () => ({
  type: Types.GET_USER_REQUEST
});

export const getUserSuccess = (data: any) => ({
  type: Types.GET_USER_SUCCESS,
  payload: { data }
});

export const getFollowersRequest = () => ({
  type: Types.GET_FOLLOWERS_REQUEST
});

export const getFollowersSuccess = (data: any) => ({
  type: Types.GET_FOLLOWERS_SUCCESS,
  payload: { data }
});

export const getFollowingRequest = () => ({
  type: Types.GET_FOLLOWING_REQUEST
});

export const getFollowingSuccess = (data: any) => ({
  type: Types.GET_FOLLOWING_SUCCESS,
  payload: { data }
});