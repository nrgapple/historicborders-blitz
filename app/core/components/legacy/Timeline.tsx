import { convertYearString, timelineBCFormat } from 'app/core/util/constants'
import hexToRgba from 'hex-rgba'
import React from 'react'
//@ts-ignore
import HorizontalTimeline from 'react-horizontal-timeline'

interface TimelineProps {
  index: number
  onChange: (value: number) => void
  years: number[]
}

const Timeline = ({ index, onChange, years }: TimelineProps) => (
  <div className='timeline'>
    <div
      style={{
        width: '100%',
        fontSize: '14px',
        color: '#64dfdf',
        textShadow: `0px 0px 4px '#6930c3'`,
      }}
      className='timeline'
    >
      <HorizontalTimeline
        styles={{
          background: '#64dfdf',
          foreground: '#64dfdf',
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
        minEventPadding={-20}
        maxEventPadding={3}
      />
    </div>
  </div>
)

export default Timeline
