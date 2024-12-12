# React Hooks Explanation

## What are Hooks in React?

Hooks are special functions in React that allow developers to use state and lifecycle features inside functional components, without using class components.

## Key Hooks and Their Use Cases

1. useState - Manage Component State
The useState hook allows you to add state to your functional components.

    Usage:

    ```tsx
    const [state, setState] = useState(initialState);
    ```
    - `state`: The current state value.
    - `setState`: A function to update the state.
    - `initialState`: The initial state value.

2. Dynamic Field Validation

    Using state (`useState`), you can dynamically update and validate fields in a form.

    ```tsx
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
    ```
    Explanation:

    > Checks if a validation rule exists for the field.
    > If validation fails, adds an error message to the errors state.
    > Removes the error from errors if validation passes.

3. `onChange` - Respond to User Input

    The `onChange` handler captures user input and updates the form state.

    ```tsx
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name as keyof T;
    setFormData((prev) => ({ ...prev, [field]: value.trim() }));
    validateField(field, value.trim());
    };
    ```
    
4. Form Submission

    The `handleSubmit` function validates all fields before submission.

    4
# useForm Hook Documentation

The `useForm` hook provides a reusable and generic way to manage form state, validation, and submission in React components. This guide explains how to use it effectively.

## Features

- **Dynamic State Management**: Handles form data dynamically based on the provided initial values.
- **Validation Rules**: Supports field-level validation using regular expressions.
- **Error Handling**: Tracks validation errors and displays appropriate error messages.
- **Reusable Logic**: Designed to be used with any form structure and field types.

---

## API Reference

### Import
```tsx
import { useForm } from "./useForm";
```

### Usage
The hook is typed generically to accommodate various form structures.

#### Hook Signature
```tsx
const {
  formData,
  errors,
  handleChange,
  handleSubmit,
} = useForm<T>({
  initialValues,
  validationRules,
  onSubmit,
  onClose,
});
```

#### Parameters
| Parameter          | Type                                | Description                                                                 |
|--------------------|-------------------------------------|-----------------------------------------------------------------------------|
| `initialValues`    | `T`                                | An object representing the default state of the form fields.               |
| `validationRules`  | `ValidationRules<T>` (optional)    | A map of regular expressions for field validation.                         |
| `onSubmit`         | `(values: T) => void`              | A callback triggered when the form is successfully validated and submitted.|
| `onClose`          | `() => void`                       | A callback triggered when the form needs to close.                         |

#### Returns
| Return Value       | Type                                | Description                                                                 |
|--------------------|-------------------------------------|-----------------------------------------------------------------------------|
| `formData`         | `T`                                | The current state of the form fields.                                       |
| `errors`           | `Partial<Record<keyof T, string>>` | Validation error messages for the fields.                                   |
| `handleChange`     | `(e: React.ChangeEvent<HTMLInputElement>) => void` | Updates the state and validates the field being edited. |
| `handleSubmit`     | `() => void`                       | Validates all fields and triggers the `onSubmit` callback if valid.         |

---

## Example: CreateServerDialog

Here’s an example of how to use the `useForm` hook in a dialog component for creating a server.

### Key Notes
1. **Dynamic Integration**: The `useForm` hook is generic and reusable for other forms.
2. **Validation**: Errors are managed dynamically and displayed per field.
3. **Data Handling**: `handleSubmit` ensures validation before invoking the `onSubmit` callback.

---

## Conclusion
The `useForm` hook simplifies form management by centralizing logic, ensuring validation, and providing a clean API for handling form interactions. It’s an essential tool for reusable and maintainable form components in React.

