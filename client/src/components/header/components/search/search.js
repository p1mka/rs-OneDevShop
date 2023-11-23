import { request } from "../../../../utils";
import { Icon } from "../../../icon/icon";
import { Input } from "../../../input/input";
import { useEffect, useMemo, useState } from "react";
import { SearchResults } from "./components";
import { debounce } from "./utils";
import styled from "styled-components";

const SearchContainer = ({ className }) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearchResultsLoading, setIsSearchResultsLoading] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    request(`/products?search=${searchPhrase}`)
      .then(({ error, data }) => setSearchResults(data))
      .finally(() => setIsSearchResultsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSearch]);

  const startSearch = useMemo(() => debounce(setShouldSearch, 800), []);

  const onSearchInputChange = ({ target }) => {
    setSearchPhrase(target.value);
    setShowResults(true);
    setIsSearchResultsLoading(true);
    startSearch(!shouldSearch);
  };
  const onOutsideClick = () => {
    setSearchPhrase("");
    if (showResults) {
      setShowResults(false);
    }
  };

  return (
    <div className={className}>
      <Input
        border="none"
        width="90%"
        placeholder="Поиск по названию"
        value={searchPhrase}
        onChange={onSearchInputChange}
      />
      <Icon id="la-search" size="24px" margin="0 0.2rem 0 0" rotate="true" />
      {showResults && searchPhrase && (
        <SearchResults
          show={showResults}
          isSearchResultsLoading={isSearchResultsLoading}
          results={searchResults || []}
          onOutsideClick={onOutsideClick}
        />
      )}
    </div>
  );
};

export const Search = styled(SearchContainer)`
  display: flex;
  align-items: center;
  border: 2px solid #2f9ca3;
  border-radius: 0.25rem;
  width: 30%;
`;
