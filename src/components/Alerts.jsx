import React, { useContext } from 'react'
import { NoteContext } from '../context/Notecontext'
const Alerts = () => {
  const {Alert}=useContext(NoteContext)
  return (
    <div className={`alert alert-${Alert.success} mb-1.8`} role="alert" style={{height:"60px",opacity:Alert.opacity}}>
  {Alert.msg}
</div>
  )
}

export default Alerts