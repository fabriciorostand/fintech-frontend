import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../services/use-create-user";
import { useAuth } from "./useAuth";

export function useSignup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const createUser = useCreateUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!e.target.value) setPasswordVisible(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((v) => !v);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    createUser.mutate(
      { name, email, password },
      {
        onSuccess: (data) => {
          // Se o cadastro retornar id, faz login automático
          if (data.id) {
            const userIdStr = data.id.toString();
            localStorage.setItem("userId", userIdStr);
            localStorage.setItem("userName", data.name);
            login(userIdStr, data.name);
          }

          // Redireciona para o dashboard
          navigate("/dashboard", { replace: true });
        },
        onError: (err: unknown) => {
          let msg = "Erro ao cadastrar usuário.";
          if (err instanceof Error) msg = err.message;
          setError(msg);
        },
      }
    );
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordVisible(false);
    setError(null);
  };

  return {
    name,
    email,
    password,
    passwordVisible,
    error,
    isLoading: createUser.status === "pending",
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleSubmit,
    resetForm,
  };
}