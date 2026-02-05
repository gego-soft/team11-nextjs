import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactService } from "@/services/Auth/contactService";
import { ContactInfo } from "@/types/Auth/contactDetails";

export const getContactInfo = createAsyncThunk<
  ContactInfo,
  void,
  { rejectValue: string }
>("contact/getContactInfo", async (_, { rejectWithValue }) => {
  try {
    const res = await ContactService.getContactInfo();

    if (!res.data.success) {
      return rejectWithValue(res.data.message);
    }

    return res.data.data;
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch contact info",
    );
  }
});
