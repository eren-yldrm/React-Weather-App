import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import WeatherService from "../../services/WeatherService";

const weatherService = new WeatherService();

const { actions, reducer } = createSlice({
    name: "weather",
    initialState: {
        value: [],
    },
    reducers: {
        setWeather: (state, action) => {
            state.value = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getWeather.fulfilled, (state, action) => {});
    },
});
//#endregion Slice

//#region Thunks
const getWeather = createAsyncThunk("getWeather", async (params, ThunkAPI) => {
    const response = await weatherService.getWeather(params.lat,params.lon).then((result) => {
        if(result.data)
            ThunkAPI.dispatch(actions.setWeather(result.data));
        else 
            return result;
    });
    return response;
});
//#endregion Thunks

export { getWeather, actions };
export default reducer;