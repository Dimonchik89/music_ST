import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.category;

export const allCategory = createSelector(baseState, state => state.allCategory)
export const actualCategoryId = createSelector(baseState, state => state.actualCategoryId)