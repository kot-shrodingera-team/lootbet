import getStakeInfoValueGenerator, {
  stakeInfoValueReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getStakeInfoValue';
import { StakeInfoValueOptions } from '@kot-shrodingera-team/germes-generators/stake_info/types';
import { awaiter, log, sleep } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import getBalance from './getBalance';

// export const maximumStakeSelector = '';
export const maximumStakeRefresh = async (): Promise<void> => {
  const context = window.germesData.rsFrame.contentDocument;
  let maxSumEl;
  if (window.location.pathname.match(/^\/$/)) {
    // document.querySelector<HTMLInputElement>('.calc-bet > form > input').value =
    // '0';
    document.querySelector<HTMLElement>('.stavka button.max').click();

    await sleep(500);
    maxSumEl = document.querySelector<HTMLInputElement>(
      '.calc-bet > form > input'
    ).value;
    await sleep(200);
    window.germesData.maximumStake = Number(maxSumEl);
    log('Обновили максимум', 'steelblue');
    await sleep(500);
    document.querySelector<HTMLInputElement>('.calc-bet > form > input').value =
      '0';
  }

  if (window.location.pathname.match(/^(\/sports)/)) {
    const maxBetButton = context.querySelector<HTMLElement>(
      '.coupon__maxbet-btn'
    );

    if (!maxBetButton) {
      log(
        'Отсутствует кнопка максимальной ставки, перезагружаем страницу',
        'crimson'
      );
      window.location.reload();
      // throw new JsFailError('Отсутствует кнопка максимальной ставки');
    }
    const initialValue = context.querySelector<HTMLInputElement>(
      'input.coupon__odd-input'
    ).value;
    context.querySelector<HTMLElement>('.coupon__maxbet-btn').click();

    const maxAppeared = await awaiter(
      () =>
        context.querySelector<HTMLInputElement>('input.coupon__odd-input')
          .value !== initialValue
    );
    if (!maxAppeared) {
      throw new JsFailError('Максимальная ставка не появилась');
    }
    maxSumEl = context.querySelector<HTMLInputElement>(
      'input.coupon__odd-input'
    ).value;
    log(`Появилась максимальная ставка (${maxSumEl})`, 'cadetblue');
    window.germesData.maximumStake = Number(maxSumEl);
    log('Обновили максимум', 'steelblue');
    context.querySelector<HTMLInputElement>('input.coupon__odd-input').value =
      '';
  }
};

const maximumStakeOptions: StakeInfoValueOptions = {
  name: 'maximumStake',
  fixedValue: () => window.germesData.maximumStake,
  // valueFromText: {
  //   text: {
  //     // getText: () => '',
  //     selector: maximumStakeSelector,
  //     context: () => document,
  //   },
  //   replaceDataArray: [
  //     {
  //       searchValue: '',
  //       replaceValue: '',
  //     },
  //   ],
  //   removeRegex: /[\s,']/g,
  //   matchRegex: /(\d+(?:\.\d+)?)/,
  //   errorValue: 0,
  // },
  zeroValues: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modifyValue: (value: number, extractType: string) => value,
  disableLog: false,
};

const getMaximumStake = getStakeInfoValueGenerator(maximumStakeOptions);

export const maximumStakeReady =
  stakeInfoValueReadyGenerator(maximumStakeOptions);

export default getMaximumStake;
