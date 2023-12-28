import React, { useState } from 'react'
import './Settings.css'


function SettingsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(true);
    };

  return (
    <>
        <section className='setting-header'>
            <div className='header'>
            <h1>Settings</h1>
            </div>
        
           <div className='setting-form'>
                <form action="">
                    <div className='form-name'>
                        
                        {
                            isOpen ?
                            <div className='change-password'>
                            <p>Change Password</p>
                            <input type="text" name="" id="" placeholder='Change PassWord...' /><br /><br />
                            <input type="password" name="" id="" placeholder='Confirm Password....'/> <br /> <br />
                            <button>Save Changes</button><br /><br />
                        </div>
                        : <>
                            <p>User Name : </p>
                        <p>Password : <button onClick={toggleMenu}>Change Password</button></p>
                        </>
                        }
                      
                    </div>
                </form>
           </div>
        </section>
    </>
  )
}

export default SettingsPage