import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.header;

export const mobileMenu = createSelector(baseState, state => state.mobileMenu)
export const mobileSearch = createSelector(baseState, state => state.mobileSearch)