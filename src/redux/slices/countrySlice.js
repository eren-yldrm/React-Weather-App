import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CountryService from "../../services/CountryService";

const countryrService =  new CountryService();

//#region Slice
const { actions, reducer } = createSlice({
    name: "countries",
    initialState: {
        value: [],
    },
    reducers: {
        setCountries: (state, action) => {
            state.value = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCountries.fulfilled, (state, action) => {});
    },
});
//#endregion Slice

//#region Thunks
const getCountries = createAsyncThunk("getCountries", async (params, ThunkAPI) => {
    const response = await countryrService.getCountries().then((result) => {
        if(result.data)
            ThunkAPI.dispatch(actions.setCountries(result.data));
        else 
            return result;
    });
    return response;
});
//#endregion Thunks

export { getCountries, actions };
export default reducer;