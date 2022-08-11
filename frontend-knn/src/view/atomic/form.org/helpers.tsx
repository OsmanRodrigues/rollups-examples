import { FC } from "react";
import { RegisterOptions } from "react-hook-form";
import { FieldError } from "react-hook-form/dist/types/errors";
import { Paragraph } from "../typography.mol";

interface IInputError {
    error?: any;
    name: string;
    options: RegisterOptions;
}

export const handleFormError = (
    inputError: FieldError,
    inputName: string,
    options: RegisterOptions
) => {
    const typedKey = inputError.type as keyof typeof options;

    switch (inputError?.type) {
        case "required":
            return `"${inputName}" is required.`;
        case "max":
            return `Max value for "${inputName}" field is ${options[typedKey]}.`;
        case "min":
            return `Min value for "${inputName}" field is ${options[typedKey]}.`;
        default:
            return undefined;
    }
};

export const InputError: FC<IInputError> = ({ error, name, options }) =>
    error ? (
        <Paragraph color="white" paddingX="sm" paddingY="sm">
            {handleFormError(error, name, options)}
        </Paragraph>
    ) : null;
