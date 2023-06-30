import { axiosInstance } from "@/pages/api/axiosInstance";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
	isLoggedin: false,
	isLoading: false,
	isRequestDone: false,
	data: null,
	statusCode: null,
	statusText: null,
	error: null,
	isSuccess: false,
};

export const signinUser = createAsyncThunk(
	"/signinUser",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post("/signin", credentials);
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const signoutuser = createAsyncThunk(
	"/signoutuser",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post("/signout");
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const persistUser = createAsyncThunk(
	"/persistUser",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get("/persistuser");
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const signinSlice = createSlice({
	name: "signin",
	initialState,
	reducers: {
		resetSigninState: (state) => {
			state.isLoading = false;
			state.data = null;
			state.error = null;
			state.isRequestDone = false;
			state.isSuccess = false;
			state.isLoggedin = false;
			state.statusCode = null;
			state.statusText = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(isAnyOf(signinUser.pending, persistUser.pending), (state) => {
				state.isLoading = true;
			})
			.addMatcher(
				isAnyOf(signinUser.fulfilled, persistUser.fulfilled),
				(state, action) => {
					state.data = action.payload?.data;
					state.statusCode = action.payload?.status;
					state.statusText = action.payload?.statusText;
					state.error = null;
					state.isRequestDone = true;
					state.isLoading = false;
					state.isSuccess = true;
					state.isLoggedin = true;
				}
			)
			.addMatcher(
				isAnyOf(signinUser.rejected, persistUser.rejected),
				(state, action) => {
					state.data = null;
					state.statusCode = action.payload?.status;
					state.statusText = action.payload?.statusText;
					state.error = action.payload?.data;
					state.isRequestDone = true;
					state.isLoading = false;
				}
			);
		builder
			.addMatcher(isAnyOf(signoutuser.pending), (state) => {
				state.isLoading = true;
			})
			.addMatcher(isAnyOf(signoutuser.fulfilled), (state, action) => {
				state.data = null;
				state.statusCode = action.payload?.status;
				state.statusText = action.payload?.statusText;
				state.error = null;
				state.isRequestDone = true;
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedin = false;
			})
			.addMatcher(isAnyOf(signoutuser.rejected), (state, action) => {
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

export const { resetSigninState } = signinSlice.actions;

export default signinSlice.reducer;
