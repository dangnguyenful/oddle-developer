import { Types } from '../actions/users';

const initialState = {
  data: []
};

export const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    default:
      return state;
  }
};
