import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { DataProvider } from "./components/DataProvider.tsx";

export default App;

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <DataProvider>
                <App />
            </DataProvider>
        </ThemeProvider>
    </StrictMode>
);
