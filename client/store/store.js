import { configureStore } from "@reduxjs/toolkit";
import player from "./player/playerSlice";
import actualMusics from "./actualMusics/musicsSlice";

const store = configureStore({
    reducer: {
        player,
        actualMusics
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export default store;