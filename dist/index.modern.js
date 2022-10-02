import React from 'react';
import cx from 'classnames';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var _excluded = ["children", "className", "width", "padding", "active", "setActive"];
function Modal(_ref) {
  var children = _ref.children,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 540 : _ref$width,
      _ref$padding = _ref.padding,
      padding = _ref$padding === void 0 ? true : _ref$padding,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? false : _ref$active,
      _ref$setActive = _ref.setActive,
      setActive = _ref$setActive === void 0 ? function (_e) {} : _ref$setActive,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  return React.createElement("div", Object.assign({
    onClick: function onClick(_e) {
      if (active) {
        setActive(false);
      } else {
        setActive(true);
      }
    },
    onKeyUp: function onKeyUp(e) {
      if (e.key === 'Escape') {
        setActive(false);
      }
    },
    className: cx("Modal", {
      active: active
    })
  }, props), React.createElement(Card, {
    onClick: function onClick(e) {
      if (active) {
        e.stopPropagation();
      }
    },
    padding: padding,
    className: 'overflow-hidden h-full',
    style: {
      maxWidth: width,
      width: '100%'
    }
  }, children));
}

function Card(_ref2) {
  var children = _ref2.children,
      _ref2$padding = _ref2.padding,
      padding = _ref2$padding === void 0 ? true : _ref2$padding,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style,
      _ref2$onClick = _ref2.onClick,
      onClick = _ref2$onClick === void 0 ? function (_) {} : _ref2$onClick;
  return React.createElement("div", {
    onClick: onClick,
    style: style,
    className: cx('Card rounded shadow bg-white mx-auto my-auto', {
      'p-4': padding
    })
  }, children);
}

function SearchBar(_ref) {
  var setQuery = _ref.setQuery,
      query = _ref.query,
      onSearch = _ref.onSearch;

  var searchPhotos = function searchPhotos(e) {
    try {
      e.preventDefault();
      onSearch(query);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return React.createElement("div", null, React.createElement("div", null, React.createElement("form", {
    onSubmit: searchPhotos,
    className: 'flex items-center space-x-2'
  }, React.createElement("input", {
    className: 'placeholder:italic placeholder:theme-text-subtitle-1 w-full border theme-border-default rounded-md py-2 pl-3 pr-3 focus:outline-none focus:theme-border-primary focus:ring-1 sm:text-sm',
    placeholder: 'Search Tenor',
    type: 'text',
    name: 'search',
    value: query,
    onChange: function onChange(e) {
      return setQuery(e.target.value);
    }
  }), React.createElement("button", {
    className: 'bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 ',
    type: 'submit'
  }, "Search"))));
}

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(xmlHttp.responseText);
    }
  };

  xmlHttp.open('GET', theUrl, true);
  xmlHttp.send(null);
}

var SearchGif = function SearchGif(tenorAccessKey, query, page, perPage, whenResult) {
  if (tenorAccessKey === void 0) {
    tenorAccessKey = '';
  }

  if (query === void 0) {
    query = '';
  }

  if (page === void 0) {
    page = '';
  }

  if (perPage === void 0) {
    perPage = 30;
  }

  if (whenResult === void 0) {
    whenResult = function whenResult(_e) {};
  }

  try {
    var lmt = perPage;
    var searchTerm = query;
    var searchUrl;

    if (!query || query.length === 0) {
      searchUrl = 'https://g.tenor.com/v1/trending?key=' + tenorAccessKey + '&limit=' + lmt + '&pos=' + page;
    } else {
      searchUrl = 'https://g.tenor.com/v1/search?q=' + searchTerm + '&key=' + tenorAccessKey + '&limit=' + lmt + '&pos=' + page;
    }

    httpGetAsync(searchUrl, function (response) {
      var json = JSON.parse(response);
      whenResult(json);
    });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

function TenorGifCard(_ref) {
  var photo = _ref.photo,
      _ref$onGifSelect = _ref.onGifSelect,
      onGifSelect = _ref$onGifSelect === void 0 ? function (_) {} : _ref$onGifSelect;
  return React.createElement("div", {
    className: 'group relative h-60 sm:h-44 md:h-32 w-full place-items-center object-cover cursor-pointer border theme-border-default',
    key: photo.id,
    onClick: function onClick() {
      return onGifSelect(photo);
    }
  }, React.createElement("img", {
    className: 'card-img place-items-center w-full object-cover h-full rounded',
    src: photo.media[0].tinygif.url,
    alt: photo.content_description
  }));
}

function TenorGifList(_ref) {
  var _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      _ref$isLoadingMore = _ref.isLoadingMore,
      isLoadingMore = _ref$isLoadingMore === void 0 ? false : _ref$isLoadingMore,
      photoList = _ref.photoList,
      total = _ref.total,
      onGifSelect = _ref.onGifSelect,
      loadMore = _ref.loadMore;
  var listHeight = 'calc(100vh - 125px)';
  var ref = React.useMemo(function () {
    return React.createRef();
  }, []);

  var onScroll = function onScroll() {
    if (ref.current) {
      var _ref$current = ref.current,
          scrollTop = _ref$current.scrollTop,
          scrollHeight = _ref$current.scrollHeight,
          clientHeight = _ref$current.clientHeight;

      if (scrollHeight - (scrollTop + clientHeight) < 20) {
        loadMore();
      }
    }
  };

  if (isLoading) {
    return React.createElement("div", {
      className: 'flex items-center justify-center h-96'
    }, React.createElement(Loader, null));
  }

  return React.createElement("div", {
    className: 'Body'
  }, photoList && photoList.length > 0 && React.createElement("div", {
    className: 'TenorGifList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto p-4',
    style: {
      maxHeight: listHeight
    },
    ref: ref,
    onScroll: onScroll
  }, photoList.map(function (photo) {
    return React.createElement(TenorGifCard, {
      key: photo.id,
      photo: photo,
      onGifSelect: onGifSelect
    });
  })), Array.isArray(photoList) && photoList.length === 0 && total === 0 && React.createElement("div", {
    className: 'flex items-center justify-center h-96'
  }, "No photos found"), isLoadingMore && React.createElement("div", {
    className: 'my-4 flex justify-center'
  }, React.createElement(Loader, null)));
}
function Loader() {
  return React.createElement("svg", {
    className: 'animate-spin -ml-1 mr-3 h-5 w-5 text-blue',
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24'
  }, React.createElement("circle", {
    className: 'opacity-25',
    cx: '12',
    cy: '12',
    r: '10',
    stroke: 'currentColor',
    strokeWidth: '4'
  }), React.createElement("path", {
    className: 'opacity-75',
    fill: 'currentColor',
    d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
  }));
}

function TenorGifPicker(_ref) {
  var _ref$active = _ref.active,
      active = _ref$active === void 0 ? false : _ref$active,
      _ref$initialSearchQue = _ref.initialSearchQuery,
      initialSearchQuery = _ref$initialSearchQue === void 0 ? '' : _ref$initialSearchQue,
      tenorAccessKey = _ref.tenorAccessKey,
      _ref$setActive = _ref.setActive,
      setActive = _ref$setActive === void 0 ? function (_) {} : _ref$setActive,
      _ref$onGifSelect = _ref.onGifSelect,
      _onGifSelect = _ref$onGifSelect === void 0 ? function (_) {} : _ref$onGifSelect;

  if (!active) {
    return null;
  }

  var _React$useState = React.useState([]),
      pics = _React$useState[0],
      setPics = _React$useState[1];

  var _React$useState2 = React.useState(),
      total = _React$useState2[0],
      setTotal = _React$useState2[1];

  var _React$useState3 = React.useState(true),
      hasMore = _React$useState3[0],
      setHasMore = _React$useState3[1];

  var _React$useState4 = React.useState(''),
      query = _React$useState4[0],
      setQuery = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      isLoading = _React$useState5[0],
      setIsLoading = _React$useState5[1];

  var _React$useState6 = React.useState(false),
      isLoadingMore = _React$useState6[0],
      setIsLoadingMore = _React$useState6[1];

  var _React$useState7 = React.useState(''),
      page = _React$useState7[0],
      setPage = _React$useState7[1];

  React.useEffect(function () {
    setQuery(initialSearchQuery);
    fetchGif('', initialSearchQuery);
  }, [initialSearchQuery]);

  var fetchGif = function fetchGif(page, text, reset) {
    if (reset === void 0) {
      reset = false;
    }

    if (isLoading || isLoadingMore || !hasMore) {
      return;
    }

    if (page === '') {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    SearchGif(tenorAccessKey, text, page, 30, function (response) {
      var newPics = response.results;
      setPage(response.next);

      if (response.next === '0' || response.results.length === 0) {
        setHasMore(false);
      } else if (newPics) {
        var mergedPics = newPics;

        if (!reset) {
          mergedPics = [].concat(pics, newPics);
        }

        setPics(mergedPics);
        setTotal(newPics.length);
        setHasMore(true);
      }

      setIsLoadingMore(false);
      setIsLoading(false);
    });
  };

  return React.createElement("div", {
    className: 'TenorGifPicker'
  }, React.createElement(Modal, {
    active: active,
    setActive: setActive,
    width: '640px',
    padding: false,
    className: 'theme-bg-surface'
  }, React.createElement("div", {
    className: 'h-full',
    style: {
      maxHeight: 'inherit'
    }
  }, React.createElement("div", {
    className: 'px-4 pt-4 font-bold text-lg theme-bg-surface'
  }, ' ', "Search Gif"), React.createElement("div", {
    className: 'shadow p-4 theme-bg-surface'
  }, React.createElement("div", {
    className: ''
  }, React.createElement(SearchBar, {
    onSearch: function onSearch(query) {
      setPics([]);
      setHasMore(true);
      fetchGif('', query, true);
    },
    query: query,
    setQuery: setQuery
  }))), React.createElement(TenorGifList, {
    total: total,
    photoList: pics,
    isLoading: isLoading,
    isLoadingMore: isLoadingMore,
    loadMore: function loadMore() {
      fetchGif(page + 1, query);
    },
    onGifSelect: function (gif) {
      try {
        var _temp2 = _catch(function () {
          return Promise.resolve(fetch(gif.media[0].tinygif.url).then(function (r) {
            return r.blob();
          })).then(function (blob) {
            _onGifSelect(_extends({}, gif, {
              blobData: blob
            }));
          });
        }, function (error) {
          console.log(error);
        });

        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }))));
}

export default TenorGifPicker;
//# sourceMappingURL=index.modern.js.map
