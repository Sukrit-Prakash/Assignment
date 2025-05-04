export default function InviteList({ invites }) {
    return (
      <ul>
        {invites.map(i => (
          <li key={i.token}>
            {i.email} — {i.status}
          </li>
        ))}
      </ul>
    );
  }
  