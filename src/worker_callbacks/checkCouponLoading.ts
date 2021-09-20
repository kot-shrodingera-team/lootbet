import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import {
  log,
  getElement,
  awaiter,
  getRemainingTimeout,
  checkCouponLoadingError,
  checkCouponLoadingSuccess,
  text,
} from '@kot-shrodingera-team/germes-utils';
import { StateMachine } from '@kot-shrodingera-team/germes-utils/stateMachine';

// const loaderSelector = '';
// const errorSelector = '';
// const betPlacedSelector = '';

let loaderSelector: string;
let errorSelector: string;
let betPlacedSelector: string;
let contextBet: Document;

function checkPath() {
  if (window.location.pathname.match(/^\/$/)) {
    contextBet = document;
  }
  if (window.location.pathname.match(/^(\/sports)/)) {
    contextBet = document.querySelector<HTMLIFrameElement>(
      '.iframe-container iframe'
    ).contentDocument;
  }
  return contextBet;
}
// let cont = checkPath();

if (window.location.pathname.match(/^\/$/)) {
  loaderSelector = '.betting-process [role="progressbar"]';
  errorSelector = '.errrr';
  betPlacedSelector = '.betting-status > .betting-accept';
  // cont = document;
}

if (window.location.pathname.match(/^(\/sports)/)) {
  loaderSelector = '.btn_loading';
  // errorSelector = '.bets__item-error';
  errorSelector = '.bets__item-error';
  betPlacedSelector = '.coupon-message._success';
  // cont = document.querySelector<HTMLIFrameElement>(
  //   '.iframe-container iframe'
  // ).contentDocument;
}
const asyncCheck = async () => {
  const machine = new StateMachine();

  machine.promises = {
    loader: () =>
      getElement(loaderSelector, getRemainingTimeout(), checkPath()),
    error: () => getElement(errorSelector, getRemainingTimeout(), checkPath()),
    betPlaced: () =>
      getElement(betPlacedSelector, getRemainingTimeout(), checkPath()),
  };

  machine.setStates({
    start: {
      entry: async () => {
        log('Начало обработки ставки', 'steelblue');
      },
    },
    loader: {
      entry: async () => {
        log('Появился индикатор', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = 'индикатор';
        delete machine.promises.loader;
        machine.promises.loaderDissappeared = () =>
          awaiter(
            () => checkPath().querySelector(loaderSelector) === null,
            getRemainingTimeout()
          );
      },
    },
    loaderDissappeared: {
      entry: async () => {
        log('Исчез индикатор', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = null;
        delete machine.promises.loaderDissappeared;
      },
    },
    error: {
      entry: async () => {
        log('Появилась ошибка', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = null;
        const errorText = text(machine.data.result);
        log(errorText, 'tomato');
        worker.Helper.SendInformedMessage(errorText);
        checkCouponLoadingError({});
      },
      final: true,
    },
    betPlaced: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        checkCouponLoadingSuccess('Ставка принята');
      },
      final: true,
    },
    timeout: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        checkCouponLoadingError({
          botMessage: 'Не дождались результата ставки',
          informMessage: 'Не дождались результата ставки',
        });
      },
      final: true,
    },
  });

  machine.start('start');
};

const checkCouponLoading = checkCouponLoadingGenerator({
  asyncCheck,
});
export default checkCouponLoading;
