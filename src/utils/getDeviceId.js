import messaging from '@react-native-firebase/messaging'
import { getData, saveData, FIREBASE_KEY } from './asyncStorage'
import DeviceInfo from 'react-native-device-info'

export const getFirebaseDeviseId = async () => {
  let deviceId = await getData(FIREBASE_KEY)

  if (!deviceId) {
    deviceId = await messaging().getToken()
    await saveData(deviceId, FIREBASE_KEY)
  }

  return deviceId
}

export const getDeviseId = async () => {
  return DeviceInfo.getUniqueId()
}
