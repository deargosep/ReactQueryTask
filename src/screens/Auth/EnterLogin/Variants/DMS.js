import React from 'react'
import { View, Text } from 'react-native'
import styles from '../styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@theme'
import Wrapper from '@components/Wrapper'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Input from '@components/Input'
import ButtonMD from '@components/Button'
import Spacer from '@components/Spacer'
import TextInputMask from 'react-native-text-input-mask'

const DMS = ({ navigation }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()

  const DMSchema = Yup.object().shape({
    DMS: Yup.string()
      .min(10, t('auth.enterLogin.errors.health'))
      .max(10, t('auth.enterLogin.errors.health'))
      .required(t('auth.enterLogin.errors.health'))
  })

  return (
    <Formik
      initialValues={{ DMS: '' }}
      onSubmit={(values) => console.log(values)}
      validationSchema={DMSchema}
    >
      {(formik) => (
        <Wrapper>
          <Spacer size={20} />
          <Text style={styles().title}>
            {t('auth.enterLogin.titles.health')}
          </Text>
          <Spacer size={12} />
          <Text style={styles().text}>{t('auth.enterLogin.health')}</Text>
          <Spacer size={24} />
          <Input
            label="ДМС"
            fieldName="DMS"
            formik={formik}
            placeholder="ДМА-001234"
            render={(props) => <TextInputMask {...props} mask="ДМС-[000000]" />}
          />
          <Spacer size={36} />
          <ButtonMD
            text={t('auth.enterLogin.buttons.standard')}
            handlePress={formik.handleSubmit}
          />
        </Wrapper>
      )}
    </Formik>
  )
}

export default DMS
