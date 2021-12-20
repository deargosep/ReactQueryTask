import React from 'react'
import Phone from './Variants/Phone'
import DMS from './Variants/DMS'
import INN from './Variants/INN'

const EnterLogin = (props) => {
  switch (props.route.params.loginType) {
    case 'current':
      return <Phone {...props} />

    case 'sk_health':
      return <DMS {...props} />

    case 'bilyk_finance':
      return <INN {...props} />

    case 'spcialist':
      return <Phone {...props} />
    default:
      return <Phone {...props} />
  }
}

export default EnterLogin
