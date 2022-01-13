import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import styles from '../styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'theme'
import Wrapper from 'components/Wrapper'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Input from 'components/Input'
import TextInputMask from 'react-native-text-input-mask'
import ButtonMD from 'components/Button'
import Spacer from 'components/Spacer'
import { useDispatch } from 'react-redux'
import { registerByPhone } from 'store/modules/auth/actions'
import { useLogin } from 'store/modules/auth/actions'
import { useQueryPost } from 'store/hooks'

const Phone = ({ navigation, route, specialist }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()

  const loginType =
    route.params.loginType === 'specialist' ? 'specialist' : 'user'

  const [number, setNumber] = useState('')

  const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .min(16, t('auth.enterLogin.errors.phone.min'))
      .required(t('auth.enterLogin.errors.phone'))
    // TODO: Fix schema thinking there is no phone inputted when onChangeText prop is used
  })

  const login = useQueryPost('login', {
    login: number,
    source: 'current',
    userType: loginType
  })

  const registerByPhone = useQueryPost('registerByPhone', {
    phone: number,
    source: 'current'
  })

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(number)
  }, [number])

  const validatePhone = (phone) => {
    return `${phone.substring(0, 4)}${phone.substring(5, 8)}${phone.substring(
      9,
      12
    )}${phone.substring(13, 16)}`
  }

  const sendPhone = (rawPhone, setFieldError) => {
    const phone = validatePhone(rawPhone)
    console.log(route.params)
    // setLoginData({ phone, source: 'current' })
    if (route.params.isRegister) {
      registerByPhone.refetch().then((res) => {
        if (res.isSuccess) {
          navigation.navigate('Code', {
            user: { rawPhone, phone: number },
            isRegister: route.params.isRegister,
            loginType: loginType,
            code: res.data.data.smsCode
          })
        }
        if (res.isError) {
          console.log(res.error.status)
          if (res.status === 403)
            setFieldError('phone', t('auth.enterLogin.errors.phoneExists'))
        }
      })
    } else {
      login.refetch().then((res) => {
        if (res.isSuccess) {
          navigation.navigate('Code', {
            user: { rawPhone, phone: number },
            isRegister: route.params.isRegister,
            loginType: loginType,
            code: res.data.data.smsCode
          })
        }
        if (res.isError) {
          console.log(res.error.status)
          if (res.status === 404)
            setFieldError('phone', t('auth.enterLogin.errors.phoneNotExists'))
        }
      })
    }
  }

  return (
    <Formik
      initialValues={{
        phone: route.params.user?.phone ? route.params.user.phone : ''
      }}
      onSubmit={(values, { setFieldError }) => {
        sendPhone(values.phone, setFieldError)
      }}
      // validationSchema={phoneSchema}
    >
      {(formik) => (
        <Wrapper>
          <Spacer size={20} />
          <Text style={styles().title}>
            {t(
              `auth${
                route.params.loginType === 'specialist' ? '.specialist' : ''
              }.title`
            )}
          </Text>
          <Spacer size={12} />
          <Text style={styles().text}>
            {t(
              `auth${
                route.params.loginType === 'specialist' ? '.specialist' : ''
              }.enterLogin.phone`
            )}
          </Text>
          <Spacer size={12} />
          {route.params.loginType === 'specialist' && (
            <Text style={styles().text}>
              {t('auth.specialist.enterLogin.justType')}
            </Text>
          )}
          <Spacer size={24} />
          <Input
            label="Номер телефона"
            fieldName="phone"
            formik={formik}
            onChangeText={(formatted) => {
              setNumber(validatePhone(formatted))
            }}
            render={(props) => (
              <TextInputMask {...props} mask="+996 [000] [000]-[000]" />
            )}
          />
          <Spacer size={36} />
          <ButtonMD
            text={t(
              `auth${
                route.params.loginType === 'specialist' ? '.specialist' : ''
              }.enterLogin.buttons.phone.enter`
            )}
            handlePress={formik.handleSubmit}
            isLoading={login.isLoading}
          />
          <Spacer size={15} />
          {/* <ButtonMD
            text={t('auth.enterLogin.buttons.phone.forget')}
            handlePress={formik.handleSubmit}
            mode="text"
          /> */}
        </Wrapper>
      )}
    </Formik>
  )
}

export default Phone
