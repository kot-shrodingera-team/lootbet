import doStakeGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/doStake';
import getCoefficient from '../stake_info/getCoefficient';

const preCheck = (): boolean => {
  return true;
};

const postCheck = (): boolean => {
  return true;
};

const doStake = doStakeGenerator({
  preCheck,
  doStakeButtonSelector: '.tab-content button.green',
  doStakeButtonSelector2: '.coupon__placebet-btn',
  errorClasses: [
    {
      className: '',
      message: '',
    },
  ],
  disabledCheck: false,
  getCoefficient,
  postCheck,
  context: () => document,
  context2: () => window.germesData.rsFrame.contentDocument,
});

export default doStake;
