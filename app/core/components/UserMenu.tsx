import {
  Avatar,
  Center,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from 'blitz'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { AuthModal, AuthType } from '../../auth/components/AuthModal'
import logout from 'app/auth/mutations/logout'
import { useState } from 'react'
import { FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi'

export const UserMenu = () => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const { isOpen, onToggle } = useDisclosure()
  const [authType, setAuthType] = useState<AuthType>('signin')

  const handleAuth = (_authType: AuthType) => {
    setAuthType(_authType)
    onToggle()
  }

  return (
    <>
      <Menu autoSelect={false}>
        {user ? (
          <MenuButton userSelect={'none'}>
            <Avatar size={'sm'} name={user.name ?? user.email} src={user.image ?? ''} />
          </MenuButton>
        ) : (
          <MenuButton userSelect={'none'}>Join</MenuButton>
        )}
        <MenuList>
          {user ? (
            <>
              <MenuGroup>
                <Center>
                  <Avatar name={user.name ?? user.email} src={user.image ?? ''} />
                </Center>
                <Center>
                  <Text>{user.name}</Text>
                </Center>
              </MenuGroup>
              <MenuDivider />
              <MenuItem
                icon={<Icon as={FiLogOut} />}
                onClick={async () => {
                  await logoutMutation()
                }}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuGroup>
                <VStack p='4'>
                  <Heading size={'md'}>Historic Borders</Heading>
                  <Text color={'gray'} fontSize={'sm'}>
                    History through a telescope
                  </Text>
                </VStack>
              </MenuGroup>
              <MenuDivider />
              <MenuItem icon={<Icon as={FiLogIn} />} onClick={() => handleAuth('signin')}>
                Sign in
              </MenuItem>
              <MenuItem icon={<Icon as={FiUserPlus} />} onClick={() => handleAuth('signup')}>
                Sign up
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
      <AuthModal isOpen={isOpen} toggle={onToggle} type={authType} />
    </>
  )
}
