interface ErrorDetail {
  field: string;
  value: string;
  reason: string;
}

export interface ErrorResponseI {
  success: boolean;
  response: {
    status: number;
    code: string;
    message: string;
    errors: ErrorDetail[];
  };
}
