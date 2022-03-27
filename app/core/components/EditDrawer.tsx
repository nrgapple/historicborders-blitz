import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MapEventForm } from 'app/map-events/components/MapEventForm'

interface Props {
  isOpen: boolean
  onToggle: () => void
}

export const EditDrawer = ({ isOpen, onToggle }: Props) => {
  const placement = useBreakpointValue<'right' | 'bottom'>({ base: 'bottom', md: 'right' })

  return (
    <Drawer isOpen={isOpen} onClose={onToggle} placement={placement}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add a Point</DrawerHeader>
        <DrawerBody>
          <MapEventForm />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
