import {
  Avatar,
  Center,
  Heading,
  Icon,
  IconButton,
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
import { FiEdit, FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi'
import { EditDrawer } from './EditDrawer'
import { HamburgerIcon } from '@chakra-ui/icons'

export const UserMenu = () => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const { isOpen, onToggle } = useDisclosure()
  const { isOpen: isDrawerOpen, onToggle: onToggleDrawer } = useDisclosure()
  const [authType, setAuthType] = useState<AuthType>('signin')

  const handleAuth = (_authType: AuthType) => {
    setAuthType(_authType)
    onToggle()
  }

  return (
    <>
      <Menu autoSelect={false}>
        {user ? (
          <MenuButton>
            <Avatar size={'sm'} name={user.name ?? user.email} src={user.image ?? ''} />
          </MenuButton>
        ) : (
          <MenuButton as={IconButton} icon={<HamburgerIcon />} background='transparent' />
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
              <MenuItem onClick={onToggleDrawer} icon={<Icon as={FiEdit} />}>
                Edit
              </MenuItem>
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
      <EditDrawer isOpen={isDrawerOpen} onToggle={onToggleDrawer} />
    </>
  )
}
