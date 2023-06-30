import { axiosInstance } from "@/pages/api/axiosInstance";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	isRequestDone: false,
	isSuccess: false,
	statusCode: null,
	statusText: null,
	data: null,
	error: null,
};

export const createCart = createAsyncThunk(
	"/createCart",
	async (uid, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(`/cart/${uid}`);
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const getUserCart = createAsyncThunk(
	"/getUserCart",
	async (uid, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/cart/${uid}`);
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const addToCart = createAsyncThunk(
	"/addToCart",
	async (data, { rejectWithValue }) => {
		// add to cart
		try {
			const response = await axiosInstance.put(
				`/cart/${data.uid}/addToCart/${data.productId}`,
				{
					quantity: data.quantity,
				}
			);
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const removeFromCart = createAsyncThunk(
	"/removeFromCart",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(
				`cart/${data.uid}/removeFromCart/${data.cartItemId}`
			);
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const checkOutCart = createAsyncThunk(
	"/checkOutCart",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(`cart/checkOut/${data.uid}`);
			return response;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const cartSlice = createSlice({
	name: "cartSlice",
	initialState,
	reducers: {
		resetCartSliceState: (state) => {
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
					checkOutCart.pending,
					getUserCart.pending,
					addToCart.pending,
					removeFromCart.pending
				),
				(state) => {
					state.isLoading = true;
				}
			)
			.addMatcher(
				isAnyOf(
					checkOutCart.fulfilled,
					getUserCart.fulfilled,
					addToCart.fulfilled,
					removeFromCart.fulfilled
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
					checkOutCart.rejected,
					getUserCart.rejected,
					addToCart.rejected,
					removeFromCart.rejected
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

export const { resetCartSliceState } = cartSlice.actions;

export default cartSlice.reducer;
