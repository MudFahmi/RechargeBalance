import { ActionType } from "./actions";
import * as actionTypes from "./actionTypes";

export type UserState = {
  userAccount: IUserAccount;
  loading: boolean;
  error: string;
};

const initialState: UserState = {
  userAccount: {
    balance: 0,
  },
  loading: false,
  error: "",
};

const reducer = (
  state: UserState = initialState,
  action: ActionType
): UserState => {
  switch (action.type) {
    case actionTypes.GET_USER_BALANCE:
      return {
        ...state,
        loading: action.loading,
      };
    case actionTypes.GET_USER_BALANCE_SUCCESSFUL:
      return {
        ...state,
        userAccount: action.userAccount,
        error: "",
      };
    case actionTypes.GET_USER_BALANCE_FAILED:
      return {
        ...state,
        error: action.error,
      };
  }

  return state;
};

export default reducer;
