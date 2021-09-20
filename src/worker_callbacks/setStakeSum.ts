import setStakeSumGenerator, {
  clearStakeSumGenerator,
} from '@kot-shrodingera-team/germes-generators/worker_callbacks/setStakeSum';
import {
  sumInputSelector,
  sumInputSelector2,
} from '../stake_info/getCurrentSum';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const preInputCheck = (sum: number): boolean => {
  return true;
};

const setStakeSumOptions = {
  sumInputSelector,
  sumInputSelector2,
  alreadySetCheck: {
    falseOnSumChange: false,
  },
  preInputCheck,
  inputType: 'fireEvent' as 'fireEvent' | 'react' | 'nativeInput',
  fireEventNames: ['keypress', 'input', 'keyup'],
  context: () => document,
  context2: () => window.germesData.rsFrame.contentDocument,
};

const setStakeSum = setStakeSumGenerator(setStakeSumOptions);

export const clearStakeSum = clearStakeSumGenerator(setStakeSumOptions);

export default setStakeSum;
