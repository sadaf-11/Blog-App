import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = 'text',
  classname = '',
  className = '',
  ...props
}, ref) {
  const id = useId()

  return (
    <div className='w-full'>
      {label && (
        <label
          className='mb-2 inline-block pl-1 text-sm font-semibold text-slate-200'
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full rounded-2xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-300 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/10 ${classname} ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  )
})

export default Input
