import styled from 'styled-components'

const Form = styled.div`
  width: 351px;
  height: 433px;
  background: #FCFCFC;
  box-shadow: 0px 1px 5px rgba(68, 68, 68, 0.27);
  border-radius: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 365px) {
    width: 306px;
    height: 433px;
  }
`

export default Form
