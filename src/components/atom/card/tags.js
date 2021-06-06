import React            from 'react'
import styled           from 'styled-components'
import ContentLoader    from 'react-content-loader'
import Tag              from './../../atom/tag'
import getTagConfig     from './../../../other/getTagConfig'

const CardHeaderInner = styled.h3`
  font-family: 'Circe-Bold', sans-serif;
  margin: 0;
  margin-bottom: -1px;
  font-weight: bold;
  font-size: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 120px;
  white-space: nowrap;
  @media (max-width: 500px) {
    max-width: calc(100vw - 145px);
    min-width: 165px;
  }
`

const Mid = styled.div`
  border: 0px solid #E1E1E1;
  border-right-width: 1px;
  border-left-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: start;
  margin: 5px 0;
  align-self: stretch;
  @media (max-width: 515px) {
    display: none;
  }
`

const MidHeader = styled.h4`
  box-sizing: border-box;
  max-width: 100%;
  margin: 0;
  font-family: CRC35, sans-serif;
  font-size: 16px;
  color: #5A5A5A;
  padding: 5px 10px;
  padding-bottom: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 500px) {
    white-space: normal;
  }
`

const Tags = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: start;
  padding: 4px 10px 0px 10px;
  margin-bottom: -6px;
  box-sizing: border-box;
  align-content: flex-start;

  @media (max-width: 699px) {
    .tag:nth-last-child(1) {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .tag:nth-last-child(2) {
      display: none;
    }
  }

  @media (max-width: 516px) {
    .tag:nth-last-child(3) {
      display: none;
    }
  }
`

const Description = ({isLoad, speed = 1, primaryColor, secondaryColor, children}) => (
  isLoad
    ? <CardHeaderInner style={{display: 'inline-flex', width: '100%', maxWidth: children+'px', marginTop: '5px', marginBottom: '6px', marginLeft: '9px', borderRadius: '1000px'}}>
        <ContentLoader speed={speed} width={100} height={100} primaryColor={primaryColor} secondaryColor={secondaryColor} preserveAspectRatio={'none'} style={{width: '100%', height: '25px'}}>
          <rect x="0" y="0"  width="100" height="100" />
        </ContentLoader>
      </CardHeaderInner>
    : <MidHeader>{children}</MidHeader>
)

export default ({
  description,
  loaderProps,
  tags,
  tagsConfig,
  activeTags
}) => (
  <Mid>
    {
      (loaderProps.isLoad && description)
        ? (
          <>
            <Description {...loaderProps}>{description}</Description>
            <Tags>
              {tags.slice(2).map(
                (tag, index) =>
                  <Tag
                    {...loaderProps}
                    key={index}
                    tagConfig={getTagConfig(tagsConfig, tag.id)}
                    tagContent={tag}
                    isActive={activeTags ? activeTags.includes(tag.id) : false}
                  />
                )
              }
            </Tags>
          </>
        )
        : (
          <>
            {
              description && <Description {...loaderProps}>{description}</Description>
            }
            <Tags>
              {
                tags.reduce((ctx, tag) => {
                  activeTags.includes(tag.id)
                    ? (ctx = [tag, ...ctx])
                    : (ctx = [...ctx, tag])
                  return ctx
                }, []).slice(0, 4).map(
                  (tag, index) =>
                    <Tag key={index} {...loaderProps}
                      tagConfig={getTagConfig(tagsConfig, tag.id)}
                      tagContent={tag}
                      isActive={activeTags ? activeTags.includes(tag.id) : false}
                    />
                  )
              }
            </Tags>
          </>
        )
    }
  </Mid>
)
