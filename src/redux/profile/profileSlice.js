import { axiosInstance } from "@/pages/api/axiosInstance";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	isRequestDone: false,
	data: null,
	error: null,
	isSuccess: false,
	statusCode: null,
	statusText: null,
};

export const updateUserProfile = createAsyncThunk(
	"/updateUserProfile",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(
				`/profile/${credentials.uid}`,
				credentials,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const updateUserSlice = createSlice({
	name: "userprofile",
	initialState,
	reducers: {
		resetProfileState: (state) => {
			state.isLoading = false;
			state.error = null;
			state.isRequestDone = false;
			state.data = null;
			state.isSuccess = false;
			state.statusCode = null;
			state.statusText = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(isAnyOf(updateUserProfile.pending), (state) => {
				state.isLoading = true;
			})
			.addMatcher(isAnyOf(updateUserProfile.fulfilled), (state, action) => {
				state.data = action.payload?.data;
				state.statusCode = action.payload?.status;
				state.statusText = action.payload?.statusText;
				state.error = null;
				state.isRequestDone = true;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addMatcher(isAnyOf(updateUserProfile.rejected), (state, action) => {
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

export const { resetProfileState } = updateUserSlice.actions;

export default updateUserSlice.reducer;
