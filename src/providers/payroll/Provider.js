import React from "react";

import API from "../../api";

import useOrg from "../org";

import Context from "./Context";

const types = {
  FETCH_PAYROLL_REQUEST: "FETCH_PAYROLL_REQUEST",
  FETCH_PAYROLL_SUCCESS: "FETCH_PAYROLL_SUCCESS",
  FETCH_PAYROLL_FAILURE: "FETCH_PAYROLL_FAILURE",

  APPROVE_PAYROLL_REQUEST: "APPROVE_PAYROLL_REQUEST",
  APPROVE_PAYROLL_SUCCESS: "APPROVE_PAYROLL_SUCCESS",
  APPROVE_PAYROLL_FAILURE: "FETCH_PAYROLL_FAILURE",

  DELETE_PAYROLL_REQUEST: "DELETE_PAYROLL_REQUEST",
  DELETE_PAYROLL_SUCCESS: "DELETE_PAYROLL_SUCCESS",
  DELETE_PAYROLL_FAILURE: "DELETE_PAYROLL_FAILURE",

  ADD_PAYROLL: "ADD_PAYROLL",
  UPDATE_PAYROLL: "UPDATE_PAYROLL",
  DELETE_PAYROLL: "DELETE_PAYROLL",
};

const initialState = { payrolls: [], isLoading: false, error: null };

// const updatePayrollReducer = (state, action) => {
//   const { type, payload, error } = action;
//   switch (type) {
//     case types.UPDATE_PAYROLL_REQUEST:
//       return { ...state, isLoading: true, error: null };
//     case types.UPDATE_PAYROLL_SUCCESS:
//       return { ...state, payrolls: payload, isLoading: false, error: null };
//     case types.UPDATE_PAYROLL_FAILURE:
//       return { ...state, isLoading: false, error };
//   }
// };

// const approvePayrollReducer = (state, action) => {
//   const { type, payload, error } = action;
//   switch (type) {
//     case types.APPROVE_PAYROLL_REQUEST:
//       return { ...state, isLoading: true, error: null };
//     case types.APPROVE_PAYROLL_SUCCESS:
//       return { ...state, payrolls: payload, isLoading: false, error: null };
//     case types.APPROVE_PAYROLL_FAILURE:
//       return { ...state, isLoading: false, error };
//   }
// };

// const deletePayrollReducer = (state, action) => {
//   const { type, payload, error } = action;
//   switch (type) {
//     case types.DELETE_PAYROLL_REQUEST:
//       return { ...state, isLoading: true, error: null };
//     case types.DELETE_PAYROLL_SUCCESS:
//       return { ...state, message: payload, isLoading: false, error: null };
//     case types.DELETE_PAYROLL_FAILURE:
//       return { ...state, isLoading: false, error };
//   }
// };

const fetchPayrollsReducer = (state, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case types.FETCH_PAYROLL_REQUEST:
      return { ...state, isLoading: true, error: null };
    case types.FETCH_PAYROLL_SUCCESS:
      return { ...state, payrolls: payload, isLoading: false, error: null };
    case types.FETCH_PAYROLL_FAILURE:
      return { ...state, isLoading: false, error };

    case types.UPDATE_PAYROLL:
      let uIndex = state.payrolls.findIndex(({ _id }) => _id === payload._id);
      console.log("Updated index: ", uIndex);
      if (uIndex === -1) {
        return state;
      }
      const newPayroll = { ...state.payrolls[uIndex], ...payload };
      return {
        ...state,
        payrolls: [
          ...state.payrolls.slice(0, uIndex),
          newPayroll,
          ...state.payrolls.slice(uIndex + 1),
        ],
      };

    case types.DELETE_PAYROLL:
      let dIndex = state.payrolls.findIndex(({ _id }) => _id === payload);
      if (dIndex === -1) {
        return state;
      }
      const newPayrolls = [
        ...state.payrolls.slice(0, dIndex),
        ...state.payrolls.slice(dIndex),
      ];
      return { ...state, payrolls: newPayrolls };

    default:
      return state;
  }
};

// const reducer = combineReducers({
//   fetchPayrolls: fetchPayrollsReducer,
//   generatePayroll: generatePayrollReducer,
//   updatePayroll: updatePayrollReducer,
//   approvePayroll: approvePayrollReducer,
//   deletePayroll: deletePayrollReducer,
// });

const Provider = ({ children }) => {
  const { currentOrg } = useOrg();
  const [state, dispatch] = React.useReducer(
    fetchPayrollsReducer,
    initialState
  );

  console.log("[PayrollProvider]: Line 121 -> state", state);

  const onFetchPayrolls = React.useCallback(async () => {
    try {
      dispatch({ type: types.FETCH_PAYROLL_REQUEST });
      const { success, payrolls, error } = await API.payroll.getAll({});
      success
        ? dispatch({ type: types.FETCH_PAYROLL_SUCCESS, payload: payrolls })
        : dispatch({ type: types.FETCH_PAYROLL_ERROR, error });
    } catch (error) {
      console.error(error);
      dispatch({ type: types.FETCH_PAYROLL_ERROR, error });
    }
  }, [currentOrg]);

  const onUpdatePayroll = (notify) => async (id, update) => {
    try {
      const { success, payroll, message, error } = await API.payroll.updateById(
        id,
        update
      );

      if (success) {
        dispatch({ type: types.UPDATE_PAYROLL, payload: payroll });
      } else {
        console.error(error);
      }
      // Notify user via notistack Snackbar
      notify({
        success,
        message: message || "Payroll updated successfully",
        error,
      });
    } catch (e) {
      console.error(e);
      // Notify user via notistack Snackbar
      notify({ success: false, error: "Something went wrong" });
    }
  };

  const onDeletePayroll = (notify) => async (payrollId) => {
    try {
      const { success, message, error } = await API.payroll.deleteById(
        payrollId
      );

      if (success) {
        dispatch({ type: types.DELETE_PAYROLL, payload: payrollId });
      } else {
        console.error(error);
      }
      // Notify user via notistack Snackbar
      notify({
        success,
        message: message || "Payroll deleted successfully",
        error,
      });
    } catch (e) {
      console.error(e);
      // Notify user via notistack Snackbar
      notify({ success: false, error: "Something went wrong" });
    }
  };

  return (
    <Context.Provider
      value={{ state, onFetchPayrolls, onUpdatePayroll, onDeletePayroll }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;