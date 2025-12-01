import React from 'react'

function SettingsNav() {

  const sections = [
      { 
        title: "Theme"
      }, 
      {
        title: "Account"
      }, 
      { 
        title: "Algorithms"
      }
  ]

  return (
     <nav className="settings-nav">
          {sections.map((section) => ( 
              <div>
                  <a href={`#${section.title}`}>{section.title}</a>
              </div>
          ))}
     </nav>
  )
}

export default SettingsNav
