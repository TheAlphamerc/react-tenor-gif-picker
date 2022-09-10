import * as React from 'react'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <div className='text-xl font-bold text-red-500'>{text}</div>
    </div>
  )
}
