import '@saleor/macaw-ui/style';
import { Box, Text, ThemeProvider } from '@saleor/macaw-ui';
import { AppBridgeProvider } from '@saleor/app-sdk/app-bridge';

function App() {
  return (
    <ThemeProvider>
      <AppBridgeProvider>
        <Box margin={5}>
          <Text variant="hero">Hello</Text>
        </Box>
      </AppBridgeProvider>
    </ThemeProvider>
  );
}

export default App;
