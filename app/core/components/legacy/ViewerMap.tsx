import { GeoJSONLayer, Popup } from 'react-mapbox-gl'
import MapboxGl from 'mapbox-gl'
import Map from '../../util/ReactMapBoxGl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { useData } from 'app/core/hooks/useData'
import { useWikiData } from 'app/core/hooks/useWiki'
import { MapMode } from 'app/core/util/types'
import { Box, Text, VStack } from '@chakra-ui/react'
interface MapContainerProps {
  year: string
  user: string
  id: string
  fullscreen?: boolean
  mode: MapMode
}

const MapContainer = ({ year, fullscreen, user, id, mode }: MapContainerProps) => {
  const [, data] = useData(year, user, id)
  const [zoomValue, setZoomValue] = useState(2)
  const mapRef = useRef<MapboxGl.Map | undefined>(undefined)
  const parentRef = useRef<HTMLDivElement>(null)
  const [selectedPlace, setSelectedPlace] = useState('')
  const [popupPos, setPopupPos] = useState([0, 0])
  const wikiInfo = useWikiData(selectedPlace)

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize()
    }
  }, [fullscreen])

  return (
    <Box ref={parentRef}>
      <Map
        className='map'
        zoom={[zoomValue]}
        style='mapbox://styles/nrgapple/ckk7nff4z0jzj17pitiuejlvt'
        onStyleLoad={(map: MapboxGl.Map) => {
          mapRef.current = map
          map.resize()
        }}
        onZoomEnd={map => {
          setZoomValue(map.getZoom())
        }}
        onClick={e => setSelectedPlace('')}
      >
        {data && (
          <>
            {selectedPlace && (
              <Popup
                style={{
                  width: '250px',
                  height: '250px',
                }}
                coordinates={popupPos}
              >
                <VStack h='100%' w='100%' maxH='250px' overflowY='scroll'>
                  <Text>{wikiInfo}</Text>
                </VStack>
              </Popup>
            )}
            <GeoJSONLayer
              data={data.borders}
              fillPaint={{
                'fill-color': ['get', 'COLOR'],
                'fill-opacity': 0.5,
              }}
              fillOnClick={(e: any) => {
                console.log(e)
                setSelectedPlace(e.features[0]?.properties.NAME)
                setPopupPos(curr => [...(Object.values(e.lngLat) as any)])
              }}
            />
            <GeoJSONLayer
              data={data.labels}
              symbolLayout={{
                'text-field': '{NAME}',
                'text-font': ['Lato Bold'],
                'text-size': {
                  base: 1,
                  stops: [
                    [4, 7],
                    [8, 18],
                  ],
                },
                'text-padding': 3,
                'text-letter-spacing': 0.1,
                'text-max-width': 7,
                'text-transform': 'uppercase',
              }}
            />
          </>
        )}
      </Map>
    </Box>
  )
}

export default MapContainer
