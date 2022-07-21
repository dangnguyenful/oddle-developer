import { combineReducers } from 'redux';
import { usersReducer } from './users';
import { userReducer } from './user';
import { reposReducer } from './repos';
import { followersReducer } from './followers';
import { followingReducer } from './following';

export default combineReducers({
  users: usersReducer,
  user: userReducer,
  repos: reposReducer,
  followers: followersReducer,
  following: followingReducer
});
