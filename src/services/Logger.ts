export class ServiceLogger {
  static debugMode = false;

  /**
   * log
   */
  public static log(msg: string): void {
    if (!ServiceLogger.debugMode) {
      return;
    }
    console.log("[InCartUpsell]", new Date(), msg);   
  }

  /**
   * error
   */
  public static error(msg: string): void {
    console.error("InCartUpsell", new Date(), msg);
    window.dataLayer?.push({
      "event": "exception",
      "details": msg
    });
  }
}