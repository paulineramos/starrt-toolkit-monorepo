import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';
import { trpc } from '../utils/trpc';
import { queryClient } from './query';

const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: `${import.meta.env.VITE_TRPC_SERVER_URL}` })],
  transformer: superjson,
});

export const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
};
