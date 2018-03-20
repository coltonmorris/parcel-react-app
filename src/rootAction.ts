import { $call } from 'utility-types';
import * as _ from 'lodash';

import * as DogActions from './dog/actions';
import * as GraphActions from './graph/actions';


const returnsOfActions = {
  ..._.map(_.values(DogActions), $call),
  ..._.map(_.values(GraphActions), $call),
}
export type RootAction = typeof returnsOfActions[number];

