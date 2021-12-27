import React, { useRef } from 'react'
import { TextInput, SafeAreaView, View } from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import Input from '@components/Input'
import TextInputMask from 'react-native-text-input-mask'
import Button from '@components/Button'
import ButtonMD from '@components/Button'
import { useDispatch } from 'react-redux'
import { JWT_STORAGE_KEY, removeItemValue } from '@utils/asyncStorage'
import { getCurrentUser } from '@store/modules/auth/actions'
import Wrapper from '@components/Wrapper'
import { useCurrentUser } from '@store/modules/auth/actions'

const Second = () => {
  const currentUserQuery = useCurrentUser()

  const logout = () => {
    removeItemValue(JWT_STORAGE_KEY)
    currentUserQuery.refetch()
  }
  return (
    <Wrapper otherStyles={styles().page}>
      <View></View>
      <ButtonMD text="Logout" handlePress={() => logout()} />
    </Wrapper>
  )
}

export default Second
