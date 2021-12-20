import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@theme'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '@store/modules/modals/actions'
import { getModal } from '@store/selectors/modal'

const ConfirmModal = ({ navigation }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()
  const dispatch = useDispatch()
  const modal = useSelector(getModal)

  return (
    <View style={styles().page}>
      <Text style={styles().title}>{modal?.modalTitle}</Text>
      <View style={styles().buttonWrapper}>
        <Button
          onPress={() => {
            dispatch(
              setModal({
                modal: ''
              })
            )
          }}
          uppercase={false}
          style={[styles().button, styles().buttonColored]}
        >
          <Text style={[styles().buttonText, styles().buttonTextColored]}>
            {t('no')}
          </Text>
        </Button>
        <Button
          onPress={() => {
            modal.modalAction()
          }}
          uppercase={false}
          style={styles().button}
        >
          <Text style={styles().buttonText}>{t('yes')}</Text>
        </Button>
      </View>
    </View>
  )
}

export default ConfirmModal
