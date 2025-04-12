import { useEffect } from "react";

const ThemeEnforcer = () => {
  useEffect(() => {
    // Force the theme to be "black"
    document.documentElement.setAttribute("data-theme", "black");

    // Create an observer to maintain theme if DOM changes
    const observer = new MutationObserver(() => {
      // Remove the 'mutations' parameter since it's not being used
      const html = document.documentElement;
      if (html.getAttribute("data-theme") !== "black") {
        html.setAttribute("data-theme", "black");
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return null; // This component doesn't render anything
};

export default ThemeEnforcer;
