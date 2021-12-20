import config from '@api/config'

export const imageFromServer = (url) => `${config.axios.baseImgUrl}${url}`
