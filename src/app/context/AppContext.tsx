import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from 'react';

type AppContextValue = {
  isVisible : boolean;
  onChangeVisible : (v: boolean) => void;
  searchValue: any;
  onChangeSearchValue: (v: any) => void;
};

export const AppContext = createContext<AppContextValue | null>({
  isVisible: false,
  onChangeVisible: () => false,
  searchValue: '',
  onChangeSearchValue: () => '',
});
AppContext.displayName = 'AppContext';

export const useApp = () => useContext(AppContext) as AppContextValue;

type Props = { children?: ReactNode };

export const AppProvider = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<any>('');

  const onChangeVisible = useCallback(
    (newVisible: boolean) => {
      setIsVisible(!newVisible);
    },
    [isVisible]
  );

  const onChangeSearchValue = useCallback(
    (newSearchValue: any) => {
      setSearchValue(newSearchValue);
    },
    [isVisible]
  );

  return (
    <AppContext.Provider
      value={{ isVisible, onChangeVisible, searchValue, onChangeSearchValue }}
    >
      {children}
    </AppContext.Provider>
  );
}