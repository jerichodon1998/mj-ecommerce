import { configureStore } from "@reduxjs/toolkit";
import signinSlice from "./authentitcationRegistration/signinSlice";
import signupSlice from "./authentitcationRegistration/signupSlice";
import profileSlice from "./profile/profileSlice";
import cartSlice from "./cart/cartSlice";
import productSlice from "./product/productSlice";

export const store = configureStore({
	reducer: {
		signinStore: signinSlice,
		signupStore: signupSlice,
		profileStore: profileSlice,
		cartStore: cartSlice,
		productStore: productSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	devTools: process.env.NEXT_PUBLIC_NODE_ENV == "production" ? false : true,
});
