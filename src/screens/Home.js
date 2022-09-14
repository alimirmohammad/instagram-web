import { gql, useQuery } from '@apollo/client';
import Photo from '../components/feed/Photo';
import PageTitle from '../components/PageTitle';

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        avatar
        username
      }
      file
      caption
      likes
      comments {
        id
        user {
          username
          avatar
        }
        text
        isMine
        createdAt
      }
      commentNumber
      createdAt
      isMine
      isLiked
    }
  }
`;

export default function Home() {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map(photo => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}
