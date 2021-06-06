import React   from 'react'
import styled  from 'styled-components'

const Symbol = styled.span`
  ${props => props._style}
`

const Body = styled.div`
  display: inline-flex;
  align-items: center;
  ${props => props.inputStyle}
`

const Word = styled.span`
  display: flex;
`

const Input = function (props) {

  const {
      value = ''
    , placeholder = ''
    , symbolPlaceholderStyle = {}
    , symbolHiddenPlaceholderStyle = {}
    , symbolCursorHiddenPlaceholderStyle = {}
    , symbolCursorStyle = {}
    , symbolDefaultStyle = {}
    , symbolCaretStyle = {}
    , symbolStyle = {}
    , indexCursor = 0
    , isShowCursor = false
    , maxCursor = placeholder.length
    , lengthCursor = indexCursor+1
    , isHiddenPlaceholder = false
  } = props

  const _placeholder = placeholder.split('').map((symbol, index) => {
    const _symbolPlaceholderStyle                = typeof(symbolPlaceholderStyle) === 'function'
                                                  ? symbolPlaceholderStyle(index)
                                                  : symbolPlaceholderStyle

    const _symbolHiddenPlaceholderStyle          = typeof(symbolHiddenPlaceholderStyle) === 'function'
                                                  ? symbolHiddenPlaceholderStyle(index)
                                                  : symbolHiddenPlaceholderStyle

    const _symbolCursorHiddenPlaceholderStyle    = typeof(symbolCursorHiddenPlaceholderStyle) === 'function'
                                                  ? symbolCursorHiddenPlaceholderStyle(index)
                                                  : symbolCursorHiddenPlaceholderStyle

    if (index === indexCursor && isShowCursor && index < maxCursor) {
        const style = Object.keys(_symbolCursorHiddenPlaceholderStyle).map(key =>
          symbol.match(new RegExp(...key.split(',')))
            ? _symbolCursorHiddenPlaceholderStyle[key]
            : null
        ).filter(f => f)[0]

        return <Symbol key={index} style={{...symbolDefaultStyle, ...style}}>{symbol}</Symbol>
    }

    if (index >= value.length) {
      const style = Object.keys(_symbolPlaceholderStyle).map(key =>
        symbol.match(new RegExp(...key.split(',')))
          ? _symbolPlaceholderStyle[key]
          : null
      ).filter(f => f)[0]

      return <Symbol key={index} style={{...symbolDefaultStyle, ...style}}>{symbol}</Symbol>
    }

    const style = Object.keys(_symbolHiddenPlaceholderStyle).map(key =>
      symbol.match(new RegExp(...key.split(',')))
        ? _symbolHiddenPlaceholderStyle[key]
        : null
    ).filter(f => f)[0]

    return <Symbol key={index} style={{...symbolDefaultStyle, ...style}}>{symbol}</Symbol>

  })

  const cursor = value.split('').concat('@').map((symbol, index) => {
    if (index === indexCursor && isShowCursor && index < maxCursor) {
        return (
          <Symbol key={index} style={symbolDefaultStyle}>
            <span style={symbolCursorStyle}></span>
          </Symbol>
        )
    }

    const _symbolCaretStyle = typeof(symbolCaretStyle) === 'function'
                                ? symbolCaretStyle(index)
                                : symbolCaretStyle

    const style = Object.keys(_symbolCaretStyle).map(key =>
      symbol.match(new RegExp(...key.split(',')))
        ? _symbolCaretStyle[key]
        : null
    ).filter(f => f)[0]

    return <Symbol key={index} style={{opacity: 0, ...symbolDefaultStyle, ...style}}>{symbol}</Symbol>
  })

  const text = value.split('').map((symbol, index) => {
    const _symbolStyle = typeof(symbolStyle) === 'function'
                          ? symbolStyle(index)
                          : symbolStyle

    const style = Object.keys(_symbolStyle).map(key =>
      symbol.match(new RegExp(...key.split(',')))
        ? _symbolStyle[key]
        : null
    ).filter(f => f)[0]

    return <Symbol key={index} style={{...symbolDefaultStyle, ...style}}>{symbol}</Symbol>
  })

  return (
    <Body {...props}>
      <Word style={{ position: 'absolute' }}>{cursor}</Word>
      <Word style={{ position: 'absolute' }}>{text}</Word>
      {isHiddenPlaceholder || <Word style={{ position: 'absolute' }}>{_placeholder}</Word>}
    </Body>
  )
}

export default Input
