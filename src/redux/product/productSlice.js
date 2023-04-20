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

export const createProduct = createAsyncThunk(
	"/createProduct",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(`/products`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const updateProduct = createAsyncThunk(
	"/updateProduct",
	async (data, { rejectWithValue }) => {
		try {
			const response = axiosInstance.put(`/products/${data.productId}`, data);
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const deleteProduct = createAsyncThunk(
	"/deleteProduct/",
	async (data, { rejectWithValue }) => {
		try {
			const response = axiosInstance.delete(
				`/products/${data.productId}`,
				data
			);
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const productSlice = createSlice({
	name: "productSlice",
	initialState,
	reducers: {
		resetProductState: (state) => {
			state.data = null;
			state.error = null;
			state.isLoading = false;
			state.isRequestDone = false;
			state.isSuccess = false;
			state.statusCode = null;
			state.statusText = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				isAnyOf(
					updateProduct.pending,
					createProduct.pending,
					deleteProduct.pending
				),
				(state, action) => {
					state.isLoading = true;
				}
			)
			.addMatcher(
				isAnyOf(
					updateProduct.fulfilled,
					createProduct.fulfilled,
					deleteProduct.fulfilled
				),
				(state, action) => {
					state.data = action.payload?.data;
					state.isLoading = false;
					state.isRequestDone = true;
					state.isSuccess = true;
					state.statusCode = action.payload?.status;
					state.statusText = action.payload?.statusText;
				}
			)
			.addMatcher(
				isAnyOf(
					updateProduct.rejected,
					createProduct.rejected,
					deleteProduct.rejected
				),
				(state, action) => {
					state.data = null;
					state.statusCode = action.payload?.status;
					state.statusText = action.payload?.statusText;
					state.error = action.payload?.data;
					state.isRequestDone = true;
					state.isLoading = false;
					state.isSuccess = false;
				}
			);
	},
});

export const { resetProductState } = productSlice.actions;

export default productSlice.reducer;
