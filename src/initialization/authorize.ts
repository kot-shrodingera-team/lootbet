import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
import { authElementSelector } from '../stake_info/checkAuth';
import { updateBalance, balanceReady } from '../stake_info/getBalance';
import afterSuccesfulLogin from './afterSuccesfulLogin';

const setLoginType = async (): Promise<boolean> => {
  return true;
};

const beforeSubmitCheck = async (): Promise<boolean> => {
  return true;
};

const authorize = authorizeGenerator({
  openForm: {
    selector: '.loginBlock a.login',
    openedSelector: '.LoginSignup',
    loopCount: 10,
    triesInterval: 1000,
    afterOpenDelay: 100,
  },
  setLoginType,
  loginInputSelector: '[formcontrolname="email"]',
  passwordInputSelector: '[formcontrolname="password"]',
  submitButtonSelector: '.modal-content button.auth-btn',
  inputType: 'fireEvent',
  fireEventNames: ['input'],
  beforeSubmitDelay: 500,
  beforeSubmitCheck,
  captchaSelector: '.rc-imageselect-payload',
  loginedWait: {
    loginedSelector: authElementSelector,
    timeout: 5000,
    balanceReady,
    updateBalance,
    afterSuccesfulLogin,
  },
  context: () => document,
});

export default authorize;
