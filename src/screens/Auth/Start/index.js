import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'theme'
import Wrapper from 'components/Wrapper'
import ButtonMD from 'components/Button'
import Spacer from 'components/Spacer'

const Start = ({ navigation }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()

  return (
    <Wrapper otherStyles={styles().container}>
      <View></View>
      <Image source={Images.logo} style={styles().image} resizeMode="contain" />
      <View style={styles().actions}>
        <ButtonMD
          text={t('auth.start.register')}
          mode="text"
          handlePress={() =>
            navigation.navigate('Choose', { isRegister: true })
          }
        />
        <Spacer size={15} />
        <ButtonMD
          text={t('auth.start.auth')}
          handlePress={() =>
            navigation.navigate('Choose', { isRegister: false })
          }
        />
      </View>
    </Wrapper>
  )
}

export default Start
