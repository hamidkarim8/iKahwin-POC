import { useEffect, useState } from "react";

export default function ApplicationLogo(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const classList = document.documentElement.classList;
    setIsDarkMode(classList.contains('dark'));

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const base = import.meta.env.BASE_URL || '/';
  const logoDark = `${base}images/logo/logo-ikahwin-dark.png`;
  const logoLight = `${base}images/logo/logo-ikahwin-light.svg`;

  return (
    <img
      src={isDarkMode ? logoDark : logoLight}
      alt="Logo"
      className="w-24 h-auto"
      {...props}
    />
  );
}
