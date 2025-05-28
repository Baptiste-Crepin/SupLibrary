import { useBook } from "@hooks/UseBook";
import { Skeleton } from "@mui/material";
import {
  useNotifications,
} from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";

export default function BookDetail({ bookKey }: { bookKey: string }) {
  const notifications = useNotifications();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useBook(bookKey);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
  }

  if (isError) {
    console.log(isLoading, isError, data);
    notifications.show('Error whilst loading book', {
      severity: 'error',
      autoHideDuration: 3000,
    })

    navigate('/', { replace: true });
    return null;
  }

  return (
    <>
      {data?.title}
    </>
  );
}