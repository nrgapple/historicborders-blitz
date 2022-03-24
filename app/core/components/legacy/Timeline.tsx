import { Box } from '@chakra-ui/react'
import { convertYearString, timelineBCFormat } from 'app/core/util/constants'
import hexToRgba from 'hex-rgba'
import React from 'react'
//@ts-ignore
import HorizontalTimeline from 'react-horizontal-timeline'

interface TimelineProps {
  index: number
  onChange: (value: number) => void
  years: number[]
  globe?: boolean
}

const Timeline = ({ index, onChange, years, globe }: TimelineProps) => (
  <Box color='black' textShadow='0px 0px 2px #6930c3' fontWeight='500' h='70px !important'>
    <Box
      textShadow='0px 0px 4px #64dfdf'
      fontSize='14px'
      h='70px !important'
      w='full'
      color='#6930c3'
      height='70px !important'
      fontWeight='500'
      className='timeline'
    >
      <HorizontalTimeline
        styles={{
          background: `${!globe ? '#6930c3' : '#64dfdf'}`,
          foreground: `${!globe ? '#6930c3' : '#64dfdf'}`,
          outline: hexToRgba('#000', 1),
        }}
        index={index}
        indexClick={(newIndex: number) => {
          onChange(newIndex)
        }}
        getLabel={(date: any) =>
          convertYearString(timelineBCFormat, date < 100 ? date : new Date(date, 0).getFullYear())
        }
        values={years}
        linePadding={50}
        isOpenEnding={false}
        isOpenBeginning={false}
        minEventPadding={-10}
        maxEventPadding={3}
      />
    </Box>
  </Box>
)

export default Timeline
