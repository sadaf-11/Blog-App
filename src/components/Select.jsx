import React, { useId } from 'react'

function Select({
  options,
  label,
  className = '',
  ...props
}, ref) {
  const id = useId()

  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={id}
          className='mb-2 inline-block pl-1 text-sm font-semibold text-slate-200'
        >
          {label}
        </label>
      )}
      <select
        {...props}
        ref={ref}
        id={id}
        className={`w-full rounded-2xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition duration-200 focus:border-cyan-300 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/10 ${className}`}
      >
        {options.map((option) => (
          <option key={option} value={option} className='bg-slate-950 text-slate-100'>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
