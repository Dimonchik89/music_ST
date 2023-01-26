import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.user;

export const token = createSelector(baseState, state => state.token)
export const id = createSelector(baseState, state => state.id)
export const email = createSelector(baseState, state => state.email)
export const role = createSelector(baseState, state => state.role)