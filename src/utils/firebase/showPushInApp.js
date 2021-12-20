import Toast from 'react-native-toast-message'

export const showToast = (type, offsetTop, messages) => {
  return Toast.show({
    type: type,
    position: 'top',
    text1: messages.title,
    text2: messages,
    visibilityTime: 30000,
    autoHide: true,
    topOffset: offsetTop
  })
}
