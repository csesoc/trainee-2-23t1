import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from './utils/trpc'
import { httpBatchLink } from '@trpc/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import WavesRouter from './components/Router'

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8000/trpc',
          headers() {
            return {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <WavesRouter />
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
