import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
import getStakeCount from './getStakeCount';

const preCheck = (): boolean => {
  return true;
};

const checkStakeEnabled = checkStakeEnabledGenerator({
  preCheck,
  getStakeCount,
  betCheck: {
    selector: '.winner__wrapper',
    // selector2: '.bets__item',
    selector2: '.outcome_info',
    errorClasses: [
      {
        className: '.outcome_info.disabled',
        message: 'Событие удалено или недоступно для ставок',
      },
    ],
  },
  errorsCheck: [
    {
      selector: '.coupon-message._open._warning',
      message: 'Какая-то ошибка в купоне',
    },
    {
      selector: '.empty-event',
      message: 'Событие завершено или закрыто для ставок',
    },
    {
      selector: '.outcome_info.disabled',
      message: 'Событие удалено или недоступно для ставок',
    },
  ],
  context: () => document,
  context2: () => window.germesData.rsFrame.contentDocument,
});

export default checkStakeEnabled;
