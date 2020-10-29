import createContext from "create-react-context";

export const LoadContext = createContext();

export const {
  Provider: LoadContextProvider,
  Consumer: LoadContextConsumer
} = LoadContext;

