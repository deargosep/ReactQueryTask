import React, { useState } from 'react'
import { View, Text } from 'react-native'
import styles from '../styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'theme'
import Wrapper from 'components/Wrapper'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Input from 'components/Input'
import ButtonMD from 'components/Button'
import Spacer from 'components/Spacer'
import { useDispatch } from 'react-redux'
import TextInputMask from 'react-native-text-input-mask'
import { registerByPhone } from 'store/modules/auth/actions'

const INN = ({ navigation, route }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const INNSchema = Yup.object().shape({
    INN: Yup.string()
      .min(14, t('auth.enterLogin.errors.finance'))
      .max(14, t('auth.enterLogin.errors.finance'))
      .required(t('auth.enterLogin.errors.finance')),
    phone: Yup.string()
      .min(16, t('auth.enterLogin.errors.phone'))
      .required(t('auth.enterLogin.errors.phone'))
  })

  const validatePhone = (phone) => {
    return `${phone.substring(0, 4)}${phone.substring(5, 8)}${phone.substring(
      9,
      12
    )}${phone.substring(13, 16)}`
  }

  const sendINN = (values, setFieldError) => {
    setIsLoading(true)
    const phone = validatePhone(values.phone)
    console.log({ phone, inn: values.INN, source: route.params.loginType })
    dispatch(
      registerByPhone(
        { phone, inn: values.INN, source: route.params.loginType },
        (response) => {
          console.log(response)
          setIsLoading(false)
          navigation.navigate('Code', {
            user: { rawPhone: values.phone, phone },
            isRegister: route.params.isRegister,
            loginType: route.params.loginType,
            code: response.smsCode,
            inn: values.INN
          })
        },
        (error) => {
          setIsLoading(false)
          if (error.status === 403) {
            if (error.description === 'phone') {
              setFieldError('phone', t('auth.enterLogin.errors.phoneExists'))
            }
            if (error.description === 'inn') {
              setFieldError('INN', t('auth.enterLogin.errors.innExists'))
            }
          }
          if (error.status === 404) {
            setFieldError('INN', t('auth.enterLogin.errors.innNotFound'))
          }
        }
      )
    )
  }

  return (
    <Formik
      initialValues={{
        INN: '',
        phone: route.params.user?.phone ? route.params.user.phone : ''
      }}
      onSubmit={(values, { setFieldError }) => sendINN(values, setFieldError)}
      validationSchema={INNSchema}
    >
      {(formik) => (
        <Wrapper>
          <Spacer size={20} />
          <Text style={styles().title}>
            {t('auth.enterLogin.titles.finance')}
          </Text>
          <Spacer size={12} />
          <Text style={styles().text}>{t('auth.enterLogin.finance')}</Text>
          <Spacer size={24} />
          <Input
            label="ИНН"
            fieldName="INN"
            formik={formik}
            placeholder="12323123131231"
            keyboardType="numeric"
          />
          <Spacer size={12} />
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
            text={t('auth.enterLogin.buttons.standard')}
            handlePress={formik.handleSubmit}
            isLoading={isLoading}
          />
        </Wrapper>
      )}
    </Formik>
  )
}

export default INN
