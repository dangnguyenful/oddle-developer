import { Types } from '../actions/repos';

const initialState = {
  data: []
};

export const reposReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_REPOS_SUCCESS:
      return {
        ...state,
        data: action.payload.data.data
      };
    default:
      return state;
  }
};
