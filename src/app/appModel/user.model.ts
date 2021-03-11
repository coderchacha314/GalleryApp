export class User {
  constructor(
    public email: string,
    public userId: string,
    private _token: string,
    private _tokenExpirationTime: any
  ) {}
  get token() {
    if (
      this._tokenExpirationTime == null &&
      new Date() > this._tokenExpirationTime
    ) {
      return null;
    }
    return this._token;
  }
}
