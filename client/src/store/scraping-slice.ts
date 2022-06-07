// node_modules
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Data } from '../utils/types';

const API_URL = 'http://localhost:8080/api';

type scrapingState = {
  data: Data;
  count: number;
  status: string;
  error: string;
};

const initialState: scrapingState = {
  data: {
    firstName: '',
    lastName: '',
    listingCount: '',
    imgSrc: ''
  },
  count: 0,
  status: '',
  error: '',
};

const scrapingSlice = createSlice({
  name: "scraping",
  initialState: initialState,
  reducers: {
    scrapingRequest(state: scrapingState, action: PayloadAction<{}>) {
      state.error = '';
      state.status = 'pending';
    },
    scrapingRequestSuccess(state: scrapingState, action: PayloadAction<{ data: Data }>) {
        state.data = action.payload.data;
        state.status = 'success';
    },
    scrapingRequestFail(state: scrapingState, action: PayloadAction<string>) {
        state.error = action.payload;
        state.status = 'failure';
    }
  },
});

const scrapingActions = scrapingSlice.actions;

export const requestScraping = (url: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(scrapingActions.scrapingRequest({}));
    try {
      const response = await fetch(`${API_URL}/scraping`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url }),
      });
      const responseData: {
        data: Data
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      dispatch(scrapingActions.scrapingRequestSuccess({ data: responseData.data }));
    } catch (error) {
      dispatch(scrapingActions.scrapingRequestFail('error'));
    }
  };
};

export default scrapingSlice;
