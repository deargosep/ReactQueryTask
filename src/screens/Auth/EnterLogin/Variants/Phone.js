import React, { useState } from 'react'
import { View, Text } from 'react-native'
import styles from '../styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@theme'
import Wrapper from '@components/Wrapper'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Input from '@components/Input'
import TextInputMask from 'react-native-text-input-mask'
import ButtonMD from '@components/Button'
import Spacer from '@components/Spacer'
import { useDispatch } from 'react-redux'
import { registerByPhone, login } from '@store/modules/auth/actions'

const Phone = ({ navigation, route, specialist }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()

  const loginType =
    route.params.loginType === 'specialist' ? 'specialist' : 'user'

  const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .min(16, t('auth.enterLogin.errors.phone'))
      .required(t('auth.enterLogin.errors.phone'))
  })

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const validatePhone = (phone) => {
    return `${phone.substring(0, 4)}${phone.substring(5, 8)}${phone.substring(
      9,
      12
    )}${phone.substring(13, 16)}`
  }

  const sendPhone = (rawPhone, setFieldError) => {
    setIsLoading(true)
    const phone = validatePhone(rawPhone)
    console.log(route.params)
    if (route.params.isRegister) {
      dispatch(
        registerByPhone(
          { phone, source: 'current' },
          (response) => {
            setIsLoading(false)
            navigation.navigate('Code', {
              user: { rawPhone, phone },
              isRegister: route.params.isRegister,
              loginType: loginType,
              code: response.smsCode
            })
          },
          (error) => {
            setIsLoading(false)
            console.log(error.status)
            if (error.status === 403)
              setFieldError('phone', t('auth.enterLogin.errors.phoneExists'))
          }
        )
      )
    } else {
      dispatch(
        login(
          {
            login: phone,
            userType: loginType
          },
          (response) => {
            setIsLoading(false)
            navigation.navigate('Code', {
              user: { rawPhone, phone },
              isRegister: route.params.isRegister,
              loginType: loginType,
              code: response.smsCode
            })
          },
          (error) => {
            setIsLoading(false)
            console.log(error.status)
            if (error.status === 404)
              setFieldError('phone', t('auth.enterLogin.errors.phoneNotExists'))
          }
        )
      )
    }
  }

  return (
    <Formik
      initialValues={{
        phone: route.params.user?.phone ? route.params.user.phone : ''
      }}
      onSubmit={(values, { setFieldError }) =>
        sendPhone(values.phone, setFieldError)
      }
      validationSchema={phoneSchema}
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
            isLoading={isLoading}
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
