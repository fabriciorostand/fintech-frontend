import { Form, FormLabel, FormSeparator, FormOthersLoginMethods } from '../components/ui/form'
import { Input } from './ui/input'
import { TogglePasswordButton } from './ui/toggle-password-button'
import { Button } from './ui/button'
import { useState } from 'react'

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleEmailChange = (value: string) => setEmail(value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (!e.target.value) setPasswordVisible(false)
    }
    const togglePasswordVisibility = () => setPasswordVisible(v => !v)

    return (
        <Form>
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

            <div className="text-sm text-white font-semibold block w-full max-w-md mx-auto mt-1">
                <a href="password-reset.html">Esqueci minha senha</a>
            </div>

            <Button>Entrar</Button>

            <p className="text-black text-center block w-full max-w-md mx-auto mt-1">Não tem uma conta?
                <a className="text-white font-semibold" href="sign-up.html"> Cadastre-se</a>
            </p>

            <FormSeparator />

            <FormOthersLoginMethods />
        </Form>
    )
}