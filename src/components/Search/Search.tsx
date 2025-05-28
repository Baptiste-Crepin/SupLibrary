import { useSearch } from '@hooks/UseSearch';
import {
  Box,
  ClickAwayListener,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Skeleton,
  TextField,
  Typography
} from '@mui/material';
import {
  useEffect,
  useRef,
  useState
} from 'react';
import { useNavigate } from 'react-router';
import { useDebounce } from 'use-debounce';

export default function Search() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);
  const { isLoading, data } = useSearch(debouncedQuery);
  const navigate = useNavigate();
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [query, isLoading, data]);

  const handleResultClick = (bookKey: string) => {
    setQuery("");
    setOpen(false);
    navigate(bookKey);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{ position: 'relative', width: { xs: 200, sm: 400, md: 1000 } }}>
        <TextField
          ref={anchorRef}
          fullWidth
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher un livre..."
          variant="outlined"
        />

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          style={{ zIndex: 1300, width: anchorRef.current?.offsetWidth ?? 300 }}
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 4],
              },
            },
          ]}
        >
          <Paper
            elevation={8}
            sx={{
              maxHeight: 400,
              overflow: 'auto',
              mt: 0.5,
            }}
          >
            {isLoading ? (
              <Box sx={{ p: 2 }}>
                <Skeleton variant="text" height={24} />
                <Skeleton variant="text" height={24} />
              </Box>
            ) : (
              <List dense disablePadding>
                {data?.docs?.slice(0, 8).map((document) => (
                  <ListItem key={document.key} disablePadding>
                    <ListItemButton
                      onClick={() => handleResultClick(document.key)}
                    >
                      <ListItemText
                        primary={`${document.title} (${document.first_publish_year})`}
                        secondary={
                          document.author_name?.length > 0
                            ? `By ${document.author_name.slice(0, 2).join(', ')}`
                            : null
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}

                {data && (data?.numFound ?? 0) > 8 && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="caption" color="text.secondary" align="center">
                          +{data.numFound - 8} more results
                        </Typography>
                      }
                    />
                  </ListItem>
                )}

                {data && data.numFound === 0 && query == debouncedQuery && data?.q.trim() && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="body2" color="text.secondary" align="center">
                          No books found for "{data?.q.trim()}"
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>
            )}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener >
  );
}