import AuthorDetail from "@components/Author/AuthorDetail";
import AuthorName from "@components/Author/AuthorName";
import WikipediaDetailsCard from "@components/Wikipedia/WikipediaDetailsCard";
import { useWork } from "@hooks/UseWork";
import { Box, Button, Card, CardContent, Chip, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { formatDate } from "utils";


export default function WorkDetail({ workKey }: { workKey: string }) {
  const navigate = useNavigate();
  const { isLoading, data, isError, error } = useWork(workKey);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
  }

  if (isError && error) {
    return (
      <div className="error">

        <Typography variant="h6" gutterBottom>
          {error.status === 404
            ? "This work might have been removed or doesn't exist."
            : "An error occurred while loading the work."}
        </Typography>

        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go back to the home page
        </Button>
      </div>
    );
  }

  return (
    <Stack spacing={4}>
      {/* Main Book Card */}
      <Card>
        <CardContent>
          {/* Cover Image - Mobile First */}
          {data?.covers?.[0] && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 2
              }}
            >
              <Box
                component="img"
                sx={{
                  maxWidth: '100%',
                  maxHeight: 300,
                  objectFit: 'contain',
                  borderRadius: 1
                }}
                alt={`Cover of ${data.title}`}
                src={`https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`}
              />
            </Box>
          )}

          {/* Title */}
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem' },
              lineHeight: 1.2,
              mb: 1
            }}
          >
            {data?.title} {data?.first_publish_date && (data?.first_publish_date)}
          </Typography>

          {/* Authors */}
          {data?.authors && data?.authors?.length > 0 && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
            >
              By {data?.authors?.map((author, index) => (
                <span key={author.author.key}>
                  {index > 0 && ', '}
                  <AuthorName authorKey={author.author.key} />
                </span>
              ))}
            </Typography>
          )}

          {/* Publication Date */}
          {data?.first_publish_date && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              First published: {data.first_publish_date}
            </Typography>
          )}

          {/* Description */}
          {data?.description && (
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                lineHeight: 1.6,
                fontSize: { xs: '0.95rem', sm: '1rem' }
              }}
            >
              {typeof data.description === 'string' ? data.description : data.description.value}
            </Typography>
          )}

          {/* Subjects */}
          {data?.subjects && data?.subjects?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Subjects
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {data.subjects.slice(0, 8).map((subject, index) => (
                  <Chip
                    key={index}
                    label={subject}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
                {data.subjects.length > 8 && (
                  <Chip
                    label={`+${data.subjects.length - 8} more`}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                )}
              </Stack>
            </Box>
          )}

          {/* Subject Places */}
          {data?.subject_places && data?.subject_places?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Places
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {data.subject_places.slice(0, 5).map((place, index) => (
                  <Chip
                    key={index}
                    label={place}
                    size="small"
                    variant="outlined"
                    color="secondary"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Subject People */}
          {data?.subject_people && data?.subject_people?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                People
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {data.subject_people.slice(0, 5).map((person, index) => (
                  <Chip
                    key={index}
                    label={person}
                    size="small"
                    variant="outlined"
                    color="info"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Subject Times */}
          {data?.subject_times && data?.subject_times?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Time Periods
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {data.subject_times.slice(0, 3).map((time, index) => (
                  <Chip
                    key={index}
                    label={time}
                    size="small"
                    variant="outlined"
                    color="warning"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Metadata */}
          <Divider sx={{ my: 2 }} />
          <Stack spacing={1}>
            {data?.type?.key && (
              <Typography variant="caption" color="text.secondary">
                Type: {data.type.key.replace('/type/', '')}
              </Typography>
            )}

            {data?.latest_revision && (
              <Typography variant="caption" color="text.secondary">
                Latest revision: {data.latest_revision}
              </Typography>
            )}

            {data?.created && (
              <Typography variant="caption" color="text.secondary">
                Created: {formatDate(data.created.value)}
              </Typography>
            )}

            {data?.updated && (
              <Typography variant="caption" color="text.secondary">
                Last updated: {formatDate(data.created.value)}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Wikipedia Details */}
      {data?.links && data?.links?.length > 0 && (
        data.links
          .filter(x => x.url.includes('wikipedia.org'))
          .map((link) => (
            <WikipediaDetailsCard key={link.title} wikipediaUrl={link.url} />
          ))
      )}

      {/* Author Details Card */}
      {data?.authors && data?.authors?.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Author Details
            </Typography>
            <AuthorDetail authorKey={data.authors[0].author.key} />
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}