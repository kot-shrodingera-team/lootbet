import {
  awaiter,
  getElement,
  log,
  sleep,
} from '@kot-shrodingera-team/germes-utils';
import setFrameReference from './helpers/setFrameReference';

const preOpenBet = async (): Promise<void> => {
  // if (window.location.pathname === '/sports') {
  await setFrameReference();
  // const contentElement = await getElement(
  //   '.game-event__markets',
  //   5000,
  //   window.germesData.rsFrame.contentDocument
  // );
  // await awaiter(() => contentElement, 1000, 10);
  // if (contentElement) {
  //   log('Дождались появления кнопок', 'orange');
  // }
};

export default preOpenBet;
