import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormLabel,
  FormOthersLoginMethods,
  FormSeparator,
} from "../components/ui/form";
import { useLogin } from "../services/use-login";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TogglePasswordButton } from "./ui/toggle-password-button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const login = useLogin();
  const navigate = useNavigate();

  const handleEmailChange = (value: string) => setEmail(value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!e.target.value) setPasswordVisible(false);
  };
  const togglePasswordVisibility = () => setPasswordVisible((v) => !v);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          setSuccess(true);
          // Redirecionar para o dashboard após login bem-sucedido
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        },
        onError: (err: unknown) => {
          let msg = "Erro ao autenticar.";
          if (err instanceof Error) msg = err.message;
          setError(msg);
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel className="mt-30">Email:</FormLabel>
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

      <Button disabled={login.status === "pending"} type="submit">
        {login.status === "pending" ? "Entrando..." : "Entrar"}
      </Button>

      {error && <p className="mt-2 text-center text-red-600">{error}</p>}
      {success && (
        <p className="mt-2 text-center text-green-700">
          Login efetuado com sucesso!
        </p>
      )}

      <p className="mx-auto mt-1 block w-full max-w-md text-center text-black">
        Não tem uma conta?
        <Link className="ml-1 font-semibold text-white" to="/signup">
          Cadastre-se
        </Link>
      </p>

      <FormSeparator />

      <FormOthersLoginMethods />
    </Form>
  );
}