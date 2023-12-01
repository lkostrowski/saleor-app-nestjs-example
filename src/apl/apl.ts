import { AuthData, APL as IAPL } from '@saleor/app-sdk/APL';

/**
 * Abstract class implemented in module DI
 */
export abstract class APL implements IAPL {
  set: (authData: AuthData) => Promise<void>;
  get(saleorApiUrl: string): Promise<AuthData> {
    console.log(saleorApiUrl);
    throw new Error('Method not implemented.');
  }

  getAll(): never {
    throw new Error('Method not implemented.');
  }
  isReady(): never {
    throw new Error('Method not implemented.');
  }
  isConfigured(): never {
    throw new Error('Method not implemented.');
  }
  delete(): never {
    throw new Error('Method not implemented.');
  }
}
