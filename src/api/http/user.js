import axios from '../index'

export const _getCurrentUser = (data) => axios.get('/users/current', data)
export const _getCurrentSpecialist = (data) =>
  axios.get('/specialists/current', data)

export const _loginDevice = (data) => axios.post('/devices/', data)

export const _editProfile = (data) => axios.patch('/users/current', data)

export const _login = (data) => axios.post('/login', data)

export const _registerByPhone = (data) => axios.post('/users/', data)

export const _sendCode = (data) => axios.post('/validate_code', data)

export const _uploadPhoto = (data) =>
  axios.post('/users/current/photo', data, {
    'Content-Type': 'multipart/form-data'
  })
