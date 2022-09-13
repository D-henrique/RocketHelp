import { useState } from 'react'
import auth from '@react-native-firebase/auth'
import {
  Heading,
  HStack,
  IconButton,
  VStack,
  Icon,
  useTheme,
  Box
} from 'native-base'
import { CaretLeft, Envelope, Key } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

import Logo from '../assets/logo_primary.svg'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from 'react-native'

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const { colors } = useTheme()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp() {
    if (!email || !password) {
      return Alert.alert('Cadastrar', 'Informe e-mail e senha.')
    }

    setIsLoading(true)

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Cadastro', 'Cadastro realizado com sucesso.')
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Cadastrar', 'E-mail inválido.')
        }

        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert('Cadastrar', 'E-mail já cadastrado.')
        }

        return Alert.alert(
          'Cadastrar',
          'Não foi possível cadastrar novo usuário'
        )
      })
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <Box>
        <HStack
          w="full"
          justifyContent="space-between"
          alignItems="center"
          bg="gray.600"
          pt={16}
          pb={3}
          px={6}
        >
          <IconButton
            icon={<CaretLeft color={colors.gray[200]} size={24} />}
            onPress={handleGoBack}
          />
        </HStack>
      </Box>
      <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={6}>
        <Logo />

        <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
          Cadastre um novo usuário
        </Heading>

        <Input
          placeholder="E-mail"
          mb={4}
          InputLeftElement={
            <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
          }
          onChangeText={setEmail}
        />
        <Input
          placeholder="Senha"
          mb={8}
          InputLeftElement={
            <Icon as={<Key color={colors.gray[300]} />} ml={4} />
          }
          secureTextEntry
          onChangeText={setPassword}
        />

        <Button
          title="Cadastrar"
          w="full"
          onPress={handleSignUp}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}
