// import { useCallback, useEffect, useState } from "react";

// export default function useClientSearch(data = [], { type, valueName }) {
//   const [query, setQuery] = useState("");
//   const [searchResults, setSearchResults] = useState();

//   const handleSearch = useCallback(() => {
//     if (!query) setSearchResults(data);
//     else {
//       if (type === "list") {
//         const filteredResults = data.filter((item) =>
//           item.toLowerCase().includes(query.toLowerCase()),
//         );
//         setSearchResults(filteredResults);
//       }

//       if (type === "obj") {
//         const filteredResults = data.filter((item) =>
//           item[valueName].toLowerCase().includes(query.toLowerCase()),
//         );
//         setSearchResults(filteredResults);
//       }
//     }
//   }, [data, query, type, valueName]);

//   useEffect(() => {
//     handleSearch();
//   }, [handleSearch, query]);

//   return { searchResults, setQuery };
// }

import {  useEffect, useState } from "react";

export default function useClientSearch(data = [], { type, valueName }) {

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    if (!query) setSearchResults(data);
    else {
      if (type === "list") {
        const filteredResults = data.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase()),
        );
        setSearchResults(filteredResults);
      }

      if (type === "obj") {
        const filteredResults = data.filter((item) =>
          item[valueName].toLowerCase().includes(query.toLowerCase()),
        );
        setSearchResults(filteredResults);
      }
    }
  }, [data, query, type, valueName]);


  return { searchResults, setQuery };
}
