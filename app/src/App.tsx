import React from 'react';
import styled from 'styled-components';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import CurrencyList from './CurrencyList';

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
  width: 100%;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--color);
  font-family: var(--font-family);
`;

const Title = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
  color: inherit;
`;

const App = () => {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <AppContainer>
        <Title>Currency Converter</Title>
        <CurrencyList />
      </AppContainer>
    </PersistQueryClientProvider>
  );
};

export default App;
