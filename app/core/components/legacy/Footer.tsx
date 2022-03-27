import { Link, Text, VStack } from '@chakra-ui/react'

interface FooterProps {
  dataUrl?: string
}

const Footer = ({
  dataUrl = 'https://github.com/nrgapple/historicborders-timeline-example',
}: FooterProps) => (
  <footer>
    <VStack align={'end'} pos='absolute' right={2} bottom={2} textShadow='2px 2px 4px #252525'>
      <Link href={dataUrl} isExternal>
        Data from here
      </Link>
      <Link
        mt={'0 !important'}
        href='https://github.com/nrgapple/historic-country-borders-app'
        isExternal
      >
        ⭐️ Star this on Github!
      </Link>
    </VStack>
  </footer>
)

export default Footer
