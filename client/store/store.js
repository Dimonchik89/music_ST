import { configureStore } from "@reduxjs/toolkit";
import player from "./player/playerSlice";
import actualMusics from "./actualMusics/musicsSlice";
import header from "./header/headerSlice";

const store = configureStore({
    reducer: {
        player,
        actualMusics,
        header
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export default store;