import { useFocusEffect, useRoute } from "@react-navigation/native"
import { HStack, VStack } from "native-base"
import { useCallback, useState } from "react"
import { Share } from "react-native"
import { EmptyMyPoolList } from "../components/EmptyMyPoolList"
import { Guesses } from "../components/Guesses"
import { Header } from "../components/Header"
import { Loading } from "../components/Loading"
import { Option } from "../components/Option"
import { PoolCardPros } from "../components/PoolCard"
import { PoolHeader } from "../components/PoolHeader"
import { useAlertToast } from "../hooks/useAlertToast"
import { onShare } from '../lib/onShare';
import { api } from "../services/api"

interface RouteParams {
  id: string;
}

export const Details = () => {
  const [toast] = useAlertToast()
  const [optionsSelected, setOptionsSelected] = useState<'guesses' | 'ranking'>('guesses')
  const [isLoading, setIsLoading] = useState(true)
  const [poolDetails, setPoolDetails] = useState<PoolCardPros>({} as PoolCardPros)
  const route = useRoute()
  const { id } = route.params as RouteParams

  const fetchPoolById = async () => {
    try {
      setIsLoading(true)
      const repsonse = await api.get(`/pools/${id}`)
      setPoolDetails(repsonse.data.pool)

    } catch (error) {
      console.error(error)
      toast({
        title: 'Ocorreu um erro inesperado!!',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }

  }

  useFocusEffect(useCallback(() => { fetchPoolById() }, [id]))

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (<VStack flex={1} bgColor="gray.900">
    <Header
      title={poolDetails?.title}
      onShare={() => onShare(poolDetails.code)}
      showBackButton
      showShareButton
    />
    {poolDetails._count?.participants > 0 ?
      <VStack px={4} flex={1}>
        <PoolHeader
          data={poolDetails}
        />
        <HStack p={1} bgColor="gray.800" rounded="sm" mb={5}>
          <Option
            title="Seus palpites"
            isSelected={optionsSelected === 'guesses'}
            onPress={() => setOptionsSelected("guesses")}
          />
          <Option
            title="Ranking de grupos"
            isSelected={optionsSelected === 'ranking'}
            onPress={() => setOptionsSelected("ranking")}
          />
        </HStack>

        <Guesses poolId={poolDetails.id} code={poolDetails.code} />
      </VStack> :
      <EmptyMyPoolList code={poolDetails.code} />
    }
  </VStack>
  )
}
