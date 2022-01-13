import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'theme'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from 'store/modules/modals/actions'
import ConfirmModal from './confirmModal'
import Lang from './lang'
import BirthDate from './birthDate'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const Modals = ({ navigation }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()
  const modal = useSelector((state) => state.modal.modal)
  const dispatch = useDispatch()
  const modals = {
    confirmModal: {
      name: 'confirmModal',
      height: 160,
      component: <ConfirmModal />
    },
    lang: {
      name: 'lang',
      height: 211,
      component: <Lang />
    },
    birthDate: {
      name: 'birthDate',
      height: responsiveHeight(55),
      component: <BirthDate />
    },
    '': {
      height: 0,
      component: <></>
    }
  }

  return (
    <View>
      <Modal
        backdropTransitionOutTiming={1}
        hideModalContentWhileAnimating
        onBackButtonPress={() => dispatch(setModal({ modal: '' }))}
        onBackdropPress={() => dispatch(setModal({ modal: '' }))}
        isVisible={modal != ''}
      >
        <View style={[styles().modal, { maxHeight: modals[modal].height }]}>
          {modals[modal]?.component ?? <></>}
        </View>
      </Modal>
    </View>
  )
}

export default Modals
