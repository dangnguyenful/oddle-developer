import { Types } from '../actions/users';

const initialState = {
  data: []
};

export const followingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_FOLLOWING_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    default:
      return state;
  }
};
