import ChromeIcon from "@/assets/ChromeIcon";
import ComputerIcon from "@/assets/ComputerIcon";
import FacebookIcon from "@/assets/FacebookIcon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    login(form);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow">
        <div className="flex justify-center">
          <Avatar>
            <AvatarImage
              alt="User Profile"
              src="/placeholder.svg?height=40&width=40"
            />
          </Avatar>
        </div>

        <div className="space-y-4">
          <Button className="w-full bg-[#db4437] text-white hover:bg-[#c1351d]">
            <ChromeIcon className="mr-2" />
            Google
          </Button>

          <Button className="w-full bg-[#4267B2] text-white hover:bg-[#365899]">
            <FacebookIcon className="mr-2" />
            Facebook
          </Button>

          <Button className="w-full bg-[#2F2F2F] text-white hover:bg-[#191919]">
            <ComputerIcon className="mr-2" />
            Microsoft
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />

          <Input
            placeholder="Senha"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <div className="flex justify-between">
            <a className="text-sm text-blue-500 hover:underline" href="#">
              Esqueceu sua senha?
            </a>
          </div>
          <Button
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleLogin}
          >
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
}
