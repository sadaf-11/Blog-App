import React from 'react'

function Button({
  children,
  type = 'button',
  bgColor = 'bg-cyan-400',
  textColor = 'text-slate-950',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`rounded-full px-5 py-2.5 font-bold shadow-lg shadow-cyan-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
