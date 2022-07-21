import { Types } from '../actions/users';

const initialState = {
  data: []
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_USER_SUCCESS:
      return {
        ...state,
        data: action.payload.data.data
      };
    default:
      return state;
  }
};
