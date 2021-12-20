import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@theme'
import Wrapper from '@components/Wrapper'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field'
import Spacer from '@components/Spacer'
import ButtonMD from '@components/Button'
import { useDispatch } from 'react-redux'
import { sendCode as sendCodeAction } from '@store/modules/auth/actions'
import { saveData, JWT_STORAGE_KEY } from '../../../utils/asyncStorage'
import {
  getCurrentUser,
  login,
  registerByPhone
} from '@store/modules/auth/actions'
import { getCurrentSpecialist } from '@store/modules/auth/actions'

const CELL_COUNT = 4

const Code = ({ navigation, route }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()
  const dispatch = useDispatch()

  const loginType =
    route.params.loginType === 'specialist' ? 'specialist' : 'user'

  const [isLoading, setIsLoading] = useState(false)

  const [value, setValue] = useState(route.params.code ? route.params.code : '')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  })

  const [error, setError] = useState(null)

  const [isResendCode, setResendCode] = useState(false)

  const resendCode = async () => {
    if (isResendCode) return
    setResendCode(true)
    setIsLoading(true)
    if (route.params.isRegister) {
      let data = { phone: route.params.user.phone, source: 'current' }
      if (route.params.inn) {
        data.inn = route.params.inn
        data.source = route.params.loginType
      }

      dispatch(
        registerByPhone(
          data,
          (response) => {
            setValue(response.smsCode)
            setIsLoading(false)
          },
          (error) => {
            setIsLoading(false)
            if (error.status === 403)
              setFieldError('phone', t('auth.enterLogin.errors.phoneExists'))
          }
        )
      )
    } else {
      dispatch(
        login(
          { login: route.params.user.phone, userType: loginType },
          (response) => {
            setValue(response.smsCode)
            setIsLoading(false)
          }
        ),
        (error) => {
          setIsLoading(false)
          if (error.status === 404)
            setFieldError('phone', t('auth.enterLogin.errors.code'))
          console.log(error)
        }
      )
    }
    setError(null)
    setTimeout(() => setResendCode(false), 60000)
  }

  const sendCode = () => {
    if (value.length < 4) {
      setError('auth.code.error')
      return
    }
    setIsLoading(true)
    dispatch(
      sendCodeAction(
        {
          phone: route.params.user.phone,
          password: value,
          userType: loginType
        },
        (response) => {
          saveData(response, JWT_STORAGE_KEY)
          setIsLoading(false)
          if (route.params.loginType === 'specialist')
            dispatch(getCurrentSpecialist())
          else dispatch(getCurrentUser())
        },
        (error) => {
          setIsLoading(false)
          if (error.status === 401 || error.status === 404)
            setError('auth.code.error')
        }
      )
    )
  }

  const changePhone = () => {
    navigation.navigate('EnterLogin', {
      ...route.params
    })
  }

  return (
    <Wrapper>
      <Spacer size={44} />
      <Text style={styles().text}>{t('auth.code.text')}</Text>
      <Spacer size={20} />
      <View style={styles().phoneNumber}>
        <Text style={styles().phoneNumberValue}>
          {route.params.user?.rawPhone}
        </Text>
        <Spacer size={12} />
        <TouchableOpacity onPress={() => changePhone()}>
          <Text style={styles().action}>{t('auth.code.changePhone')}</Text>
        </TouchableOpacity>
      </View>
      <Spacer size={52} />
      <CodeField
        ref={ref}
        {...props}
        autoFocus={true}
        value={value}
        onChangeText={(code) => {
          setError(null)
          setValue(code)
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles().codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[
              styles(null, error).cellRoot,
              symbol && styles(null, error).focusCell
            ]}
          >
            <Text style={styles().cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      {error && (
        <>
          <Spacer size={10} />
          <Text style={styles().error}>{t('auth.code.error')}</Text>
        </>
      )}
      <Spacer size={28} />
      <ButtonMD
        isLoading={isLoading}
        handlePress={() => sendCode()}
        text={t('auth.code.button')}
      />
      <Spacer size={20} />
      <TouchableOpacity onPress={() => resendCode()}>
        <Text style={styles(isResendCode).action}>
          {t('auth.code.sendAgain')}
        </Text>
      </TouchableOpacity>
    </Wrapper>
  )
}

export default Code
