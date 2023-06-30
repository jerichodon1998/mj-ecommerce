import { axiosInstance } from "@/pages/api/axiosInstance";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	isRequestDone: false,
	isSuccess: false,
	data: null,
	error: null,
	statusCode: null,
	statusText: null,
};

export const registerUser = createAsyncThunk(
	"/registerUser",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post("/signup", credentials);
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const signupSlice = createSlice({
	name: "signup",
	initialState,
	reducers: {
		resetSignupState: (state) => {
			state.isLoading = false;
			state.data = null;
			state.error = null;
			state.isRequestDone = false;
			state.isSuccess = false;
			state.statusCode = null;
			state.statusText = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(isAnyOf(registerUser.pending), (state) => {
				state.isLoading = true;
			})
			.addMatcher(isAnyOf(registerUser.fulfilled), (state, action) => {
				state.data = action.payload?.data;
				state.statusCode = action.payload?.status;
				state.statusText = action.payload?.statusText;
				state.error = null;
				state.isRequestDone = true;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addMatcher(isAnyOf(registerUser.rejected), (state, action) => {
				state.data = null;
				state.statusCode = action.payload?.status;
				state.statusText = action.payload?.statusText;
				state.error = action.payload?.data;
				state.isRequestDone = true;
				state.isLoading = false;
				state.isSuccess = false;
			});
	},
});

export const { resetSignupState } = signupSlice.actions;

export default signupSlice.reducer;
