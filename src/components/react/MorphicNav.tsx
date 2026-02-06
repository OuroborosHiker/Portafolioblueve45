"use client";

import clsx from "clsx";
import { useState } from "react";

const navItems = {
  "#home": {
    name: "Inicio",
  },
  "#comisiones": {
    name: "Comisiones",
  },
  "#portfolio": {
    name: "Portafolio",
  },
  "#streams": {
    name: "Streams",
  },
  "#contact": {
    name: "Contacto",
  },
};

export function MorphicNavbar() {
  const [activePath, setActivePath] = useState("#");

  const isActiveLink = (path: string) => {
    if (path === "#") {
      return activePath === "#";
    }
    return activePath.startsWith(path);
  };

  return (
    <nav className="flex items-center justify-center max-w-4xl px-4 py-2">
      <div className="flex items-center justify-center">
        {/* Cambio principal: flex-col en móvil, sm:flex-row en desktop */}
        <div className="glass flex flex-row items-center justify-between overflow-hidden rounded-xl">
          {Object.entries(navItems).map(([path, { name }], index, array) => {
            const isActive = isActiveLink(path);
            const isFirst = index === 0;
            const isLast = index === array.length - 1;
            const prevPath = index > 0 ? array[index - 1][0] : null;
            const nextPath =
              index < array.length - 1 ? array[index + 1][0] : null;

            return (
              <a
                className={clsx(
                  "flex items-center justify-center bg-black p-1.5 px-1 sm:px-4 text-sm text-white transition-all duration-300 dark:bg-white dark:text-black",
                  isActive
                    ? "mx-0 sm:mx-2 my-2 sm:my-0 rounded-xl font-semibold"
                    : clsx(
                        // Bordes para móvil (vertical)
                        (isActiveLink(prevPath || "") || isFirst) &&
                          "rounded-t-xl sm:rounded-t-none sm:rounded-l-xl",
                        (isActiveLink(nextPath || "") || isLast) &&
                          "rounded-b-xl sm:rounded-b-none sm:rounded-r-xl"
                      )
                )}
                href={path}
                key={path}
                onClick={() => setActivePath(path)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default MorphicNavbar;
