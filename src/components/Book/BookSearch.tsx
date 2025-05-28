import { useSearch } from "@hooks/UseSearch";
import { Skeleton } from "@mui/material";
import { useState } from "react";
import { useDebounce } from 'use-debounce';

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const { isLoading, data } = useSearch(debouncedQuery);


  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un livre"
      />

      {isLoading ? (
        <Skeleton variant="rectangular" height={20} />
      ) :
        (data?.numFound ?? 0) > 0 && (
          data?.docs?.map((document) => (

            <div key={document.key} style={{ marginBottom: 10 }}>
              <a href={`${document.key}`}>{document.title}</a>
            </div>
          ))
        )
      }
    </>
  );
}