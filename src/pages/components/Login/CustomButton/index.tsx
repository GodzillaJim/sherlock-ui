import React from 'react'
import styled from 'styled-components'
import { Icon, useTheme } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { Person3Outlined } from '@mui/icons-material'

const ButtonWrapper = styled.button`
  background-color: transparent;
  border: 4px solid #262626;
  color: #262626;
  padding: 1rem 3rem;
  border-radius: 1.5rem;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: auto;
`

interface CustomButtonWrapper {
  children: JSX.Element | string
}
const CustomButton = ({ children }: CustomButtonWrapper): JSX.Element => {
  return <ButtonWrapper >
    <div>
      <Person3Outlined/>
    </div>
    <div>
      {children}
    </div>
  </ButtonWrapper>
}

export default CustomButton
