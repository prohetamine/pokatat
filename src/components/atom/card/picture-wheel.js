import styled           from 'styled-components'
import React            from 'react'
import ContentLoader    from 'react-content-loader'

const Wrapper = styled.div`
  overflow: hidden;
  border-radius: 100%;
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  min-width: 78px;
  min-height: 78px;
  max-width: 78px;
  max-height: 78px;
  flex-shrink: 0;
`

const Photo = styled.div`
  background: url(${props => props.src});
  background-size: cover;
  background-position: center center;
  width: ${({ width = 100 }) => width * 0.78}px;
  height: ${({ height = 100 }) => height * 0.78}px;
  min-width: ${({ width = 100 }) => width * 0.78}px;
  min-height: ${({ height = 100 }) => height * 0.78}px;
`

export default function ({ pic, isLoad, speed, primaryColor, secondaryColor }) {

  if (isLoad) {
    return (
      <Wrapper>
        <ContentLoader speed={speed} primaryColor={primaryColor} secondaryColor={secondaryColor} height={78} width={78} style={{ minWidth: '78px', minHeight: '78px', maxWidth: '78px', maxHeight: '78px'}}>
          <circle cx="39" cy="39" r="39" />
        </ContentLoader>
      </Wrapper>
    )
  }

  const isPicOne = typeof(pic) === 'string'

  const count = isPicOne ? 1 : pic.length

  return (
    <Wrapper column={count > 2}>
      {
        isPicOne
          ? <Photo src={pic} />
          : {
            '1': (
                <Photo src={pic[0]} />
              ),
            '2': (
                <>
                  <Photo width={50} height={100} src={pic[0]} />
                  <Photo width={50} height={100} src={pic[1]} />
                </>
              ),
            '3': (
                <>
                  <Photo width={100} height={50} src={pic[0]} />
                  <div style={{ display: 'flex' }}>
                    <Photo width={50} height={50} src={pic[1]} />
                    <Photo width={50} height={50} src={pic[2]} />
                  </div>
                </>
              ),
            '4': (
                <>
                <div style={{ display: 'flex' }}>
                  <Photo width={50} height={50} src={pic[0]} />
                  <Photo width={50} height={50} src={pic[1]} />
                </div>
                  <div style={{ display: 'flex' }}>
                    <Photo width={50} height={50} src={pic[2]} />
                    <Photo width={50} height={50} src={pic[3]} />
                  </div>
                </>
              )
          }[count]
      }
    </Wrapper>
  )
}
