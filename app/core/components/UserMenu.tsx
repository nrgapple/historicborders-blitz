import {
  Avatar,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useMutation } from 'blitz'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { AuthModal, AuthType } from './AuthModal'
import logout from 'app/auth/mutations/logout'
import { useState } from 'react'

export const UserMenu = () => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const { isOpen, onToggle } = useDisclosure()
  const [authType, setAuthType] = useState<AuthType>()

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
          <MenuButton>Join</MenuButton>
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
                onClick={async () => {
                  await logoutMutation()
                }}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => handleAuth('signin')}>Sign in</MenuItem>
              <MenuItem onClick={() => handleAuth('signup')}>Sign up</MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
      <AuthModal isOpen={isOpen} toggle={onToggle} type={authType} />
    </>
  )
}
