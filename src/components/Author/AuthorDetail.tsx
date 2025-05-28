import { useAuthor } from "@hooks/UseAuthor";
import { Box, Card, CardContent, Chip, Divider, Skeleton, Stack, Typography } from "@mui/material";
import {
  useNotifications,
} from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import { formatDate, getLifeSpan } from "utils";

export default function AuthorDetail({ authorKey }: { authorKey: string }) {
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
      <CardContent>
        {/* Author Photo */}
        {data?.photos?.[0] && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3
            }}
          >
            <Box
              component="img"
              sx={{
                maxWidth: '100%',
                maxHeight: 400,
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: 2
              }}
              alt={`Photo of ${data?.name || data?.personal_name}`}
              src={`https://covers.openlibrary.org/b/id/${data.photos[0]}-L.jpg`}
            />
          </Box>
        )}

        {/* Name */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.125rem' },
            lineHeight: 1.2,
            mb: 1,
            textAlign: 'center'
          }}
        >
          {data?.name || data?.personal_name}
        </Typography>

        {/* Life Span */}
        {getLifeSpan(data?.birth_date, data?.death_date) && (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            {getLifeSpan(data?.birth_date, data?.death_date)}
          </Typography>
        )}

        {/* Biography */}
        {data?.bio && (
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.7,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              textAlign: 'justify'
            }}
          >
            {typeof data.bio === 'string' ? data.bio : data.bio.value}
          </Typography>
        )}

        {/* Alternate Names */}
        {data && data?.alternate_names?.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Also Known As
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {data.alternate_names.map((name, index) => (
                <Chip
                  key={index}
                  label={name}
                  size="medium"
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Remote IDs/External Links */}
        {data?.remote_ids && Object.keys(data.remote_ids).length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              External References
            </Typography>
            <Stack spacing={1}>
              {Object.entries(data.remote_ids).map(([source, id]) => (
                <Box key={source} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={source.toUpperCase()}
                    size="small"
                    color="secondary"
                    variant="filled"
                  />
                  <Typography variant="body2" color="text.secondary">
                    {id}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Source Records */}
        {data && data?.source_records?.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Source Records
            </Typography>
            <Stack spacing={0.5}>
              {data.source_records.slice(0, 5).map((record, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
                >
                  {record}
                </Typography>
              ))}
              {data.source_records.length > 5 && (
                <Typography variant="caption" color="text.secondary">
                  +{data.source_records.length - 5} more records
                </Typography>
              )}
            </Stack>
          </Box>
        )}

        {/* Metadata */}
        <Divider sx={{ my: 3 }} />
        <Stack spacing={1}>
          <Typography variant="h6" gutterBottom>
            Record Information
          </Typography>

          {data?.type?.key && (
            <Typography variant="body2" color="text.secondary">
              <strong>Type:</strong> {data.type.key.replace('/type/', '')}
            </Typography>
          )}

          {data?.key && (
            <Typography variant="body2" color="text.secondary">
              <strong>OpenLibrary ID:</strong> {data.key}
            </Typography>
          )}

          {data?.latest_revision && (
            <Typography variant="body2" color="text.secondary">
              <strong>Latest Revision:</strong> {data.latest_revision}
            </Typography>
          )}

          {data?.created && (
            <Typography variant="body2" color="text.secondary">
              <strong>Record Created:</strong> {formatDate(data.created.value)}
            </Typography>
          )}

          {data?.last_modified && (
            <Typography variant="body2" color="text.secondary">
              <strong>Last Modified:</strong> {formatDate(data.last_modified.value)}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}