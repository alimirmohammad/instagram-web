import { logUserOut } from '../apollo';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={logUserOut}>Logout now!</button>
    </div>
  );
}
