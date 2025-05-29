import { useAuthor } from "@hooks/UseAuthor";
import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import {
  useNotifications,
} from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import AuthorDetail from "./AuthorDetail";

export default function AuthorDetailCard({ authorKey }: { authorKey: string }) {
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
    <Card>
      <CardHeader title="Author Details" />
      <CardContent>
        <AuthorDetail authorKey={authorKey} />
      </CardContent>
    </Card>
  );
}