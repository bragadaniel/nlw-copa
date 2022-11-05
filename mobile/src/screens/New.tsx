import { Heading, Text, VStack } from "native-base"
import { Header } from "../components/Header"
import Logo from '../assets/logo.svg'
import { Input } from "../components/Input"
import { Button } from "../components/Button"

export const New = () => {

  return (<VStack flex={1} bgColor="gray.900">
    <Header title="Criar novo bolão" />

    <VStack mt={8} mx={2} alignItems="center">
      <Logo />
      <Heading
        fontFamily="heading"
        color="white"
        fontSize="xl"
        textAlign="center"
        my={8}
      >
        Crie seu próprio bolão da copa e compartilhe entre amigos!
      </Heading>

      <Input
        placeholder="Qual nome do seu bolão?"
        mb={2}
      />
      <Button title="CRIAR MEU BOLÃO" type="SECONDARY" />

      <Text color="gray.200" fontSize="sm" textAlign="center" mt={4} px={10}>
        Após criar seu bolão, você receberá um código único
        que poderá usar para convidar outras pessoas.
      </Text>
    </VStack>
  </VStack>
  )
}