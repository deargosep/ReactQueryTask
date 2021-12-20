import { Dimensions, Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

class Device {
  constructor() {
    this.parameters = Dimensions.get('window')
    this.status_bar_height = Platform.OS === 'ios' ? getStatusBarHeight() : 0
    this.is_iphone_se = this.parameters.width <= 330
  }

  _getStatusBarHeight() {
    return this.status_bar_height
  }

  _getIsIphoneSe() {
    return this.is_iphone_se
  }
}

export default new Device()
