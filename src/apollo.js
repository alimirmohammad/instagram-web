import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

const TOKEN = 'TOKEN';
const DARK_MODE = 'DARK_MODE';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
export function logUserIn(token) {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
}
export function logUserOut() {
  localStorage.removeItem(TOKEN);
  window.history.replaceState({}, document.title);
  window.location.reload();
}
export function enableDarkMode() {
  localStorage.setItem(DARK_MODE, 'enabled');
  darkModeVar(true);
}
export function disableDarkMode() {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
}