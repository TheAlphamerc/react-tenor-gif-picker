import React from 'react'

export default function Photo({ photo }: any) {
  return (
    <img
      className='image-item place-items-center w-full object-cover  rounded'
      src={photo.media[0].tinygif.url}
      alt={photo.content_description}
    />
  )
}
