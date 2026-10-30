// Shared validation for the contact form (client) and /api/contact (server).

export const reasons = [
  "Full-time role",
  "Project or consulting work",
  "Collaboration or research",
  "Speaking or writing",
  "Something else",
] as const;

export type ContactInput = {
  name: string;
  email: string;
  organisation: string;
  reason: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const limits = { name: 100, email: 200, organisation: 150, message: 5000, minMessage: 20 };

export function normalise(raw: Record<string, unknown>): ContactInput {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    name: str(raw.name),
    email: str(raw.email).toLowerCase(),
    organisation: str(raw.organisation),
    reason: str(raw.reason),
    message: str(raw.message),
  };
}

export function validate(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.name) errors.name = "Please tell me your name.";
  else if (input.name.length > limits.name) errors.name = "That name is too long.";
  if (!EMAIL_RE.test(input.email) || input.email.length > limits.email) errors.email = "Please enter a valid email address.";
  if (input.organisation.length > limits.organisation) errors.organisation = "That organisation name is too long.";
  if (!(reasons as readonly string[]).includes(input.reason)) errors.reason = "Please choose a reason.";
  if (input.message.length < limits.minMessage) errors.message = `Please write at least ${limits.minMessage} characters.`;
  else if (input.message.length > limits.message) errors.message = `Please keep it under ${limits.message} characters.`;
  return errors;
}
