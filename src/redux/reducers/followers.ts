import { Types } from '../actions/users';

const initialState = {
  data: []
};

export const followersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    default:
      return state;
  }
};
