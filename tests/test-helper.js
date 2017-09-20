import resolver from './helpers/resolver';
import { start } from 'ember-cli-qunit';

import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);
start();
