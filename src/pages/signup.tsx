import { Form, FormLabel } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { TogglePasswordButton } from "../components/ui/toggle-password-button"
import { Button } from "../components/ui/button"
import { Link, Navigate } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"
import { useSignup } from "../hooks/useSignup"

export function Signup() {
    const { isAuthenticated } = useAuth();
    const {
        name,
        email,
        password,
        passwordVisible,
        error,
        isLoading,
        handleNameChange,
        handleEmailChange,
        handlePasswordChange,
        togglePasswordVisibility,
        handleSubmit,
    } = useSignup();

    // Se já estiver autenticado, redireciona para o dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
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


                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Cadastrando...' : 'Cadastre-se'}
                </Button>

                {error && (
                    <p className="text-red-600 text-center mt-2">{error}</p>
                )}

                <p className="text-black text-center block w-full max-w-md mx-auto mt-1">
                    Tem uma conta?
                    <Link to="/" className="text-white font-semibold ml-1">Conecte-se</Link>
                </p>
            </Form>
        </main>
    )
}