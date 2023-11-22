import { useAppBridge } from '@saleor/app-sdk/app-bridge';

export const Config = () => {
  const { appBridgeState } = useAppBridge();

  if (appBridgeState?.ready) {
    return (
      <div>
        <pre>
          <code>{JSON.stringify(appBridgeState, null, 2)}</code>
        </pre>
      </div>
    );
  } else {
    return null;
  }
};