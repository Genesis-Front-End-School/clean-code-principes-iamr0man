export namespace IAuth {
  export type Token = {
    token: string;
  }

  export namespace Enum {
    export enum Token {
      AccessToken = 'accessToken',
    }
  }
}
