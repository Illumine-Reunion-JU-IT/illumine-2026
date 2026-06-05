/**
 * TODO: Define general-purpose reusable TypeScript declarations.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
