export namespace IAuth {
  export interface Response {
    token: string;
  }

  export namespace Enum {
    export enum Token {
      AccessToken = 'accessToken',
    }
  }
}
