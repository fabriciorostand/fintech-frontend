import { Link, Navigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Form, FormLabel } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { TogglePasswordButton } from "../components/ui/toggle-password-button";

import { useAuth } from "../hooks/useAuth";
import { useSignup } from "../hooks/useSignup";

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
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <main className="min-h-screen bg-green-500">
      <h1 className="pt-20 text-center text-5xl text-white">Fintech</h1>
      <Form onSubmit={handleSubmit}>
        <FormLabel className="mt-30">Nome:</FormLabel>
        <Input
          autoComplete="name"
          onChange={handleNameChange}
          placeholder="Digite seu nome"
          required
          type="text"
          value={name}
        />

        <FormLabel className="mt-4">Email:</FormLabel>
        <Input
          autoComplete="email"
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="Digite seu e-mail"
          required
          type="email"
          value={email}
        />

        <FormLabel className="mt-4">Senha:</FormLabel>
        <div className="relative mx-auto mt-1 w-full max-w-md">
          <Input
            className="pr-10"
            onChange={handlePasswordChange}
            placeholder="Digite sua senha"
            required
            type={passwordVisible ? "text" : "password"}
            value={password}
          />
          <TogglePasswordButton
            isVisible={passwordVisible}
            onToggle={togglePasswordVisibility}
            show={!!password}
          />
        </div>

        <p className="mx-auto mt-8 block w-full max-w-md text-center text-black">
          Ao se cadastrar, você concorda com nossos
          <a className="text-white" href="#">
            {" "}
            Termos
          </a>
          ,
          <a className="text-white" href="#">
            {" "}
            Política de Privacidade
          </a>{" "}
          e
          <a className="text-white" href="#">
            {" "}
            Política de Cookies
          </a>
          .
        </p>

        <Button disabled={isLoading} type="submit">
          {isLoading ? "Cadastrando..." : "Cadastre-se"}
        </Button>

        {error && <p className="mt-2 text-center text-red-600">{error}</p>}

        <p className="mx-auto mt-1 block w-full max-w-md text-center text-black">
          Tem uma conta?
          <Link className="ml-1 font-semibold text-white" to="/">
            Conecte-se
          </Link>
        </p>
      </Form>
    </main>
  );
}