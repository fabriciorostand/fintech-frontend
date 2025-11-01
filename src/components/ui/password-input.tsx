import { type FC, type ChangeEvent, useState } from 'react';
import { TogglePasswordButton } from './toggle-password-button';

interface PasswordInputProps {
    onChange?: (value: string) => void;
    value?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ onChange, value: externalValue }) => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [internalValue, setInternalValue] = useState<string>('');

    const value = externalValue !== undefined ? externalValue : internalValue;

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        onChange?.(newValue);

        if (!newValue) {
            setPasswordVisible(false);
        }
    };

    const togglePasswordVisibility = (): void => {
        setPasswordVisible(prev => !prev);
    };

    return (
        <div className="relative">
            <input
                className="bg-white border border-gray-300 p-2 rounded w-full block pr-10"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={value}
                onChange={handleChange}
            />
            <TogglePasswordButton
                isVisible={passwordVisible}
                onToggle={togglePasswordVisibility}
                show={!!value}
            />
        </div>
    );
}

export {
    PasswordInput
}