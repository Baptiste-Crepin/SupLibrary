import AuthorName from '@components/Author/AuthorName';
import useRecentChanges from '@hooks/useRecentChanges';
import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import { useState } from 'react';

const cardHeight = 250;

export default function RecentChangeList() {
  const [limit] = useState(32);
  const { isLoading, data } = useRecentChanges(limit);

  return (
    <Grid container spacing={2}>
      {
        isLoading ?
          Array.from({ length: limit }, (_, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={i}>
              <Skeleton variant="rectangular" height={cardHeight} />
            </Grid>
          ))
          :
          (data?.map((item) => {
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={item.id}>
                <Card
                  key={item.id}
                  aria-label={item.id}
                  sx={{ height: cardHeight }}
                >

                  <CardContent>
                    <Typography gutterBottom variant="h5" >
                      {item.kind}
                    </Typography>

                    <Typography >
                      {item.comment}
                    </Typography>

                    {item.changes.map((change, index) => {
                      return (
                        <Typography key={index}>
                          {change.key}
                        </Typography>
                      );
                    })}

                    <Typography >
                      <AuthorName authorKey={item.author.key} />
                    </Typography>

                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                      {new Date(item.timestamp).toLocaleString()}
                    </  Typography>

                  </CardContent>
                </Card>
              </Grid>
            );
          }))
      }
    </Grid>
  );
}