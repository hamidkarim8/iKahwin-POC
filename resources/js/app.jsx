import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { HelmetProvider } from "react-helmet-async";
import AppLayout from "./Layouts/AppLayout";
import { ThemeProvider } from "./context/ThemeContext.tsx";

const appName = import.meta.env.VITE_APP_NAME || "i-Kahwin";

createInertiaApp({
  title: (title) => `${title}${appName}`,
  resolve: async (name) => {
    const pages = import.meta.glob("./Pages/**/*.{jsx,js,tsx,ts}");
    const page = await resolvePageComponent(`./Pages/${name}.jsx`, pages);

    // Fallback to default layout if none provided
    page.default.layout ??= (page) => <AppLayout>{page}</AppLayout>;

    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
    <HelmetProvider>
        <ThemeProvider>
        <App {...props} />
        </ThemeProvider>
    </HelmetProvider>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
