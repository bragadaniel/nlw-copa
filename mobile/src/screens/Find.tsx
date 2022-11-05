import { Heading, VStack } from "native-base"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

export const Find = () => {

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
        placeholder="Qual o código do bolão?"
        mb={2}
      />
      <Button title="BUSCAR BOLÃO" type="SECONDARY" />

    </VStack>
  </VStack>
  )
}