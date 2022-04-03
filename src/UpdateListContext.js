import { createContext, useState } from "react";

const listContext = createContext({
  needsUpdate: false,
  setNeedsUpdate: () => {},
});

export default listContext;

// create and export the context Provider
export function ListContextProvider(props) {
  const [needsUpdate, setNeedsUpdate] = useState(false);

  const updateNeedsUpdate = (newValue) => {
    setNeedsUpdate(newValue)
  }
 
  return (
    <listContext.Provider value={
      {needsUpdate, setNeedsUpdate: updateNeedsUpdate}
    }>
      {props.children}
    </listContext.Provider>
  );
}