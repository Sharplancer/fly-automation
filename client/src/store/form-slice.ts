import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

const API_URL = 'http://localhost:8080/api';

type Form = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  gender: string;
  country: string;
}

type FormState = {
  error: string,
  status: string,
  name: string
}

const initialState: FormState = {
  error: '',
  status: '',
  name: ''
}

const formsSlice = createSlice({
  name: 'forms',
  initialState: initialState,
  reducers: {
    formRequest(state: FormState, action: PayloadAction<{ name: string }>) {
      state.error = '';
      state.status = 'pending';
      state.name = action.payload.name;
    },
    requestFormSuccess(state: FormState, action: PayloadAction<string>) {
      state.status = 'successed';
    },
    requestFormFail(state: FormState, action: PayloadAction<any>) {
      state.error = action.payload;
      state.status = 'failed';
    }
  }
});

const formActions = formsSlice.actions;

export const requestForm = (
  firstName:  string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  gender: string,
  country: string
  ) => {

  return async (dispatch: Dispatch) => {
    dispatch(formActions.formRequest({ name: 'formRequest' }));
    try {
      const response = await fetch(`${API_URL}/automation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, userName, email, password, gender, country }),
      });
      const responseData: {
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      dispatch(formActions.requestFormSuccess(responseData.message));
    } catch (error) {
      dispatch(formActions.requestFormFail(error))
    }
  }
}

export default formsSlice;