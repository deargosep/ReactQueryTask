const config = {
  axios: {
    baseURL: 'http://my_doctor.local/api/v1',
    baseImgUrl: 'http://my_doctor.local/storage/'
  },

  respBody(response) {
    return {
      data: response.data,
      status: response.status,
      headers: response.headers
    }
  },

  respError(error) {
    console.log(error.response.data)
    console.log(error.response.status)
    return {
      status: error.response.status,
      description: error.response.data.detail
    }
  }
}

export default config
