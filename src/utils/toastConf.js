import PushNotification from '../components/Toasts/PushNotification'
import React from 'react'

export const toastConfig = {
  pushNotification: (internalState) => (
    <PushNotification internalState={internalState} />
  )
  // error: (internalState) => <ToastError internalState={internalState} />
}
