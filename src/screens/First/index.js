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
import {
  setMoreClinics as getMoreClinics,
  useGetClinics
} from '@api/http/clinics'

const First = () => {
  const { t, i18n } = useTranslation()
  const { Images } = useTheme()

  const [sort, setSort] = React.useState('alphabet')

  const queryClient = useQueryClient()

  const clinics = useGetClinics({ sortBy: sort })
  const { data } = clinics

  // const mutation = useMutation(getMoreClinics, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries('clinics')
  //   }
  // })
  // const setMoreClinics = () => {
  // mutation.mutate({

  // })
  // }

  const testQuery = (page) => {
    return clinics.refetch({ refetchPage: 1 })
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
            refreshing={clinics.isLoading || clinics.isFetchingNextPage}
            onRefresh={() => clinics.refetch()}
          />
        }
        refreshing={clinics.isLoading}
        data={data?.pages ?? []}
        extraData={data?.pages}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          clinics.fetchNextPage()
          console.log(data?.pages)
        }}
        renderItem={({ item }) => {
          return (
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={item.medicalInstitutions}
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
          )
        }}
      />
    </Wrapper>
  )
}

export default First
