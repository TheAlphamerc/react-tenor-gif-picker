# react-tenor-gif-picker

react-tenor-gif-picker is a React component that allows you to easily add a Tenor GIF picker to your React app.

[![npm](https://img.shields.io/npm/v/react-tenor-gif-picker?color=brightgreen)](https://www.npmjs.com/package/react-tenor-gif-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FTheAlphamerc%2Freact-tenor-gif-picker&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## Live Demo

For live demo [check here](https://thealphamerc.github.io/react-tenor-gif-picker/)
For example app check [Code Sandbox](https://codesandbox.io/s/react-tenor-gif-picker-example-gxpym6?file=/src/App.js)

## Install

```bash
npm install --save react-tenor-gif-picker
```

## Usage

### How to use TenorGifPicker

```tsx
import React, { Component } from 'react'
import 'react-tenor-gif-picker/dist/index.css'
import TenorGifPicker from 'react-tenor-gif-picker'

const App = () => {
  const [active, setActive] = React.useState(false)
  const tenorApiKey = 'TENOR_API_KEY'
  const [Gifs, setGifs] = React.useState([])

  return (
    <div>
      <button
        onClick={() => {
          setActive(true)
        }}
      >
        Show Picker
      </button>
      <TenorGifPicker
        tenorAccessKey={tenorApiKey}
        active={active}
        setActive={setActive}
        initialSearchQuery='Funny'
        onGifSelect={(gifData) => {
          let list = gifData ?? []
          list.push(gifData)
          setGifs(list)
          setActive(false)
        }}
      />
    </div>
  )
}
```

> Before you get started with react-tenor-picker get a free Tenor API key [tenor.com](https://tenor.com/developer/dashboard)

## License

MIT © [thealphamerc](https://github.com/thealphamerc)
