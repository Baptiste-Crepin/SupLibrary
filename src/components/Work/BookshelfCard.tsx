import { useBookshelf } from "@hooks/UseWork";
import { Button, Card, CardContent, CardHeader, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router";


export default function BookshelfCard({ workKey }: { workKey: string }) {
  const navigate = useNavigate();
  const { isLoading, data, isError, error } = useBookshelf(workKey);

  const rows = useMemo(() => {
    if (!data) return [];
    return [
      { name: 'want to read', amount: data?.counts?.want_to_read },
      { name: 'currently reading', amount: data?.counts?.currently_reading },
      { name: 'already read', amount: data?.counts?.already_read },
    ];
  }, [data]);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
  }

  if (isError && error) {
    return (
      <div className="error">

        <Typography variant="h6" gutterBottom>
          {error.status === 404
            ? "Those bookshelves might have been removed or doesn't exist."
            : "An error occurred while loading the work."}
        </Typography>

        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go back to the home page
        </Button>
      </div>
    );
  }

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <CardHeader title="Bookshelves Details" />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}