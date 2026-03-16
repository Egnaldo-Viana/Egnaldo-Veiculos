import type { RegisterOptions, UseFormRegister } from 'react-hook-form';
import style from './input.module.css';

interface InputProps {
  placeholder: string;
  type: string;
  name: string;
  error?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
}

export function Input({
  placeholder,
  type,
  register,
  rules,
  name,
  error,
}: InputProps) {
  return (
    <div>
      <input
        className={style.input}
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className={style.error}> {error}</p>}
    </div>
  );
}
