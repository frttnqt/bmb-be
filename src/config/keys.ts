import devKeys from './dev';
import prodKeys from './prod';
import { IKeyConfig } from './key-config.model';

export const keys: IKeyConfig =  process.env.NODE_ENV=== 'production'? prodKeys: devKeys;
