import getStakeCountGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeCount';

const getStakeCount = getStakeCountGenerator({
  stakeSelector: '.bet-container .header',
  stakeSelector2: '.bets__item',
  context: () => document,
  context2: () => window.germesData.rsFrame.contentDocument,
});

export default getStakeCount;
