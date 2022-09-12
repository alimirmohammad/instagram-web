import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { darkTheme, GlobalStyles, lightTheme } from './styles';
import { client, darkModeVar, isLoggedInVar } from './apollo';
import routes from './routes';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import SignUp from './screens/SignUp';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                path={routes.home}
                element={isLoggedIn ? <Home /> : <Login />}
              />
              {!isLoggedIn && (
                <Route path={routes.signUp} element={<SignUp />} />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}
