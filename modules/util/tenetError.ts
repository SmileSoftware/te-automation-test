export const DEFAULT_ERROR_HTTP_STATUS_CODE = 500;

export class TenetError extends Error {
  public status = DEFAULT_ERROR_HTTP_STATUS_CODE

  public statusCode = DEFAULT_ERROR_HTTP_STATUS_CODE

  public constructor(message: string, statusCode?: number) {
    super(message);
    if (statusCode) {
      this.statusCode = statusCode;
      this.status = this.statusCode;
      this.status = this.setStatus(statusCode);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public setStatus(statusCode) {
    // eslint-disable-next-line no-warning-comments
    // TODO: Look for the status text for the given status code. I.E: 404 -> "Not Found"
    return statusCode;
  }
}
