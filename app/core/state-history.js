/**
 * This is a global singleton that contains the last 10 states in memory.
 */

import FixedQueue from './fixed-queue';

let stateHistory = FixedQueue(10);

export default stateHistory;
