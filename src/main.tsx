
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("Main is initializing");

// Znajdź element root i upewnij się, że istnieje
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
  throw new Error("Failed to find the root element");
}

// Renderuj aplikację
const root = createRoot(rootElement);
root.render(<App />);
