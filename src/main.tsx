
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("Main is initializing");

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);
root.render(<App />);
