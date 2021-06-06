import React            from 'react'
import Picture          from './picture-wheel'
import styled           from 'styled-components'
import ContentLoader    from 'react-content-loader'
import { withSize }     from 'react-sizeme'

//function MyComponent({ size }) {
// return <div>My width is {size.width}px</div>
//}


const Main = styled.div`
  display: flex;
  min-width: 216px;
  width: 216px;
  padding-right: 9px;
  @media (max-width: 515px) {
    min-width: 80px;
    width: 100%;
    padding-right: 0px;
  }
`

const Essentials= styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  overflow: hidden;
  align-items: flex-start;
  flex: 1;
  color: #5A5A5A;

  @media (max-width: 515px) {
    width: ${props => props.width - 89}px;
    max-width: ${props => props.width - 89}px;
  }
`

const CardHeaderInner = styled.h3`
  font-family: 'Circe-Bold', sans-serif;
  margin: 0;
  margin-bottom: -1px;
  font-weight: bold;
  font-size: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;

  @media (max-width: 515px) {
    width: 100%;
    max-width: 100%;
  }
`

const UserPropInner = styled.p`
  font-family: 'CRC55', sans-serif;
  margin: 0;
  padding: 0;
  font-size: 17px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;

  @media (max-width: 513px) {
    width: 100%;
    max-width: 100%;
  }
`

const CardHeader = ({ isLoad, speed, primaryColor, secondaryColor, children }) => (
  isLoad
    ? <CardHeaderInner style={{display: 'inline-flex', width: '100%', marginTop: '5px', marginBottom: '4px', borderRadius: '1000px'}}>
        <ContentLoader speed={speed} width={100} height={100} primaryColor={primaryColor} secondaryColor={secondaryColor} preserveAspectRatio={'none'} style={{width: '100%', height: '25px'}}>
          <rect x="0" y="0"  width="100" height="100" />
        </ContentLoader>
      </CardHeaderInner>
    : <CardHeaderInner>{children}</CardHeaderInner>
)

const UserProp = ({ isLoad, speed, primaryColor, secondaryColor, children }) => (
  isLoad
    ? <UserPropInner style={{display: 'inline-flex', width: parseInt(children)+'px', marginBottom: '4px', borderRadius: '1000px'}}>
        <ContentLoader speed={speed} width={100} height={100} primaryColor={primaryColor} secondaryColor={secondaryColor} preserveAspectRatio={'none'} style={{width: '100%', height: '17px'}}>
          <rect x="0" y="0"  width="100" height="100" />
        </ContentLoader>
      </UserPropInner>
    : <UserPropInner>{children}</UserPropInner>
)

export default withSize()(({ size: { width }, pics, pic, loaderProps, titleText, firstText, lastText }) => (
  <Main>
    <Picture {...loaderProps} pic={pic || pics} />
    <Essentials width={width}>
      <CardHeader {...loaderProps}>{titleText}</CardHeader>
      <UserProp {...loaderProps}>{firstText}</UserProp>
      <UserProp {...loaderProps}>{lastText}</UserProp>
    </Essentials>
  </Main>
))
