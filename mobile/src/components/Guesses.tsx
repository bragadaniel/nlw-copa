import { useState, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native"
import { FlatList } from 'native-base';
import { useAlertToast } from '../hooks/useAlertToast';
import { api } from '../services/api';
import { Game, GameProps } from '../components/Game'
import { Loading } from "../components/Loading"
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { onShare } from '../lib/onShare';

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [toast] = useAlertToast()
  const [isLoading, setIsLoading] = useState<true | false>(true)
  const [isLoadingGuess, setIsLoadingGuess] = useState<true | false>(false)
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')
  const [games, setGames] = useState<GameProps[]>([])

  const fetchGames = async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`pools/${poolId}/games`)
      setGames(response.data.games)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Não foi possível carregar os jogos!!',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuessConfirm = async (gameId: string) => {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.toString()) {
        return toast({
          title: 'Informe o placar do jogo!!!',
          type: 'error'
        })
      }
      setIsLoadingGuess(true)
      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })
      toast({
        title: 'Palpite realizado com sucesso!',
        type: 'success'
      })
      fetchGames()
    } catch (error) {
      toast({
        title: error.response?.data?.message || 'Não foi possível enviar o palpite!!',
        type: 'error'
      })
      throw error
    } finally {
      setIsLoadingGuess(false)
    }
  }

  useFocusEffect(useCallback(() => { fetchGames() }, [poolId]))

  if (isLoading) {
    return (
      <Loading />
    )
  }
  return (
    <FlatList
      data={games}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setSecondTeamPoints={setSecondTeamPoints}
          setFirstTeamPoints={setFirstTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
          isLoading={isLoadingGuess}
        />
      )}
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{ pb: 24 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} onShare={() => onShare(code)} />}
    />
  );
}
