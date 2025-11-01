import { Form, FormLabel, FormSeparator, FormOthersLoginMethods } from '../components/ui/form'
import { EmailInput } from './ui/email-input'
import { PasswordInput } from './ui/password-input'
import { Button } from './ui/button'

export function LoginForm() {

    return (
        <Form>
            <FormLabel className="mt-30">
                Email:
            </FormLabel>
            <EmailInput />

            <FormLabel className="mt-4">
                Senha:
            </FormLabel>
            <div className="relative w-full max-w-md mx-auto mt-1">
                <PasswordInput />
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