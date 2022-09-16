import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const TOKEN = 'TOKEN';
const DARK_MODE = 'DARK_MODE';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: obj => `User:${obj.username}`,
      },
    },
  }),
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
