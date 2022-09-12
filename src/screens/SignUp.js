import { gql, useMutation } from '@apollo/client';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
import Input from '../components/auth/Input';
import PageTitle from '../components/PageTitle';
import { FatLink } from '../components/shared';
import routes from '../routes';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function SingUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState,
    setError,
    clearErrors,
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  const onCompleted = ({ createAccount: { ok, error } }) => {
    if (!ok) {
      return setError('result', { message: error });
    }
    const { username, password } = getValues();
    navigate(routes.home, {
      state: { message: 'Account created. Please log in.', username, password },
    });
  };

  const [login, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

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
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('firstName', { required: 'First Name is required.' })}
            onChange={onChange}
            type="text"
            placeholder="First Name"
            hasError={Boolean(formState.errors.firstName?.message)}
          />
          <FormError message={formState.errors.firstName?.message} />
          <Input
            {...register('lastName')}
            onChange={onChange}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register('email', { required: 'Email is required.' })}
            onChange={onChange}
            type="text"
            placeholder="Email"
            hasError={Boolean(formState.errors.email?.message)}
          />
          <FormError message={formState.errors.email?.message} />
          <Input
            {...register('username', { required: 'Username is required.' })}
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
            value={loading ? 'Loading...' : 'Sign up'}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}
