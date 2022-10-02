import React from 'react'
import Modal from '../model'
import SearchBar from './search-bar'

import SearchGif from './tenor-api'
import TenorGifList from './tenor-gif-list'
interface Props {
  active?: boolean
  tenorAccessKey: string
  initialSearchQuery: string
  setActive?: (active: boolean) => void
  onGifSelect?: (photo: any) => void
}

/**
 * @description TenorGifPicker is a component that allows you to search for gifs from tenor.com
 * @param {string} initialSearchQuery - The initial search query.
 * @param {string} tenorAccessKey - The tenor access key.
 * @param {boolean} active - Whether the GIF picker is active.
 * @param {function} setActive - Function to set the GIF picker active.
 * @param {function} onGifSelect - Function to call when a GIF is selected.
 */
export default function TenorGifPicker({
  active = false,
  initialSearchQuery = '',
  tenorAccessKey,
  setActive = (_: boolean) => {},
  onGifSelect = (_: any) => {}
}: Props) {
  if (!active) {
    return null
  }

  const [pics, setPics] = React.useState<any[]>([])
  const [total, setTotal] = React.useState<number | undefined>()
  const [hasMore, setHasMore] = React.useState<boolean>(true)
  const [query, setQuery] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const [page, setPage] = React.useState('')
  // const [convertingToBlob, setConvertingToBlob] = React.useState(false)

  React.useEffect(() => {
    setQuery(initialSearchQuery)
    fetchGif('', initialSearchQuery)
  }, [initialSearchQuery])

  const fetchGif = (page: string, text: string, reset = false) => {
    if (isLoading || isLoadingMore || !hasMore) {
      return
    }
    if (page === '') {
      setIsLoading(true)
    } else {
      setIsLoadingMore(true)
    }
    SearchGif(tenorAccessKey, text, page, 30, (response) => {
      //   setPics(result.results);
      const newPics = response.results
      setPage(response.next)
      if (response.next === '0' || response.results.length === 0) {
        setHasMore(false)
      } else if (newPics) {
        let mergedPics = newPics
        if (!reset) {
          mergedPics = [...pics, ...newPics]
        }
        setPics(mergedPics)
        setTotal(newPics.length)
        setHasMore(true)
      }
      setIsLoadingMore(false)
      setIsLoading(false)
    })
  }

  return (
    <div className='TenorGifPicker'>
      <Modal
        active={active}
        setActive={setActive}
        width='640px'
        padding={false}
        className='theme-bg-surface'
      >
        <div className='h-full' style={{ maxHeight: 'inherit' }}>
          <div className='px-4 pt-4 font-bold text-lg theme-bg-surface'>
            {' '}
            Search Gif
          </div>
          <div className='shadow p-4 theme-bg-surface'>
            <div className=''>
              <SearchBar
                onSearch={(query: string) => {
                  setPics([])
                  setHasMore(true)
                  fetchGif('', query, true)
                }}
                query={query}
                setQuery={setQuery}
              />
            </div>
          </div>

          <TenorGifList
            total={total}
            photoList={pics}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            loadMore={() => {
              fetchGif(page + 1, query)
            }}
            onGifSelect={async (gif: any) => {
              try {
                // setConvertingToBlob(true)
                const blob = await fetch(gif.media[0].tinygif.url).then((r) =>
                  r.blob()
                )
                // let image = await URL.createObjectURL(blob);
                // setConvertingToBlob(false)
                onGifSelect({
                  ...gif,
                  blobData: blob
                })
              } catch (error) {
                console.log(error)
                // setConvertingToBlob(false)
              }
            }}
          />
        </div>
        {/* {isLoading ||
          (convertingToBlob && (
            <div className='absolute top-0 bottom-0 left-0 right-0'>
              <div className='flex items-center place-content-center h-full bg-slate-600/70 '>
                <div className='opacity-100'>
                  <Loader />
                </div>
              </div>
            </div>
          ))} */}
      </Modal>
    </div>
  )
}
