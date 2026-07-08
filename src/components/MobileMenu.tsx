"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

export default function MobileMenu({
  items,
  activePage,
  onNavigate,
}: any) {

  const [open,setOpen]=useState(false);

  return (

    <>

      <button
        onClick={()=>setOpen(!open)}
        className="fixed top-5 right-6 z-50 block md:hidden"
      >
        <Menu size={28}/>
      </button>

      {open && (

        <div className="fixed inset-0 z-40 bg-surface flex flex-col justify-center gap-10 p-10">

          {items.map((item:any)=>(

            <button
              key={item.page}
              onClick={()=>{
                onNavigate(item.page);
                setOpen(false);
              }}
              className={`text-left text-3xl ${
                activePage===item.page
                  ? "text-accent"
                  : "text-text"
              }`}
            >
              {item.label}
            </button>

          ))}

        </div>

      )}

    </>

  );

}