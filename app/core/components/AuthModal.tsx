import {
  Button,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from '@chakra-ui/react'
import LoginForm from 'app/auth/components/LoginForm'
import SignupForm from 'app/auth/components/SignupForm'
import { FaGoogle } from 'react-icons/fa'

export type AuthType = 'signin' | 'signup'

interface Props {
  isOpen: boolean
  toggle: () => void
  type: AuthType
}

export const AuthModal = ({ isOpen, toggle, type }: Props) => {
  const toast = useToast()

  const onSuccess = () => {
    toast({
      status: 'success',
      title: 'Logged In',
      duration: 3000,
      isClosable: true,
    })
    toggle()
  }

  return (
    <Modal isOpen={isOpen} onClose={toggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={'3xl'}>{type === 'signin' ? 'Sign in' : 'Sign up'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack p='5'>
            <Button
              as={'a'}
              href={'/api/auth/google'}
              minW='240px'
              _hover={{ background: '#DB4437', shadow: 'lg' }}
              _active={{ background: '#DB4437' }}
              background={'#DB4437'}
              leftIcon={<FaGoogle />}
            >
              Google
            </Button>
            <Divider pt='2' />
            <Heading size={'md'}>
              Or sign {type === 'signin' ? 'in' : 'up'} with credentials
            </Heading>
            {type === 'signin' ? (
              <LoginForm onSuccess={onSuccess} />
            ) : (
              <SignupForm onSuccess={onSuccess} />
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
