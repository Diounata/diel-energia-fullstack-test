import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface Props extends InputHTMLAttributes<any> {
  label: string
  name: string
  mask?: string
}

export function Input({ label, name, mask, ...props }: Props) {
  const {
    formState: { errors },
    register,
  } = useFormContext()

  const error = errors[name]

  return (
    <div>
      {label ? (
        <label htmlFor={name} className={`block mb-2 text-base font-medium ${error && 'text-red-700'}`}>
          {label}
        </label>
      ) : null}

      <input
        type="text"
        {...register(name)}
        name={name}
        id={name}
        className={`bg-gray-50 border border-gray-300 text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 outline-none ${
          error && 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
        }`}
        {...props}
      />

      {error ? <p className="mt-2 text-sm text-red-600 ">{error.message?.toString() ?? ''}</p> : null}
    </div>
  )
}
