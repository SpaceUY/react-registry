import { usePostHog } from "posthog-js/react";

/**
 * Custom PostHog hook that provides a simplified interface for common analytics operations.
 *
 * This hook wraps the PostHog React SDK and provides three main functions:
 * - `identify`: Associate a user with their properties
 * - `capture`: Track custom events with properties
 * - `reset`: Clear the current user's identity
 *
 * @returns {Object} An object containing PostHog utility functions
 * @returns {Function} returns.identify - Function to identify users
 * @returns {Function} returns.capture - Function to capture events
 * @returns {Function} returns.reset - Function to reset user identity
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const posthog = usePostHogAnalytics();
 *
 *   const handleLogin = (userId: string) => {
 *     posthog.identify(userId, { plan: 'premium' });
 *   };
 *
 *   const handlePurchase = () => {
 *     posthog.capture('purchase_completed', { amount: 99.99 });
 *   };
 * }
 * ```
 */
export default function usePostHogAnalytics() {
  const posthog = usePostHog();

  /**
   * Associates a user with their unique identifier and optional properties.
   *
   * This function should be called when you know who the user is (e.g., after login).
   * It will link all future events to this user ID and set their properties.
   *
   * @param {string} userId - The unique identifier for the user (e.g., email, database ID)
   * @param {Record<string, unknown>} [userProperties={}] - Optional properties to associate with the user
   *
   * @example
   * ```tsx
   * // Basic identification
   * posthog.identify('user123');
   *
   * // With user properties
   * posthog.identify('user123', {
   *   name: 'John Doe',
   *   email: 'john@example.com',
   *   plan: 'premium',
   *   signupDate: '2024-01-15'
   * });
   * ```
   */
  const identify = (
    userId: string,
    userProperties: Record<string, unknown> = {}
  ) => {
    posthog.identify(userId, {
      ...userProperties,
    });
  };

  /**
   * Captures a custom event with optional properties for analytics tracking.
   *
   * Use this function to track user actions, feature usage, or any other
   * events you want to analyze in PostHog.
   *
   * @param {string} event - The name of the event to track (use snake_case convention)
   * @param {Record<string, unknown>} [properties={}] - Optional properties to include with the event
   *
   * @example
   * ```tsx
   * // Simple event tracking
   * posthog.capture('button_clicked');
   *
   * // Event with properties
   * posthog.capture('purchase_completed', {
   *   amount: 99.99,
   *   currency: 'USD',
   *   product_id: 'prod_123',
   *   payment_method: 'credit_card'
   * });
   *
   * // Feature usage tracking
   * posthog.capture('feature_used', {
   *   feature_name: 'dark_mode',
   *   user_type: 'premium'
   * });
   * ```
   */
  const capture = (event: string, properties: Record<string, unknown> = {}) => {
    posthog.capture(event, {
      ...properties,
    });
  };

  /**
   * Resets the current user's identity and clears all associated data.
   *
   * This function should be called when a user logs out or when you want
   * to stop associating events with the current user. After calling this,
   * new events will be tracked anonymously until `identify` is called again.
   *
   * @example
   * ```tsx
   * const handleLogout = () => {
   *   // Clear user session
   *   clearUserSession();
   *
   *   // Reset PostHog identity
   *   posthog.reset();
   * };
   * ```
   */
  const reset = () => {
    posthog.reset();
  };

  return {
    identify,
    capture,
    reset,
  };
}
