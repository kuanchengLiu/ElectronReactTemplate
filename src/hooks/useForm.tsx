// useForm.tsx
import { useState } from "react";

type ValidationRules<T> = {
  [K in keyof T]?: RegExp;
};

type UseFormProps<T> = {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit: (values: T) => void;
  onClose: () => void;
};

export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  validationRules = {},
  onSubmit,
  onClose,
}: UseFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateField = (field: keyof T, value: string) => {
    const rule = validationRules[field];
    if (rule && !rule.test(value)) {
      setErrors((prev) => ({ ...prev, [field]: `Invalid ${String(field)}` }));
    } else {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[field];
        return updatedErrors;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name as keyof T;
    setFormData((prev) => ({ ...prev, [field]: value.trim() }));
    validateField(field, value.trim());
  };

  const handleSubmit = () => {
    let hasErrors = false;
    const validationErrors: Partial<Record<keyof T, string>> = {};

    Object.keys(formData).forEach((key) => {
      const field = key as keyof T;
      const value = formData[field] as string;
      const rule = validationRules[field];
      if (rule && !rule.test(value)) {
        validationErrors[field] = `Invalid ${String(field)}`;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};
