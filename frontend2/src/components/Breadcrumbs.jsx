import React from "react";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ items, onBreadcrumbClick }){
  return (
    <nav className="flex items-center mb-6 text-sm">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-gray-500" />}
            <button
              onClick={() => onBreadcrumbClick(index)}
              className={`flex items-center hover:text-purple-400 transition-colors ${
                index === items.length - 1 ? "text-purple-400 font-medium" : "text-gray-400"
              }`}
            >
              {item.type === "home" ? (
                <>
                  <Home className="mr-1 h-4 w-4" />
                  {item.name}
                </>
              ) : (
                item.name
              )}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// export const Breadcrumbs;
