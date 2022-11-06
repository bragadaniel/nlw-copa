import { useState, useCallback } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { VStack, Icon, FlatList } from "native-base"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { Octicons } from '@expo/vector-icons'
import { api } from "../services/api"
import { useAlertToast } from "../hooks/useAlertToast"
import { PoolCard, PoolCardPros } from "../components/PoolCard"
import { Loading } from "../components/Loading"
import { EmptyPoolList } from "../components/EmptyPoolList"

export const Pools = () => {
  const [isLoading, setIsloading] = useState(true)
  const [pools, setPools] = useState<PoolCardPros[]>([])
  const { navigate } = useNavigation()
  const [toast] = useAlertToast()

  const fetchPools = async () => {
    try {
      setIsloading(true)
      const response = await api.get('/pools')
      setPools(response.data.pools)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Ocorreu um erro inesperado!!',
        type: 'error'
      })
    } finally {
      setIsloading(false)
    }
  }

  useFocusEffect(useCallback(() => { fetchPools() }, []))

  return <VStack flex={1} bgColor="gray.900">
    <Header title="Meus bolões" />
    <VStack mt={6} mb={4} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4}>
      <Button
        type="SECONDARY"
        leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
        title="BUSCAR BOLÃO POR CÓDIGO"
        onPress={() => navigate('find')}
      />
    </VStack>
    {isLoading ? <Loading /> :
      <FlatList
        data={pools}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <PoolCard
            data={item}
            onPress={() => navigate('details', { id: item.id })}
          />
        )}
        px={5}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ pb: 24 }}
        ListEmptyComponent={EmptyPoolList}
      />}
  </VStack>
}