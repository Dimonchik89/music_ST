import { createSelector } from "@reduxjs/toolkit"

const baseState = state => state.player

export const showPlayer = createSelector(baseState, state => state.showPlayer);
