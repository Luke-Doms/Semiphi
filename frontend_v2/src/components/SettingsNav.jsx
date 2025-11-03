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
                  <a href={`#${section.title}`}>{section.title}</a>
              </div>
          ))}
     </nav>
  )
}

export default SettingsNav
