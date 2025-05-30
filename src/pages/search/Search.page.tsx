import WorkDetailCard from '@components/Work/WorkDetailCard';
import { useAdvancedSearch, type AdvancedSearchFilters } from '@hooks/UseSearch';
import { ExpandMore as ExpandMoreIcon, Search as SearchIcon } from '@mui/icons-material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Skeleton,
  Stack,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDebounce } from 'use-debounce';

const defaultFilters: AdvancedSearchFilters = {
  title: '',
  author: '',
  subject: '',
  place: '',
  person: '',
  language: '',
  ebookAccess: '',
};

const languages = [
  { code: 'eng', name: 'English' },
  { code: 'spa', name: 'Spanish' },
  { code: 'fre', name: 'French' },
  { code: 'ger', name: 'German' },
  { code: 'ita', name: 'Italian' },
  { code: 'jpn', name: 'Japanese' },
  { code: 'mul', name: 'Multiple Languages' },
  { code: 'und', name: 'Undetermined' }
];


export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [filters, setFilters] = useState<AdvancedSearchFilters>(defaultFilters);
  const [debouncedFilters] = useDebounce(filters, 300);
  const [limit] = useState(6);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { isLoading, data, isError } = useAdvancedSearch(debouncedSearchQuery, debouncedFilters, limit, ((page - 1) * limit));

  useEffect(() => {
    setPage(1);
  }, [debouncedFilters, debouncedSearchQuery]);

  const handlePaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDeleteChip = (key: keyof AdvancedSearchFilters) => {
    setFilters(prev => ({ ...prev, [key]: '' }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (field: keyof AdvancedSearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const activeFilters = Object
    .entries(filters)
    .filter(([_, value]) => value !== null && value?.toString()?.trim() !== '');


  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ padding: 2 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <LocalLibraryIcon onClick={() => navigate('/')} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              minWidth: 'max-content',
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            SupLibrary
          </Typography>

          {/* Search Bar */}

          <TextField
            sx={{
              width: '100%',
              px: { xs: 1, sm: 2 },
              py: 1
            }}
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>

        {/* Main Layout */}
        <Grid container spacing={3}>
          {/* Filters Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper elevation={1} sx={{ p: 2, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Advanced Filters
              </Typography>

              {/* Basic Fields */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Basic Search Fields</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <TextField
                      size="small"
                      label="Title"
                      value={filters.title}
                      onChange={(e) => handleFilterChange('title', e.target.value)}
                      placeholder="e.g., flammable"
                    />
                    <TextField
                      size="small"
                      label="Author"
                      value={filters.author}
                      onChange={(e) => handleFilterChange('author', e.target.value)}
                      placeholder="e.g., solnit"
                    />
                    <TextField
                      size="small"
                      label="Subject"
                      value={filters.subject}
                      onChange={(e) => handleFilterChange('subject', e.target.value)}
                      placeholder="e.g., tennis rules"
                    />
                    <TextField
                      size="small"
                      label="Place"
                      value={filters.place}
                      onChange={(e) => handleFilterChange('place', e.target.value)}
                      placeholder="e.g., lisbon"
                    />
                    <TextField
                      size="small"
                      label="Person"
                      value={filters.person}
                      onChange={(e) => handleFilterChange('person', e.target.value)}
                      placeholder="e.g., rosa parks"
                    />
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* Common Subjects */}

              {/* Language & Format */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Language</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Language</InputLabel>
                      <Select
                        value={filters.language}
                        onChange={(e) => handleFilterChange('language', e.target.value)}
                        label="Language"
                      >
                        <MenuItem value="">All Languages</MenuItem>
                        {languages?.map((lang) => (
                          <MenuItem key={lang.code} value={lang.code}>
                            {lang.name} ({lang.code})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </Paper>
          </Grid>

          {/* Results Main Area */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">
                Search Results
              </Typography>
              {data && data.numFound && (
                <Typography variant="body2" color="text.secondary">
                  {data.numFound} results
                </Typography>
              )}
            </Box>

            {/* Active Filters Display */}
            {activeFilters.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>Active Filters:</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {activeFilters.map(([key, value]) => (
                    <Chip
                      key={key}
                      label={`${key}: ${value}`}
                      size="small"
                      onDelete={() => handleDeleteChip(key as keyof AdvancedSearchFilters)}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {isError ? <Typography variant='h6'>Error fetching the requested data, try again later</Typography> : (
              <>
                {/* Results Grid/List */}
                < Grid container spacing={2}>
                  {/* Placeholder for search results */}
                  {isLoading && Array.from({ length: limit }, (_, i) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={i}>
                      <Skeleton variant="rectangular" height={250} />
                    </Grid>
                  ))}

                  {!isLoading && data && data.docs?.map((item) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={item.key}>
                      <WorkDetailCard workKey={item.key} />
                    </Grid>
                  ))}

                </Grid>
              </>
            )}

            {/* Pagination */}
            {data && data?.numFound > limit && (
              <Stack alignItems="center" sx={{ width: '100%', mt: 4 }}>
                <Pagination
                  color='primary'
                  count={Math.ceil(data.numFound / limit)}
                  page={page}
                  onChange={handlePaginationChange}
                />
              </Stack>
            )}

          </Grid >
        </Grid>
      </Box >
    </>
  );
}