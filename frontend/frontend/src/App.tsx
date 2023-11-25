import { AppBridge, AppBridgeProvider } from '@saleor/app-sdk/app-bridge';
import { Box, Text, ThemeProvider } from '@saleor/macaw-ui';
import '@saleor/macaw-ui/style';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Config } from './Config';

const ab = new AppBridge();

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppBridgeProvider appBridgeInstance={ab}>
          <Box margin={5}>
            <Text variant="hero">Last order exports jobs</Text>
            <Config />
          </Box>
        </AppBridgeProvider>{' '}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
