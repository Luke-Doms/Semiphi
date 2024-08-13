import React from 'react'

function ThemeBox(props) {
  return (
    <div onClick={() => props.onClick()} className='theme' style={{'background-color': props.theme.primary, 'border-color': props.theme.highlight}}>
        <span className='theme-id' style={{'background-color': props.theme.primary, 'color': props.theme.text}}>{props.theme.id}</span>
        <div className='color-preview' style={{'background-color': props.theme.highlight}}></div>
        <div className='color-preview' style={{'background-color': props.theme.secondary}}></div>
        <div className='color-preview' style={{'background-color': props.theme.text}}></div>
    </div>

  )
}

export default ThemeBox