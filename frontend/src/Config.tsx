import { useAppBridge } from '@saleor/app-sdk/app-bridge';
import { Box, Text } from '@saleor/macaw-ui';
import { useQuery } from 'react-query';

const fetchLastJobs = () =>
  fetch('http://localhost:3000/erp-order-export/last-jobs').then((r) =>
    r.json(),
  );

export const Config = () => {
  const { appBridgeState } = useAppBridge();
  const { data: lastOrdersJobs, isSuccess } = useQuery(
    'last-jobs',
    fetchLastJobs,
  );

  if (appBridgeState?.ready && isSuccess) {
    return (
      <Box>
        {lastOrdersJobs.map((j: any) => {
          return (
            <Text display={'block'} key={j.id}>
              {j.id} - {j.orderId}
            </Text>
          );
        })}
      </Box>
    );
  } else {
    return null;
  }
};
