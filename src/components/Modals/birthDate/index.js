import React, { useState } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@theme'
import Calendar from '@components/Calendar'
import ButtonMD from '@components/Button'
import { useDispatch, useSelector } from 'react-redux'
import Spacer from '@components/Spacer'
import { setModal } from '@store/modules/modals/actions'

const BirthDate = ({ navigation }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()
  const modal = useSelector((state) => state.modal)
  const dispatch = useDispatch()

  const [currentPickedDay, setCurrentPickedDay] = useState(null)
  const [disabledButton, setDisabledButton] = useState(true)

  const today = new Date()
  const [selectYear, setSelectYear] = useState(today.getFullYear())
  const [selectMonth, setSelectMonth] = useState(today.getMonth())

  return (
    <View style={styles().page}>
      <Calendar
        pickReception={false}
        currentPickedDay={currentPickedDay}
        setCurrentPickedDay={setCurrentPickedDay}
        disabledButton={disabledButton}
        setDisabledButton={setDisabledButton}
        selectYear={selectYear}
        setSelectYear={setSelectYear}
        selectMonth={selectMonth}
        setSelectMonth={setSelectMonth}
        today={today}
      />
      <Spacer size={10} />
      <ButtonMD
        text={t('modals.birthDate')}
        handlePress={() => {
          modal.modalAction(currentPickedDay.fullDate)
          dispatch(setModal({ modal: '' }))
        }}
        disabled={disabledButton}
      />
    </View>
  )
}

export default BirthDate
