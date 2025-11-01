import { Form, FormLabel } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { TogglePasswordButton } from "../components/ui/toggle-password-button"
import { Button } from "../components/ui/button"

import { useState } from 'react'
import { useCreateUser } from '../services/use-create-user'

export function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const createUser = useCreateUser()


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
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
        createUser.mutate(
            { name, email, password },
            {
                onSuccess: () => {
                    setSuccess(true)
                    setName('')
                    setEmail('')
                    setPassword('')
                },
                onError: (err: unknown) => {
                    let msg = 'Erro ao cadastrar usuário.'
                    if (err instanceof Error) msg = err.message
                    setError(msg)
                },
            }
        )
    }

    return (
        <main className="min-h-screen bg-green-500">
            <h1 className="text-5xl text-white text-center pt-20">Fintech</h1>
            <Form onSubmit={handleSubmit}>
                <FormLabel className="mt-30">
                    Nome:
                </FormLabel>
                <Input
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={handleNameChange}
                    autoComplete="name"
                    required
                />

                <FormLabel className="mt-4">
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

                <p className="text-black text-center block w-full max-w-md mx-auto mt-8">
                    Ao se cadastrar, você concorda com nossos
                    <a className="text-white" href="#"> Termos</a>,
                    <a className="text-white" href="#"> Política de Privacidade</a> e
                    <a className="text-white" href="#"> Política de Cookies</a>.
                </p>


                <Button type="submit" disabled={createUser.status === 'pending'}>
                    {createUser.status === 'pending' ? 'Cadastrando...' : 'Cadastre-se'}
                </Button>

                {error && (
                    <p className="text-red-600 text-center mt-2">{error}</p>
                )}
                {success && (
                    <p className="text-green-700 text-center mt-2">Usuário cadastrado com sucesso!</p>
                )}

                <p className="text-black text-center block w-full max-w-md mx-auto mt-1">
                    Tem uma conta?
                    <a className="text-white font-semibold" href="index.html"> Conecte-se</a>
                </p>
            </Form>
        </main>
    )
}