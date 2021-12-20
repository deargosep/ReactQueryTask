import React from 'react'
import {
  Text,
  SafeAreaView,
  View,
  Button,
  Image,
  FlatList,
  RefreshControl
} from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@theme'
import ButtonMD from '@components/Button'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import Loading from '@components/Loading'
import Wrapper from '@components/Wrapper'
import SortBy from '@components/SortBy'
import axios from '@api'
import { Card } from 'react-native-paper'
import { _getClinics } from '@api/http/clinics'

const First = () => {
  const { t, i18n } = useTranslation()
  const { Images } = useTheme()

  const [sort, setSort] = React.useState('alphabet')

  const medicalInstitutions = useQuery(sort, _getClinics)

  // Mutations
  // const mutation = useMutation(postTodo, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries('todos')
  //   }
  // })

  const testQuery = () => {
    medicalInstitutions.refetch().then(({ data }) => {
      console.log('Refetched: ', data)
    })
  }
  React.useEffect(() => {
    testQuery()
  }, [sort])

  return (
    <Wrapper otherStyles={styles().page}>
      {/* <Text style={styles().text}>App template</Text> */}
      {/* <Text style={styles().subText}>
        {t('helloUser', { name: 'DarkKnight' })}
      </Text>
      <Button
        title="Сменить язык"
        onPress={() =>
          i18n.changeLanguage(i18n.language !== 'ru' ? 'ru' : 'en')
        }
      /> */}
      <ButtonMD text="RQuery" handlePress={testQuery} />
      <SortBy sort={sort} setSort={setSort} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={medicalInstitutions.isLoading}
            onRefresh={testQuery}
          />
        }
        extraData={medicalInstitutions}
        refreshing={medicalInstitutions.isLoading}
        data={medicalInstitutions?.data?.data.medicalInstitutions ?? []}
        renderItem={({ item }) => {
          return (
            <Card style={styles().card} elevation={3}>
              <Card.Title
                subtitle={'Дистанция: ' + item.distance}
                title={item.title}
              />
            </Card>
          )
        }}
      />
    </Wrapper>
  )
}

export default First
