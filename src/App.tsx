import { useState } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ControlLayer from './layouts/ControlLayer'
import AuthButton from './components/global/AuthButton'
import Widget from './components/global/widget'
import { Toaster } from 'sonner'

const client = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={client}>
      <ControlLayer>
        <AuthButton />
        <Widget />
      </ControlLayer>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
