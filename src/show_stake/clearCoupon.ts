import clearCouponGenerator from '@kot-shrodingera-team/germes-generators/show_stake/clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';
import setFrameReference from './helpers/setFrameReference';

const preCheck = async (): Promise<boolean> => {
  if (window.location.pathname.match(/^(\/sports)/)) {
    await setFrameReference();
  }
  return true;
};

const apiClear = (): void => {
  if (window.location.pathname === '/') {
    const clearAllBtns =
      document.querySelectorAll<HTMLElement>('.header .close');
    clearAllBtns.forEach((btn) => btn.click());
  }

  if (window.location.pathname === '/sports') {
    const clearAllBtns =
      window.germesData.rsFrame.contentDocument.querySelectorAll<HTMLElement>(
        '.bets__item-close'
      );
    clearAllBtns.forEach((btn) => btn.click());
  }
};

const postCheck = async (): Promise<boolean> => {
  return true;
};

const clearCoupon = clearCouponGenerator({
  preCheck,
  getStakeCount,
  apiClear,
  // clearSingleSelector: '.header .close',
  // clearAllSelector: '',
  postCheck,
  context: () => document,
});

export default clearCoupon;
