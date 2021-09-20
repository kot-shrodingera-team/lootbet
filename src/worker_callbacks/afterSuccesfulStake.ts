// import getCoefficientGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCoefficient';
import {
  fireEvent,
  getElement,
  getWorkerParameter,
  log,
} from '@kot-shrodingera-team/germes-utils';
import findButton from '../show_stake/helpers/findButton';

// const getResultCoefficientText = (): string => {
//   return null;
// };

// const getResultCoefficient = getCoefficientGenerator({
//   coefficientSelector: '',
//   getCoefficientText: getResultCoefficientText,
//   replaceDataArray: [
//     {
//       searchValue: '',
//       replaceValue: '',
//     },
//   ],
//   removeRegex: /[\s,']/g,
//   coefficientRegex: /(\d+(?:\.\d+)?)/,
//   context: () => document,
// });
async function getNewCoef() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const myBetsButton = await getElement(
    '.iconFont-icon-mybets',
    5000,
    window.germesData.rsFrame.contentDocument
  ).then((button) => fireEvent(button, 'click'));
  const awaitMyBets = await getElement(
    '.mybets-list__item-odd',
    5000,
    window.germesData.rsFrame.contentDocument
  );
  let newCoef;
  if (awaitMyBets) {
    newCoef = Number(awaitMyBets.textContent);
    return newCoef;
  }
  return newCoef;
}

const getResultCoefficient = getNewCoef;

const afterSuccesfulStake = async (): Promise<void> => {
  if (getWorkerParameter('fakeDoStake')) {
    return;
  }
  log('Обновление итогового коэффициента', 'steelblue');
  // const buttonWithCoef = await findButton();
  // const newCoef = Number(buttonWithCoef.nextElementSibling.textContent);
  const resultCoefficient = await getResultCoefficient();
  // const resultCoefficient = newCoef;
  // worker.StakeInfo.Coef = await getResultCoefficient();
  // worker.StakeInfo.Coef = resultCoefficient;
  log(`OLD COEFF ${worker.StakeInfo.Coef}`, 'orange', true);
  log(`NEW COEFF ${resultCoefficient}`, 'orange', true);

  if (resultCoefficient !== worker.StakeInfo.Coef) {
    log(
      `Коэффициент изменился: ${worker.StakeInfo.Coef} => ${resultCoefficient}`,
      'orange'
    );
    worker.StakeInfo.Coef = resultCoefficient;
    log(`должен быть кэф ${worker.StakeInfo.Coef}`, 'orange', true);
    return;
  }

  log('Коэффициент не изменился', 'lightblue');
};

export default afterSuccesfulStake;
