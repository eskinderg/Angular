/**
 * Options passed when opening a confirmation dialog
 */

export interface ConfirmOptions {
  /**
   * The title of the confirmation dialog
   */
  title: string;

  /**
   * The message in the confirmation dialog
   */
  message: string;

  backdrop: boolean;

  centered?: boolean;

  scrollable?: boolean;
}
