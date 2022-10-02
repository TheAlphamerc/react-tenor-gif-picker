import React from 'react'

import 'react-tenor-gif-picker/dist/index.css'
import Photo from './component/photo'
import TenorGifPicker from 'react-tenor-gif-picker'

const App = () => {
  const [active, setActive] = React.useState(false)
  const [photos, setActivePhotos] = React.useState<any[]>([])
  const tenorKey = process.env.REACT_APP_TENOR_KEY

  /// Make group of photos for 3 columns
  const photosGroup = () => {
    const photosGroup = []
    for (let i = 0; i < photos.length; i += 3) {
      photosGroup.push(photos.slice(i, i + 3))
    }
    return photosGroup
  }

  return (
    <div className='App container bg-gray-50'>
      <button
        className='SearchButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => {
          setActive(true)
        }}
      >
        Search Gif
      </button>
      <TenorGifPicker
        tenorAccessKey={tenorKey ?? ''}
        active={active}
        setActive={setActive}
        initialSearchQuery=''
        onGifSelect={(photo: any) => {
          let list = (photos ?? []) as any[]
          list.push(photo)
          setActivePhotos(list)
          setActive(false)
          console.log(photo)
        }}
      />
      <div className='image-gallery'>
        {photosGroup().length > 0 &&
          photosGroup().map((group: any, index) => (
            <div key={index} className={'column'}>
              {group.map((photo: any) => (
                <Photo key={photo.id} photo={photo} />
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default App
