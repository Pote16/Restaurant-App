// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {secret} from './secret.environment';

export const environment = {
  DOMAIN: secret.DOMAIN,
  PORT: secret.PORT,
  DB_HOST: secret.DB_HOST,
  DB_NAME: secret.DB_NAME,
  DB_USER: secret.DB_USER,
  DB_PASSWORD: secret.DB_PASSWORD,
  DB_PORT: secret.DB_PORT,
  
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
