import React from 'react'
import { ClerkProvider } from "@clerk/clerk-react";
import ReactDOM from 'react-dom/client'
import './index.css'
import StudioApp from './studio_app';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <StudioApp />
    </ClerkProvider>
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
