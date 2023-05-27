import { useState } from 'react'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from './utils/trpc'
import { TRPCClientError, httpBatchLink } from '@trpc/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Placeholder from './pages/Placeholder'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ProtectedRoutes from './components/ProtectedRoutes'
import CalendarTest from './pages/CalendarTest'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import CalendarWaveTest from './pages/CalendarWaveTest'

function App() {
  const navigate = useNavigate()
  
  const userDarkPref = localStorage.getItem("dark");
  let pref: boolean = false;
  if (userDarkPref === "true") {
    pref = true;
  }
  const [darkMode, setDarkmode] = useState(pref);

  const handleToggleDark = () => {
    localStorage.setItem("dark", `${!darkMode}`)
    setDarkmode(prevState => !prevState);
  }

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
  )

  const errorHandler = (e: unknown) => {
    if (e instanceof TRPCClientError) {
      if (e.message === 'No token found') {
        navigate('/login')
      }
    }
  }

  const [queryClient] = useState(() => new QueryClient({
    queryCache: new QueryCache({
      onError: errorHandler
    }),
    mutationCache: new MutationCache({
      onError: errorHandler
    }),
    defaultOptions: {
      queries: {
        retry: (retryCount, error: any) => {
          if (error && error instanceof TRPCClientError) {
            if (error.message === 'No token found') {
              return false
            }
          }

          if (retryCount < 4) {
            return true
          }

          return false
        }
      }
    }
  }))

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Routes>

          <Route path="/calendar" element={<CalendarWaveTest />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Main content */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/home" element={<MainPage darkMode={darkMode} handleToggleDark={handleToggleDark}/>} />
            <Route path="/placeholder" element={<Placeholder />} />
            <Route path="/search/:query" element={<SearchPage darkMode={darkMode} handleToggleDark={handleToggleDark} />} />
          </Route>
          
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
