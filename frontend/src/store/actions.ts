import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Api from "../api/Api";
import * as actionTypes from "./actionTypes";
type GetUserBalance = {
  type: string;
  loading: boolean;
};
type GetUserBalanceSuccessful = {
  type: string;
  userAccount: IUserAccount;
};
type GetUserBalanceFailed = {
  type: string;
  error: string;
};

export type ActionType = GetUserBalance &
  GetUserBalanceSuccessful &
  GetUserBalanceFailed;

const getUserBalanceIsLoading = (loading: boolean): GetUserBalance => {
  return { type: actionTypes.GET_USER_BALANCE, loading };
};
const getUserBalanceSuccessful = (
  userAccount: IUserAccount
): GetUserBalanceSuccessful => {
  return { type: actionTypes.GET_USER_BALANCE_SUCCESSFUL, userAccount };
};
const getUserBalanceFailed = (error: string): GetUserBalanceFailed => {
  return { type: actionTypes.GET_USER_BALANCE_FAILED, error };
};

export const getUserBalance = () => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getUserBalanceIsLoading(true));
    Api.get("balance")
      .then((res) => dispatch(getUserBalanceSuccessful(res.data)))
      .catch((err) =>
        dispatch(getUserBalanceFailed(err?.response?.data?.message))
      )
      .finally(() => dispatch(getUserBalanceIsLoading(false)));
  };
};
