import RNFetchBlob from 'rn-fetch-blob'
import { PermissionsAndroid } from 'react-native'

const getFileExtention = (fileUrl) => {
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : null
}

export const downloadFile = async (url, title) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Нужен доступ к файловой системе',
        message: 'Нужен доступ к вашей файловой системе, чтобы скачать файл'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let fileExt = getFileExtention(url)
      fileExt = '.' + fileExt[0]
      console.log(url, fileExt)

      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${RNFetchBlob.fs.dirs.DownloadDir}/${title}${fileExt}`,
          description: 'downloading file...'
        }
      })
        .fetch('GET', url)
        .then((res) => {
          console.log('The file saved to ', res.path())
          return res
        })
      console.log('Storage Permission Granted.')
    } else {
      Alert.alert('Error', 'Storage Permission Not Granted')
    }
  } catch (err) {
    console.log('++++' + err)
  }
}
