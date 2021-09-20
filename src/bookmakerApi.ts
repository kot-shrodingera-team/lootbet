declare global {
  interface GermesData {
    rsFrame: HTMLIFrameElement;
  }
  // interface Window {
  //   store: {
  //     betslip: {
  //       add: (a: unknown) => unknown;
  //       initNewBet: (outcomeId: string, pid: string) => unknown;
  //     };
  //   };
  // }
}

export const clearGermesData = (): void => {
  window.germesData = {
    bookmakerName: 'LootBet',
    minimumStake: undefined,
    maximumStake: undefined,
    doStakeTime: undefined,
    betProcessingStep: undefined,
    betProcessingAdditionalInfo: undefined,
    betProcessingTimeout: 50000,
    stakeDisabled: undefined,
    rsFrame: undefined,
    stopBetProcessing: () => {
      window.germesData.betProcessingStep = 'error';
      window.germesData.stakeDisabled = true;
    },
  };
};

export default {};
