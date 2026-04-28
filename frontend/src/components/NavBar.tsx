import React from "react";

interface NavLink {
  label: string;
  path: string;
}

interface NavBarProps {
  name: string;
  img: string;
  links: NavLink[];
}

function NavBar({ name, img, links }: NavBarProps) {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-[#0a0a0a] border-b border-green-900/30 font-mono">
      {/* Logo section*/}
      <div className="flex items-center gap-3">
        {img && <img src={img} alt="Logo" className="w-8 h-8 object-contain" />}
        <span className="text-green-500 font-bold text-xl tracking-tighter">
          {name}
        </span>
      </div>

      {/* Menú items*/}
      <div className="flex space-x-8">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.path}
            className="text-green-400 flex items-center gap-2 pb-1.5
            hover:text-green-500
            font-mono text-sm tracking-widest uppercase
            border-b-2 border-transparent hover:border-green-300
            transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
