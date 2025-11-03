import { Form, FormLabel, FormSeparator, FormOthersLoginMethods } from '../components/ui/form'
import { Input } from './ui/input'
import { TogglePasswordButton } from './ui/toggle-password-button'
import { Button } from './ui/button'
import { useState } from 'react'
import { useLogin } from '../services/use-login'
import { Link, useNavigate } from 'react-router-dom'

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const login = useLogin()
    const navigate = useNavigate()

    const handleEmailChange = (value: string) => setEmail(value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (!e.target.value) setPasswordVisible(false)
    }
    const togglePasswordVisibility = () => setPasswordVisible(v => !v)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        login.mutate(
            { email, password },
            {
                onSuccess: () => {
                    setSuccess(true)
                    // Redirecionar para o dashboard após login bem-sucedido
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 500)
                },
                onError: (err: unknown) => {
                    let msg = 'Erro ao autenticar.'
                    if (err instanceof Error) msg = err.message
                    setError(msg)
                },
            }
        )
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormLabel className="mt-30">
                Email:
            </FormLabel>
            <Input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={e => handleEmailChange(e.target.value)}
                autoComplete="email"
                required
            />

            <FormLabel className="mt-4">
                Senha:
            </FormLabel>
            <div className="relative w-full max-w-md mx-auto mt-1">
                <Input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="pr-10"
                />
                <TogglePasswordButton
                    isVisible={passwordVisible}
                    onToggle={togglePasswordVisibility}
                    show={!!password}
                />
            </div>

            <Button type="submit" disabled={login.status === 'pending'}>
                {login.status === 'pending' ? 'Entrando...' : 'Entrar'}
            </Button>

            {error && (
                <p className="text-red-600 text-center mt-2">{error}</p>
            )}
            {success && (
                <p className="text-green-700 text-center mt-2">Login efetuado com sucesso!</p>
            )}

            <p className="text-black text-center block w-full max-w-md mx-auto mt-1">Não tem uma conta?
                <Link to="/signup" className="text-white font-semibold ml-1">Cadastre-se</Link>
            </p>

            <FormSeparator />

            <FormOthersLoginMethods />
        </Form>
    )
}