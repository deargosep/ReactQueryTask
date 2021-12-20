import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@theme'
import Wrapper from '@components/Wrapper'
import ButtonMD from '@components/Button'
import Spacer from '@components/Spacer'

const Choose = ({ navigation, route }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()

  return (
    <Wrapper otherStyles={styles().container}>
      <Text style={styles().title}>{t('auth.title')}</Text>
      <Text style={styles().text}>
        {route.params.isRegister
          ? t('auth.choose.register')
          : t('auth.choose.auth')}
      </Text>
      {route.params.isRegister && (
        <ButtonMD
          text={t('auth.choose.finance')}
          handlePress={() =>
            navigation.navigate('EnterLogin', {
              isRegister: route.params.isRegister,
              loginType: 'bilyk_finance'
            })
          }
        />
      )}
      <Spacer size={12} />
      {/* <ButtonMD
        text={t('auth.choose.health')}
        handlePress={() => console.log(1)}
      />
      <Spacer size={12} /> */}
      <ButtonMD
        sub={route.params.isRegister ? true : false}
        text={t('auth.choose.phone')}
        handlePress={() =>
          navigation.navigate('EnterLogin', {
            isRegister: route.params.isRegister,
            loginType: 'current'
          })
        }
      />
      <Spacer size={12} />
      {!route.params.isRegister && (
        <ButtonMD
          mode={'text'}
          text={'Я специалист'}
          handlePress={() =>
            navigation.navigate('EnterLogin', {
              isRegister: route.params.isRegister,
              loginType: 'specialist'
            })
          }
        />
      )}
    </Wrapper>
  )
}

export default Choose
