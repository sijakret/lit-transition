import {version as v} from '../package.json';

export const version = process.env.NEXT ? 'next' : v;