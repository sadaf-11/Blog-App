import React from 'react'

function LOgo({ width = '100px' }) {
  return (
    <div style={{ width }} className='font-black tracking-tight text-slate-50'>
      <span className='text-cyan-300'>Blog</span><span className='text-violet-300'>Forge</span>
    </div>
  )
}

export default LOgo
