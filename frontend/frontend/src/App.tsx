import '@saleor/macaw-ui/style';
import { Box, Text, ThemeProvider } from '@saleor/macaw-ui';
import { AppBridge, AppBridgeProvider } from '@saleor/app-sdk/app-bridge';
import { Config } from './Config';

const ab = new AppBridge();

function App() {
  return (
    <ThemeProvider>
      <AppBridgeProvider appBridgeInstance={ab}>
        <Box margin={5}>
          <Text variant="hero">Hello</Text>
          <Config/>
        </Box>
      </AppBridgeProvider>
    </ThemeProvider>
  );
}

export default App;
