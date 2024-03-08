import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Loader = () => {
  return (
    <>
    <TailSpin
  visible={true}
  height="100"
  width="100"
  color="#3a85f0"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </>
  )
}

export default Loader