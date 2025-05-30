import { useAuthor } from "@hooks/UseAuthor";
import { Skeleton, Typography } from "@mui/material";
import {
  useNotifications,
} from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";

export default function AuthorSummary({ authorKey }: { authorKey: string }) {
  const notifications = useNotifications();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useAuthor(authorKey);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
  }

  if (isError) {
    console.log(isLoading, isError, data);
    notifications.show('Error whilst loading work', {
      severity: 'error',
      autoHideDuration: 3000,
    })

    navigate('/', { replace: true });
    return null;
  }

  return (
    <>
      {/* Name */}
      <Typography component='span' variant='body1' gutterBottom>
        {data?.name || data?.personal_name}
      </Typography>
    </>
  );
}