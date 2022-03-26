import { GetServerSideProps } from 'next'
import { Octokit } from '@octokit/core'
import { Suspense, useEffect, useState } from 'react'
import { ConfigType, GithubFileInfoType, MapMode } from 'app/core/util/types'
import useKeyPress from 'app/core/hooks/useKeyPress'
import {
  convertYearString,
  getYearFromFile,
  githubToken,
  mapBCFormat,
  mod,
} from 'app/core/util/constants'
import Timeline from 'app/core/components/legacy/Timeline'
import MapContainer from 'app/core/components/legacy/ViewerMap'
import Footer from 'app/core/components/legacy/Footer'
import Layout from 'app/core/components/legacy/Layout'
import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Grid,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { MapEventForm } from 'app/map-events/components/MapEventForm'
import { UserMenu } from 'app/core/components/UserMenu'

interface DataProps {
  years: number[]
  user: string
  id: string
  config: ConfigType
}

const Viewer = ({ years, user, id, config }: DataProps) => {
  const [index, setIndex] = useState(0)
  const [hide, setHide] = useState(false)
  const aPress = useKeyPress('a')
  const dPress = useKeyPress('d')
  const { isOpen, onToggle } = useDisclosure()

  useEffect(() => {
    if (dPress) {
      setIndex(mod(index + 1, years.length))
    }
  }, [dPress])

  useEffect(() => {
    if (aPress) {
      setIndex(mod(index - 1, years.length))
    }
  }, [aPress])

  if (!(years && user && id && config)) return <Box>Not a valid timeline. Check your url.</Box>

  return (
    <>
      <Layout title={config.name} url={`https://historyborders.app`}>
        <Drawer isOpen={isOpen} onClose={onToggle}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <MapEventForm />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Tooltip placement='left' hasArrow label={hide ? 'Show Timeline' : 'Hide Timeline'}>
          <Center
            onClick={() => setHide(!hide)}
            pos='absolute'
            top={hide ? '16px' : '95px'}
            right='15px'
            h='40px'
            w='40px'
            zIndex={1000}
          >
            <Box fontSize={'35px'} textShadow='2px 2px 4px #252525' cursor={'pointer'}>
              🔭
            </Box>
          </Center>
        </Tooltip>
        <Center
          pos='absolute'
          top={hide ? '73px' : '155px'}
          right='15px'
          h='40px'
          w='40px'
          zIndex={1000}
        >
          <Suspense fallback={false}>
            <UserMenu />
          </Suspense>
        </Center>
        <Grid
          templateColumns='100%'
          templateRows={hide ? 'auto' : 'auto 0px'}
          h='full'
          alignItems='stretch'
        >
          {!hide && (
            <>
              <div className='timeline-container'>
                <Timeline index={index} onChange={setIndex} years={years} />
              </div>
            </>
          )}
          <MapContainer
            year={convertYearString(mapBCFormat, years[index]!)}
            fullscreen={hide}
            user={user}
            id={id}
            mode={MapMode.VIEW}
          />
          {!hide && <Footer dataUrl={`https://github.com/aourednik/historical-basemaps`} />}
        </Grid>
      </Layout>
    </>
  )
}

export default Viewer

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  const user = 'aourednik'
  const id = 'historical-basemaps'
  try {
    const octokit = new Octokit({ auth: githubToken })
    const config: ConfigType = {
      name: 'Historic Borders',
      description: 'example.',
    }
    const fileResp = await octokit.request(`/repos/${user}/${id}/contents/geojson`)
    const files: GithubFileInfoType[] = fileResp.data
    const years = files
      .filter(x => x.name.endsWith('.geojson'))
      .map(x => getYearFromFile(x.name))
      .sort((a, b) => a - b)
      .filter(x => !isNaN(x))
    return {
      props: {
        years,
        user: user,
        id: id,
        config,
      } as DataProps,
    }
  } catch (e) {
    console.log(e)
  }
  return {
    props: {} as DataProps,
  }
}
