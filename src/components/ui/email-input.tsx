import { type FC, type ChangeEvent } from 'react';

interface EmailInputProps {
    onChange?: (value: string) => void;
    value?: string;
}

const EmailInput: FC<EmailInputProps> = ({ onChange, value }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange?.(e.target.value);
    };

    return (
        <input
            className="bg-white border border-gray-300 p-2 rounded w-full max-w-md mx-auto block mt-1"
            type="email"
            placeholder="Digite seu e-mail"
            value={value}
            onChange={handleChange}
        />
    )
}

export {
    EmailInput
}