import AsyncStorage from '@react-native-async-storage/async-storage'

export const BASE_STORAGE_KEY = '@TemplateStore'

export const JWT_STORAGE_KEY = `${BASE_STORAGE_KEY}:JWT`

export const saveData = async (data, key) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    throw Error(`Failed setting item ${data} with key ${key}`)
  }
}

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return JSON.parse(value)
  } catch (error) {
    throw Error(`Failed retrieving data from key ${key}`)
  }
}

export const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch (exception) {
    return false
  }
}
