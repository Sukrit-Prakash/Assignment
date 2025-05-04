export default function ActivityFeed({ activities }) {
    return (
      <ul>
        {activities.map(a => (
          <li key={a._id}>
            {a.user.username || a.user} {a.action} at{' '}
            {new Date(a.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    );
  }
  