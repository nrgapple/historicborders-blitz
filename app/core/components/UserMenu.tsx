import { Avatar, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { AuthModal } from './AuthModal'

export const UserMenu = () => {
  const user = useCurrentUser()
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Menu>
        <MenuButton as={Avatar} size='sm' />
        <MenuList>
          {user ? (
            <MenuItem>{user.name}</MenuItem>
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
