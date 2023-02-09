import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.actualMusics;

export const actualMusics = createSelector(baseState, state => state.actualMusics);
export const loading = createSelector(baseState, state => state.loading);
export const error = createSelector(baseState, state => state.error);
export const music = createSelector(baseState, state => state.music)
export const currentTimeDublicate = createSelector(baseState, state => state.currentTimeDublicate)
export const allCount = createSelector(baseState, state => state.allCount)
export const songIsDownloading = createSelector(baseState, state => state.songIsDownloading)