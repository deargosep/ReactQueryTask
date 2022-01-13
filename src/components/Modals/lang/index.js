import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'theme'
import { useDispatch } from 'react-redux'
import { setModal } from 'store/modules/modals/actions'

const Lang = ({ navigation }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()
  const dispatch = useDispatch()
  return (
    <View style={styles().page}>
      <View style={styles().header}>
        <Text style={styles().title}>{t('modals.lang.chooseLang')}</Text>
        <TouchableOpacity
          style={styles().close}
          onPress={() => dispatch(setModal({ modal: '' }))}
        >
          <Image source={Images.close} style={styles().closeIcon} />
        </TouchableOpacity>
      </View>
      <Languages />
    </View>
  )
}

const Languages = () => {
  const { t, i18n } = useTranslation()
  return (
    <View style={styles().langsWrapper}>
      <TouchableOpacity
        onPress={() => i18n.changeLanguage('ru')}
        style={[
          styles().langWrapper,
          i18n.language === 'ru' && styles().activeLangWrapper
        ]}
      >
        <Text style={styles().langName}>Русский</Text>
        <Text
          style={[
            styles().langCode,
            i18n.language === 'ru' && styles().activeLangCode
          ]}
        >
          RU
        </Text>
      </TouchableOpacity>
      <View style={styles().separator}></View>
      <TouchableOpacity
        onPress={() => i18n.changeLanguage('ky')}
        style={[
          styles().langWrapper,
          i18n.language === 'ky' && styles().activeLangWrapper
        ]}
      >
        <Text style={styles().langName}>Кыргызча</Text>
        <Text
          style={[
            styles().langCode,
            i18n.language === 'ky' && styles().activeLangCode
          ]}
        >
          KY
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Lang
