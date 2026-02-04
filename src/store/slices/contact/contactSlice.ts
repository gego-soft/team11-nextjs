import { createSlice } from "@reduxjs/toolkit";
import { ContactInfo, ContactState } from "@/types/Auth/contactDetails";
import { getContactInfo } from "./contactThunks";

const initialState: ContactState = {
  data: undefined,
  loading: false,
  error: undefined,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactInfo.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getContactInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getContactInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactSlice.reducer;
