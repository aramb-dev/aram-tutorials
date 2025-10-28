declare module '@stackframe/stack' {
  interface StackServerAppOptions {
    tokenStore?: string;
    [key: string]: unknown;
  }

  export class StackServerApp {
    constructor(options?: StackServerAppOptions);
  }
}
