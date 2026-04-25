import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './fonts.css';
import './index.css';
import { trackPageVisit } from './metrics/metrics-client';

void trackPageVisit();
createRoot(document.getElementById("root")!).render(<App />);
