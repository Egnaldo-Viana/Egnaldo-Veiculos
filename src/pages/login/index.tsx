import React from 'react';
import style from './login.module.css';
import acesso from '../../assets/acesso.png';
import cadeado from '../../assets/cadeado.png';
import restrito from '../../assets/iconeRestrito.svg';
import { Input } from '../../components/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import supabase from '../../services/supabaseClient';

const schema = z.object({
  email: z
    .string()
    .email('Insira um email válido')
    .nonempty('O campo email é obrigatório'),
  password: z.string().nonempty('O campo senha é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  async function onSubmit(data: FormData) {
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log('erro ao fazer login: ', error.message);
      return;
    }
    navigate('/dashboard');
  }

  React.useEffect(() => {
    async function handleLogout() {
      await supabase.auth.signOut();
    }

    handleLogout();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.loginWrappe}>
        <Link to="/">
          <img
            className={style.icon}
            src={acesso}
            alt="icone de área restrista "
          />
        </Link>
        <h1 className={style.title}>administração do sistema</h1>
        <div className={style.alert}>
          <img className={style.cadeado} src={cadeado} alt="ícone de cadeado" />
          <p>zona restrita</p>
        </div>

        <form className={style.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputGroup}>
            <label className={style.label} htmlFor="email">
              E-mail administrativo:
            </label>
            <Input
              name="email"
              placeholder="Digite seu email"
              register={register}
              type="email"
              error={errors.email?.message}
            />
          </div>

          <div className={style.inputGroup}>
            <label className={style.label} htmlFor="password">
              Senha de Acesso:
            </label>
            <Input
              name="password"
              placeholder="Digite sua senha"
              register={register}
              type="password"
              error={errors.password?.message}
            />
          </div>

          <button className={style.button} type="submit">
            <img src={restrito} alt="" />
            Autenticar Acesso
          </button>
        </form>

        <p className={style.aviso}>
          Aviso: Tentativas de acesso não autorizado são registradas e
          monitoradas.
        </p>
        <p className={style.aviso}>
          Este portal é destinado apenas a pessoal autorizado.
        </p>
      </div>
    </div>
  );
}
