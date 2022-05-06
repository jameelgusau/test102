// Import dependencies
import React from 'react'
import styled, { css } from 'styled-components'

// Import colors and sizes variables
import { colors, sizes } from './../variables'

// Import Container component
import { Container } from './generic-helpers'

// Import H5 heading
import { H5 } from './typography'

const ButtonsRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  width: 100%;

  & + & {
    margin-top: 12px;
  }
`

const ButtonVariant = styled.div`
  width: 16.6666667%;

  &:nth-of-type(n+2) {
    text-align: center;
  }
`

const Button = styled.button`
  display: inline-block;
  width: ${props => (props.fab ? '32px' : 'initial')};
  font-size: ${sizes.sm};
  color: ${props => (props.ghost ? props.theme : '#fff')};
  background-color: ${props => (props.ghost ? 'transparent' : props.theme)};
  border: ${props => (props.ghost ? `1px solid ${props.theme}` : 0)};
  border-radius: ${props => (props.fab ? '50%' : '2px')};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.18), 0 4px 8px 0 rgba(0, 0, 0, 0.15);
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  & + & {
    margin-top: 12px;
  }

  ${props =>
    props.active & !props.ghost &&
    css`
      background-color: ${colors.primaryActive};
  `};

  ${props =>
    props.active & props.ghost &&
    css`
      color: ${colors.primaryActive};
      border-color: ${colors.primaryActive};
  `};

  ${props =>
    props.hover & props.ghost &&
    css`
      color: ${colors.primaryHover};
      border-color: ${colors.primaryHover};
  `};

  ${props =>
    props.large | props.ghost &&
    css`
      padding: 14px 18px;
  `};

  ${props =>
    props.disabled & !props.ghost &&
    css`
      background-color: ${colors.disabled};
  `};

  ${props =>
    props.disabled & props.ghost &&
    css`
      color: ${colors.disabled};
      border-color: ${colors.disabled};
  `};

  ${props =>
    props.fab &&
    css`
      padding: 8px 16px;
      width: 40px;
      line-height: 24px;
  `};

  ${props =>
    props.medium &&
    css`
      padding: 10px 16px;
  `};

  ${props =>
    props.small &&
    css`
      padding: 6px 12px;
  `};

    ${props =>
      props.icon &&
      css`
      i {
        margin-right: 2px;
        font-size: 12px;
      }
  `};
`