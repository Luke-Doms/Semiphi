import React from 'react'

function SettingsNav() {

  const sections = [
      {
        title: "Account"
      }, 
      { 
        title: "Theme"
      }, 
      { 
        title: "Algorithms"
      }
  ]

  return (
     <nav className="settings-nav">
          {sections.map((section) => ( 
              <div>
                  <span>{section.title}</span>
              </div>
          ))}
     </nav>
  )
}

export default SettingsNav
