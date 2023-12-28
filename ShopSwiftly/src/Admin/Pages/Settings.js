import React from 'react'
import SettingsPage from '../Components/SettingsPage'
import Sidebar from '../Components/Sidebar'
import './style.css'
function Settings() {
  return (
    <>
     <div className="Admin">
                <Sidebar/>
                <SettingsPage/>
            </div>
       
    </>
  )
}

export default Settings