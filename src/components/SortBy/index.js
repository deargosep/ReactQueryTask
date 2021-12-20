import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@theme'
import { useDispatch, useSelector } from 'react-redux'
import { getSort } from '@store/selectors/sort'
import { setSort } from '@store/modules/sort/actions'

const SortBy = ({ sort, setSort }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()
  const dispatch = useDispatch()
  return (
    <TouchableOpacity
      onPress={() => setSort(sort === 'alphabet' ? 'distance' : 'alphabet')}
      style={styles().sortWrapper}
    >
      <Text style={styles().text}>
        Сортировать по {sort === 'alphabet' ? 'алфавиту' : 'расстоянию'}
      </Text>
      <Image style={styles().filterIcon} source={Images.filters} />
    </TouchableOpacity>
  )
}

export default SortBy
