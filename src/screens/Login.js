import { gql, useMutation } from '@apollo/client';
import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { logUserIn } from '../apollo';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
import Input from '../components/auth/Input';
import Separator from '../components/auth/Separator';
import PageTitle from '../components/PageTitle';
import routes from '../routes';

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
  margin-top: 5px;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export default function Login() {
  const location = useLocation();
  const { register, handleSubmit, formState, setError, clearErrors, setValue } =
    useForm({
      mode: 'onChange',
      defaultValues: {
        username: location.state?.username ?? '',
        password: location.state?.password ?? '',
      },
    });

  const onCompleted = ({ login: { ok, error, token } }) => {
    if (!ok) {
      return setError('result', { message: error });
    }
    logUserIn(token);
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

  const onSubmitValid = variables => {
    if (loading) return;
    login({ variables });
  };

  const onChange = event => {
    clearErrors('result');
    setValue(event.target.name, event.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        {location.state && (
          <Notification>{location.state.message}</Notification>
        )}
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('username', {
              required: 'Username is required.',
            })}
            onChange={onChange}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors.username?.message)}
          />
          <FormError message={formState.errors.username?.message} />
          <Input
            {...register('password', {
              required: 'Password is required.',
              minLength: {
                value: 3,
                message: 'Password must be at least 3 characters.',
              },
            })}
            onChange={onChange}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors.password?.message)}
          />
          <FormError message={formState.errors.password?.message} />
          <Button
            type="submit"
            value={loading ? 'Loading...' : 'Log in'}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}
