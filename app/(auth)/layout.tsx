import React from 'react'

const AuthLayout = ({children} : {
  children : React.ReactNode
}) => {
  return (
    <div className='auth '>
      {children}
    </div>
  )
}

export default AuthLayout
