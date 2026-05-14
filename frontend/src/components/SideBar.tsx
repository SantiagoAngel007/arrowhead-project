import React from "react";

interface SideLink {
    title: string;
    img: string; 
}

interface SideBarProps {
  links: SideLink[];
}

function SideBar({links}: SideBarProps) {
  return (
    <aside className="w-64 bg-black/50 p-4 font-mono">
      <ul className="flex flex-col space-y-2">
        {links.map((link, index) => (
          <li
            key={index}
            className="
              flex items-center gap-3 p-3
              text-gray-400 cursor-pointer
              border-b border-green-900/20 
              hover:bg-green-500/5 hover:text-green-400 hover:border-green-500
              transition-all duration-200
            "
          >
            {link.img && (
              <img 
                src={link.img} 
                alt="" 
                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100" 
              />
            )}

            <span className="text-sm font-bold tracking-widest uppercase">
              {link.title}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;