import { useSearch } from '@hooks/UseSearch';
import BookIcon from '@mui/icons-material/Book';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Skeleton,
  Stack,
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
  const { isLoading, data } = useSearch(debouncedQuery, 20);
  const navigate = useNavigate();
  const anchorRef = useRef<HTMLDivElement>(null);

  const skeletonIterations = 5;


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
    <Stack
      direction="row"
      spacing={1}
      alignItems="stretch"
      sx={{
        width: '100%',
        px: { xs: 1, sm: 2 },
        py: 1
      }}
    >
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box sx={{
          position: 'relative',
          flex: 1,
          minWidth: 0
        }}>
          <TextField
            ref={anchorRef}
            fullWidth
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for books, authors, genres..."
            color='primary'
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: { xs: 2, sm: 1 },
                }
              },
            }}
          />
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement="bottom-start"
            style={{
              zIndex: 1300,
              width: anchorRef.current?.offsetWidth ?? 300,
              maxWidth: '100vw'
            }}
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 4],
                },
              },
              {
                name: 'preventOverflow',
                options: {
                  boundary: 'viewport',
                  padding: 8,
                },
              },
            ]}
          >
            <Paper
              elevation={8}
              sx={{
                maxHeight: { xs: '60vh', sm: 400 },
                overflow: 'auto',
                mt: 0.5,
                mx: { xs: 1, sm: 0 },
                borderRadius: { xs: 2, sm: 1 },
              }}
            >
              {isLoading ? (
                <List dense disablePadding>
                  {Array.from({ length: skeletonIterations }, (_, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Skeleton variant="rectangular" width={40} height={56} />
                      </ListItemAvatar>
                      <Box sx={{ p: 2, width: '100%' }}>
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={24} />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <List dense disablePadding>
                  {data?.docs?.map((document) => (
                    <ListItem key={document.key} disablePadding>
                      <ListItemButton
                        onClick={() => handleResultClick(document.key)}
                        sx={{
                          py: { xs: 1.5, sm: 1 },
                          px: 2,
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: 40,
                              height: 56,
                              mr: 1,
                              bgcolor: 'grey.100'
                            }}
                            src={`https://covers.openlibrary.org/b/olid/${document.cover_edition_key}-S.jpg`}
                          >
                            <BookIcon color="disabled" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              noWrap={false}
                              sx={{
                                fontWeight: 500,
                                lineHeight: 1.3
                              }}
                            >
                              {document.title}
                            </Typography>
                          }
                          secondary={
                            <>
                              {document.author_name?.length > 0 && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  display="block"
                                >
                                  {document.author_name.slice(0, 2).join(', ')}
                                </Typography>
                              )}
                              {document.first_publish_year && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ opacity: 0.7 }}
                                >
                                  {document.first_publish_year}
                                </Typography>
                              )}
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {data && (data?.numFound ?? 0) > 8 && (
                    <ListItem sx={{ py: 1 }}>
                      <ListItemText
                        primary={
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            align="center"
                            sx={{ fontStyle: 'italic' }}
                          >
                            +{data.numFound - 8} more results
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {data && data.numFound === 0 && query == debouncedQuery && data?.q.trim() && (
                    <ListItem sx={{ py: 2 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ textAlign: 'center', py: 1 }}>
                            <SearchOffIcon
                              color="disabled"
                              sx={{ fontSize: 40, mb: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              No books found for "{data?.q.trim()}"
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Try different keywords
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  )}
                </List>
              )}
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/search')}
        sx={{
          minWidth: { xs: 44, sm: 56 },
          height: { xs: 44, sm: 40 },
          borderRadius: { xs: 2, sm: 1 },
          px: { xs: 0, sm: 2 },
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: 2,
          },
          transition: 'all 0.2s ease-in-out'
        }}
        aria-label="Advanced search filters"
      >
        <FilterAltIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
        <Typography
          variant="caption"
          sx={{
            ml: 1,
            display: { xs: 'none', sm: 'block' },
            fontWeight: 600
          }}
        >
          Filter
        </Typography>
      </Button>
    </Stack>
  );
}