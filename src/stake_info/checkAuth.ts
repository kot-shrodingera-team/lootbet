import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const noAuthElementSelector = '.loginBlock a.login';
export const authElementSelector = '.user-icon';
// export const authElementSelector = '.dropdown-menu_current-balance';

export const authStateReady = authStateReadyGenerator({
  noAuthElementSelector,
  authElementSelector,
  maxDelayAfterNoAuthElementAppeared: 3000,
  context: () => document,
});

const checkAuth = checkAuthGenerator({
  authElementSelector,
  context: () => document,
});

export default checkAuth;
