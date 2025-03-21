import styled from 'styled-components';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import CurrencyConverterPage from './CurrencyConverterPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  line-height: 1.1;
  text-align: center;
`;

const App = () => {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <AppContainer>
        <Title>CZK Currency Converter</Title>
        <CurrencyConverterPage />
      </AppContainer>
    </PersistQueryClientProvider>
  );
};

export default App;
