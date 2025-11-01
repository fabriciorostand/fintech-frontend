import { type FC, type PropsWithChildren, type FormEvent } from 'react'
import googleLogo from '../../assets/images/google-logo.png'
import facebookLogo from '../../assets/images/facebook-logo.png'

interface FormProps extends PropsWithChildren {
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const Form: FC<FormProps> = ({ children, onSubmit }) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="relative w-full max-w-md mx-auto mt-1">
                {children}
            </div>
        </form>
    )
}

interface FormLabelProps extends PropsWithChildren {
    className?: string;
}

const FormLabel: FC<FormLabelProps> = ({ children, className }) => {
    return (
        <label className={`block w-full max-w-md mx-auto ${className || ''}`}>
            {children}
        </label>
    )
}

const FormSeparator: FC = () => {
    return (
        <div className="flex items-center my-18 w-full max-w-md mx-auto">
            <hr className="grow border-t border-white" />
            <span className="mx-2 text-white">ou</span>
            <hr className="grow border-t border-white" />
        </div>
    )
}

const FormOthersLoginMethods: FC = () => {
    return (
        <div className="flex justify-center gap-8 w-full max-w-md mx-auto">
            {/* Google button */}
            <a className="w-14 h-14 rounded-full flex items-center justify-center shadow hover:shadow-lg transition bg-white" href="#">
                <img src={googleLogo} alt="Google" className="w-10 h-10 object-contain" />
            </a>

            {/* Facebook button */}
            <a className="w-14 h-14 rounded-full flex items-center justify-center shadow hover:shadow-lg transition overflow-hidden" href="#">
                <img className="w-full h-full object-contain" src={facebookLogo} alt="Facebook" />
            </a>
        </div>
    )
}

export {
    Form,
    FormLabel,
    FormSeparator,
    FormOthersLoginMethods
}