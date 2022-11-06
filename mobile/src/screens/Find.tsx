import { useState } from "react"
import { Heading, VStack } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { api } from "../services/api"
import { useAlertToast } from "../hooks/useAlertToast"

export const Find = () => {
  const { navigate } = useNavigation()
  const [isLoading, setIsloading] = useState(false)
  const [code, setCode] = useState('')
  const [toast] = useAlertToast()

  const handleJoinPool = async () => {
    try {
      if (!code.trim()) {
        return toast({
          title: "Informe o código para o bolão!",
          type: "error"
        })
      }
      setIsloading(true)
      await api.post('pools/join', { code })

      navigate('pools')
    } catch (error) {
      console.log(error)
      toast({
        title: error.response?.data?.message || 'Ocorreu um erro inesperado!!',
        type: 'error'
      })
    } finally {
      setCode("")
      setIsloading(false)
    }
  }

  return (<VStack flex={1} bgColor="gray.900">
    <Header title="Buscar por código" showBackButton />

    <VStack mt={8} mx={2} alignItems="center">

      <Heading
        fontFamily="heading"
        color="white"
        fontSize="xl"
        textAlign="center"
        mb={8}
      >
        Encontre um bolão através de seu código único
      </Heading>

      <Input
        mb={2}
        autoCapitalize="characters"
        placeholder="Qual o código do bolão?"
        onChangeText={setCode}
        value={code}
      />
      <Button
        title="BUSCAR BOLÃO"
        type="SECONDARY"
        isLoading={isLoading}
        onPress={handleJoinPool}
      />

    </VStack>
  </VStack>
  )
}