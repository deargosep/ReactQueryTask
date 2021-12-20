import { setIniialRoute } from '@store/modules/notifications/actions'
import { store } from '../../store/store'

export const messageHander = (remoteMessage, initial, navigation, t) => {
  switch (remoteMessage.data.type) {
    case 'recomendation':
      routeHandler(
        'ReceptionInfo',
        null,
        {
          headerTitle: remoteMessage.data.reception_date
        },
        initial,
        navigation
      )
      break

    default:
      break
  }
}

const routeHandler = (
  routeName,
  secondRouteName = null,
  params,
  initial,
  navigation
) => {
  if (initial) {
    store.dispatch(
      setIniialRoute({
        name: routeName,
        subName: secondRouteName,
        params
      })
    )
  } else {
    if (secondRouteName) {
      navigation.navigate(routeName, {
        screen: secondRouteName,
        params
      })
    } else {
      navigation.navigate(routeName, {
        ...params
      })
    }
  }
}
