import { configureStore } from "@reduxjs/toolkit";
import choosedMediaItems from "@/redux/slice/choose.gallery.slice";

export const reduxStore = configureStore({
  reducer: {
    choosedMediaItems: choosedMediaItems
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
