import { createContext, useState } from "react";

const searchContext = createContext({
  keyword: "",
  search: false,
  setKeyword: () => {},
  setSearch: () => {},
});

export default searchContext;

// create and export the context Provider
export function SearchContextProvider(props) {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);

  const updateKeyword = (newValue) => {
    setKeyword(newValue)
  }
  const updateSearch = () => {
    setSearch(!search)
  }

  return (
    <searchContext.Provider value={
      {keyword, setKeyword: updateKeyword, search, setSearch: updateSearch}
    }>
      {props.children}
    </searchContext.Provider>
  );
}