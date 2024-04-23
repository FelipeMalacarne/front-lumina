import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axiosClient from "@/lib/axiosClient.ts";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const register = () => {
    axiosClient.get("sanctum/csrf-cookie").then(() => {
      axiosClient
        .post("register", {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        })
        .then((response) => {
          console.log(response);
        });
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow">
        <div className="flex justify-center">
          Criar Conta
          {/* <Avatar>
            <AvatarImage
              alt="User Profile"
              src="/placeholder.svg?height=40&width=40"
            />
          </Avatar> */}
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Nome"
            type="text"
            onChange={(e) => setName(e.target.value)}
            />
          <Input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            placeholder="Confirmar Senha"
            type="password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />

          <div className="flex justify-between">
            <a className="text-sm text-blue-500 hover:underline" href="#">
              Esqueceu sua senha?
            </a>
          </div>

          <Button onClick={register} className="w-full bg-blue-500 text-white hover:bg-blue-600">
            Acessar
          </Button>

        </div>
        <div className="text-center">

          <p className="text-sm">
            Não tem uma conta?
            <a className=" ml-1 text-blue-500 hover:underline" href="#">
              Cadastre-se aqui
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
