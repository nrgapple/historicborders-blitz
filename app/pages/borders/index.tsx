import { GetServerSideProps } from 'next'
import { Octokit } from '@octokit/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ConfigType, GithubFileInfoType, MapMode } from 'app/core/util/types'
import useKeyPress from 'app/core/hooks/useKeyPress'
import {
  convertYearString,
  getYearFromFile,
  githubToken,
  mapBCFormat,
  mod,
} from 'app/core/util/constants'
import ReactTooltip from 'react-tooltip'
import Timeline from 'app/core/components/legacy/Timeline'
import MapContainer from 'app/core/components/legacy/ViewerMap'
import Footer from 'app/core/components/legacy/Footer'
import Layout from 'app/core/components/legacy/Layout'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Grid,
  useDisclosure,
} from '@chakra-ui/react'
import { MapEventForm } from 'app/map-events/components/MapEventForm'

interface DataProps {
  years: number[]
  user: string
  id: string
  config: ConfigType
  isGlobe: boolean
}

const Viewer = ({ years, user, id, config, isGlobe: isGlobeProp }: DataProps) => {
  const [index, setIndex] = useState(0)
  const [hide, setHide] = useState(false)
  const [help, setHelp] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isGlobe, setIsGlobe] = useState(isGlobeProp)
  const isMobile = typeof window !== 'undefined' ? /Mobi|Android/i.test(navigator.userAgent) : false
  const aPress = useKeyPress('a')
  const dPress = useKeyPress('d')
  const router = useRouter()
  const { isOpen, onToggle } = useDisclosure()

  useEffect(() => {
    setMounted(true)
  }, [])

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
        {mounted && (
          <>
            <ReactTooltip
              resizeHide={false}
              id='fullscreenTip'
              place='left'
              effect='solid'
              globalEventOff={isMobile ? 'click' : undefined}
            >
              {hide ? 'Show Timeline' : 'Hide Timeline'}
            </ReactTooltip>
          </>
        )}
        <Box
          data-tip
          data-for='fullscreenTip'
          data-delay-show='300'
          className='fullscreen'
          onClick={() => setHide(!hide)}
          style={{ top: hide ? '16px' : '95px' }}
        >
          <Box className='noselect'>🔭</Box>
        </Box>
        <Box
          data-tip
          data-for='globeTip'
          data-delay-show='300'
          className='globe'
          onClick={() => {
            setIsGlobe(!isGlobe)
            router.replace({
              //@ts-ignore
              path: '',
              query: { view: !isGlobe ? 'globe' : 'map' },
            })
          }}
          style={{ top: hide ? '73px' : '155px' }}
        >
          <Box className='noselect'>{isGlobe ? '🗺' : '🌎'}</Box>
        </Box>
        <Grid
          templateColumns='100%'
          templateRows={hide ? 'auto' : 'auto 0px'}
          h='full'
          alignItems='stretch'
        >
          {!hide && (
            <>
              <div className='timeline-container'>
                <Timeline globe={isGlobe} index={index} onChange={setIndex} years={years} />
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

export const getServerSideProps: GetServerSideProps<DataProps> = async ({ query, params }) => {
  const user = 'aourednik'
  const id = 'historical-basemaps'
  const isGlobe = query?.view === 'globe' ? true : false
  try {
    const octokit = new Octokit({ auth: githubToken })
    const config: ConfigType = {
      name: 'Historic Borders',
      description: 'example.',
    }
    const fileResp = await octokit.request(`/repos/${user}/${id}/contents/geojson`)
    console.log('fileresp', fileResp)
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
        isGlobe,
      } as DataProps,
    }
  } catch (e) {
    console.log(e)
  }
  return {
    props: {
      isGlobe,
    } as DataProps,
  }
}
