import getStakeInfoValueGenerator, {
  stakeInfoValueReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getStakeInfoValue';
import { StakeInfoValueOptions } from '@kot-shrodingera-team/germes-generators/stake_info/types';

// const getCof = async () => {
//   const getCoefCyber = document.querySelector<HTMLElement>(
//     '.winner__coef-container .cof'
//   );
//   const getCoefSport =
//     window.germesData.rsFrame.contentDocument.querySelector<HTMLElement>(
//       '.bets__item .bets__item-odd .outcome__number'
//     );

//   const getCoefAll = getCoefCyber.className || getCoefSport.className;
// }

// if (coefficientSelectorCyber === null) {
// }

export const coefficientSelector = '.winner__coef-container .cof';
export const coefficientSelector2 = '.bets__item-odd .outcome__number';
// export const coefficientSelectorSport =
// '.bets__item .bets__item-odd .outcome__number';

const coefficientOptions: StakeInfoValueOptions = {
  name: 'coefficient',
  // fixedValue: () => 0,
  valueFromText: {
    text: {
      // getText: () => '',
      selector: coefficientSelector,
      selector2: coefficientSelector2,
      context: () => document,
      context2: () => window.germesData.rsFrame.contentDocument,
    },
    replaceDataArray: [
      {
        searchValue: '',
        replaceValue: '',
      },
    ],
    removeRegex: /[\s,']/g,
    matchRegex: /(\d+(?:\.\d+)?)/,
    errorValue: 0,
  },
  zeroValues: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modifyValue: (value: number, extractType: string) => value,
  disableLog: false,
};

const getCoefficient = getStakeInfoValueGenerator(coefficientOptions);

export const coefficientReady =
  stakeInfoValueReadyGenerator(coefficientOptions);

export default getCoefficient;
