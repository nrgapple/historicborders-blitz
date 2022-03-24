import React, { useRef, useState } from 'react'
import { GeoJSONLayer } from 'react-mapbox-gl'
import MapboxGl, { Control } from 'mapbox-gl'
import Map from '../util/ReactMapBoxGl'
import DrawControl from 'react-mapbox-gl-draw'

import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import useEditorMap from '../hooks/useEditorMap'
import { Box } from '@chakra-ui/react'

const MapContainer = () => {
  const [data] = useEditorMap()
  const [zoomValue, setZoomValue] = useState(2)
  const mapRef = useRef<MapboxGl.Map | undefined>(undefined)

  return (
    <Box h='100%' w='100%'>
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
      >
        {data && (
          <>
            <GeoJSONLayer
              data={data.borders}
              fillPaint={{
                'fill-color': ['get', 'COLOR'],
                'fill-opacity': 0.5,
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
                    [12, 12],
                    [16, 16],
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
        <DrawControl
          controls={{
            point: false,
            polygon: true,
            trash: true,
            line_string: false,
            combine_features: false,
            uncombine_features: false,
          }}
          onDrawCreate={event => {
            console.log({ event })
          }}
          onDrawUpdate={update => {
            console.log({ update })
          }}
        />
      </Map>
    </Box>
  )
}

export default MapContainer
