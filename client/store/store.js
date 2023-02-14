import { configureStore } from "@reduxjs/toolkit";
import player from "./player/playerSlice";
import actualMusics from "./actualMusics/musicsSlice";
import header from "./header/headerSlice";
import modal from "./modal/modalSlice";
import user from "./user/userSlice";
import category from "./category/categorySlice";
import search from "./search/searchSlice";

const store = configureStore({
    reducer: {
        player,
        actualMusics,
        header,
        modal,
        user,
        category,
        search
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export default store;