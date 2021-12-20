import { createReducer } from '@reduxjs/toolkit'

export const SET_MODAL = 'SET_MODAL'

const initialState = {
  modal: '',
  modalAction: null,
  modalTitle: ''
}

export const modalsReducer = createReducer(initialState, {
  [SET_MODAL]: (state, action) => {
    const { modal, modalAction, modalTitle } = action.payload
    state.modal = modal
    state.modalAction = modalAction ? modalAction : null
    state.modalTitle = modalTitle ? modalTitle : ''
  }
})
