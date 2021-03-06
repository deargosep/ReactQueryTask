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
import { useTheme } from 'theme'
import ButtonMD from 'components/Button'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import Loading from 'components/Loading'
import Wrapper from 'components/Wrapper'
import SortBy from 'components/SortBy'
import axios from 'api'
import { Card } from 'react-native-paper'
import { useGetClinics } from 'store/modules/clinics'
import { useQueryGet } from 'store/hooks'

const First = () => {
  const { t, i18n } = useTranslation()
  const { Images } = useTheme()

  const [sort, setSort] = React.useState('alphabet')

  const clinics = useQueryGet('clinics', { sortBy: sort })
  const { data } = clinics

  const initQuery = () => {
    return clinics.refetch({ refetchPage: 1 })
  }

  React.useEffect(() => {
    initQuery()
  }, [sort])

  return (
    <Wrapper otherStyles={styles().page}>
      <SortBy sort={sort} setSort={setSort} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={clinics.isLoading || clinics.isFetchingNextPage}
            onRefresh={() => clinics.refetch()}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        refreshing={clinics.isLoading}
        data={data?.pages ?? []}
        extraData={data?.pages}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          clinics.fetchNextPage()
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
