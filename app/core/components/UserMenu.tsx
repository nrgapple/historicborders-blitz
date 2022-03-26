import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from 'blitz'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { AuthModal } from './AuthModal'
import logout from 'app/auth/mutations/logout'

export const UserMenu = () => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Menu>
        <MenuButton as={Avatar} size='sm' />
        <MenuList>
          {user ? (
            <>
              <MenuItem>
                <Box>
                  <Text fontSize={'lg'}>{user.name}</Text>
                </Box>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                fontSize={'md'}
                onClick={async () => {
                  await logoutMutation()
                }}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={onToggle} fontSize={'lg'}>
                Sign in
              </MenuItem>
              <MenuItem onClick={onToggle} fontSize={'lg'}>
                Sign up
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
      <AuthModal isOpen={isOpen} toggle={onToggle} title='Sign in' />
    </>
  )
}
