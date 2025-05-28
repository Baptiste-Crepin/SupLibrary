import PeopleName from '@components/People/PeopleName';
import useRecentChanges from '@hooks/useRecentChanges';
import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import { useState } from 'react';

const cardHeight = 150;

export default function RecentChangeList() {
  const [limit] = useState(32);
  const { isLoading, isError, data } = useRecentChanges(limit);

  return (
    <Grid container spacing={2}>
      {
        isError ?
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={0}>
            <Typography variant="h5">
              Error
            </Typography>
          </Grid>
          :
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
                    sx={{ minHeight: cardHeight }}
                  >

                    <CardContent>
                      <Typography gutterBottom variant="h5" >
                        {item.kind}
                      </Typography>

                      <Typography gutterBottom variant="h6" >
                        {item.comment}
                      </Typography>

                      {/* {item.changes.filter((_, i) => i < 3).map((change, index) => {
                        return (
                          <div key={index}>
                            <Change key={index} changeKey={change.key} />
                          </div>
                        );
                      })} */}

                      <Typography >
                        <PeopleName peopleKey={item.author.key} />
                      </Typography>

                      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {new Date(item.timestamp).toLocaleString()}
                      </ Typography>

                    </CardContent>
                  </Card>
                </Grid>
              );
            }))
      }
    </Grid>
  );
}