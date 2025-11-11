import type { FC, FormEvent, PropsWithChildren } from "react";
import facebookLogo from "../../assets/images/facebook-logo.png";
import googleLogo from "../../assets/images/google-logo.png";

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
      <div className="relative mx-auto mt-1 w-full max-w-md">{children}</div>
    </form>
  );
};

interface FormLabelProps extends PropsWithChildren {
  className?: string;
}

const FormLabel: FC<FormLabelProps> = ({ children, className }) => (
  <label className={`mx-auto block w-full max-w-md ${className || ""}`}>
    {children}
  </label>
);

const FormSeparator: FC = () => (
  <div className="mx-auto my-18 flex w-full max-w-md items-center">
    <hr className="grow border-white border-t" />
    <span className="mx-2 text-white">ou</span>
    <hr className="grow border-white border-t" />
  </div>
);

const FormOthersLoginMethods: FC = () => {
  return (
    <div className="mx-auto flex w-full max-w-md justify-center gap-8">
      {/* Google button */}
      <a
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow transition hover:shadow-lg"
        href="#"
      >
        <img
          alt="Google"
          className="h-10 w-10 object-contain"
          src={googleLogo}
        />
      </a>

      {/* Facebook button */}
      <a
        className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full shadow transition hover:shadow-lg"
        href="#"
      >
        <img
          alt="Facebook"
          className="h-full w-full object-contain"
          src={facebookLogo}
        />
      </a>
    </div>
  );
};

export { Form, FormLabel, FormSeparator, FormOthersLoginMethods };