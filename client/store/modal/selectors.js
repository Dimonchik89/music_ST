import { createSelector } from '@reduxjs/toolkit';

const baseState = state => state.modal;

export const showModal = createSelector(baseState, state => state.showModal)