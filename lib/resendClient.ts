/**
 * Resend email client — Phase 5 implementation.
 * Server-side only.
 */
export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}
