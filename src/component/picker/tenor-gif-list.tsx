import React from 'react'
import TenorGifCard from './tenor-gif-card'
// import UnsplashPhotoCard from "./unsplash-photo-card";

interface Props {
  isLoading?: boolean
  isLoadingMore?: boolean
  photoList: Array<any>
  total?: number | undefined
  onGifSelect: (photo: any) => void
  loadMore: () => void
}
export default function TenorGifList({
  isLoading = false,
  isLoadingMore = false,
  photoList,
  total,
  onGifSelect,
  loadMore
}: Props) {
  const listHeight = 'calc(100vh - 125px)'
  const ref = React.useMemo(() => React.createRef<HTMLDivElement>(), [])

  const onScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current
      if (scrollHeight - (scrollTop + clientHeight) < 20) {
        // Contributors list lazy loading you're at the bottom of the page
        // do this when we reach end
        loadMore()
      }
    }
  }
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-96'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='Body'>
      {photoList && photoList.length > 0 && (
        <div
          className='TenorGifList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto p-4'
          style={{ maxHeight: listHeight }}
          ref={ref}
          onScroll={onScroll}
        >
          {photoList.map((photo: any) => {
            return (
              <TenorGifCard
                key={photo.id}
                photo={photo}
                onGifSelect={onGifSelect}
              />
            )
          })}
        </div>
      )}

      {Array.isArray(photoList) && photoList.length === 0 && total === 0 && (
        <div className='flex items-center justify-center h-96'>
          No photos found
        </div>
      )}

      {isLoadingMore && (
        <div className='my-4 flex justify-center'>
          <Loader />
        </div>
      )}
    </div>
  )
}
export function Loader() {
  return (
    <svg
      className='animate-spin -ml-1 mr-3 h-5 w-5 text-blue'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  )
}
