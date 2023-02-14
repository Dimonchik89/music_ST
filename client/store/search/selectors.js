import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.search;

export const searchValue = createSelector(baseState, state => state.searchValue)