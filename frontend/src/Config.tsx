import { useAppBridge } from '@saleor/app-sdk/app-bridge';
import { Box, Text, Divider, Button } from '@saleor/macaw-ui';
import { useQuery, useMutation } from 'react-query';

const scheduleOrdersExport = (params: { token: string }) =>
  fetch('http://localhost:3000/orders-export/start', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      saleorApiUrl: 'http://localhost:8000/graphql/',
    }),
  }).then((res) => res.json());

// todo replace with SSE
const getJobStatusFetch = (params: { token: string; jobId: string }) =>
  fetch(`http://localhost:3000/orders-export/${params.jobId}/status`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${params.token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

export const Config = () => {
  const { appBridgeState } = useAppBridge();
  const { mutate, data } = useMutation('orders-export', scheduleOrdersExport);
  const { data: jobStatus } = useQuery(['job-status', data?.jobId], {
    refetchInterval: 5000,
    enabled: !!data?.jobId,
    queryFn: () =>
      getJobStatusFetch({ jobId: data?.jobId!, token: appBridgeState?.token! }),
  });

  console.log(jobStatus);

  if (appBridgeState?.ready) {
    return (
      <Box>
        <Text variant="hero" display="block" marginBottom={4}>
          Orders Exporter to CSV
        </Text>
        <Text marginBottom={4} display="block">
          Fetch orders database and generate a CSV file on demand
        </Text>
        <Divider marginBottom={4} />
        <Box>
          <Button
            onClick={() =>
              mutate({
                token: appBridgeState.token!,
              })
            }
          >
            Generate CSV
          </Button>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};
