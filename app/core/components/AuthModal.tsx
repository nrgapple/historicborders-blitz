import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  toggle: () => void
  title: string
}

export const AuthModal = ({ isOpen, toggle, title }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={toggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Button>Google</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
