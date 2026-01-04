import { Listbox } from "@headlessui/react";
import { useState } from "react";

export default function CountrySelect({ countries, value, onChange }) {
  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">

        <Listbox.Button className="w-full rounded border p-2 text-left">
          {value ? (
            <div className="flex items-center gap-2">
              <span>{value.name}</span>
              <img src={value.flag} className="h-4 w-6" />
            </div>
          ) : ( <span className="text-gray-400">Select your country</span>)}
        </Listbox.Button>

        <Listbox.Options className="absolute z-10 mt-1 w-full rounded border bg-white">
                     {/* Search */}
          <input  type="text"
            placeholder="Search..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-b p-2 outline-none" />

          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.map((c) => (
              <Listbox.Option
                key={c.name}  value={c}
                className={({ active }) =>
                  `flex cursor-pointer items-center gap-2 p-2 ${
                    active ? "bg-gray-100" : "" }`}>
                  
                <img src={c.flag} className="h-4 w-6" />
                <span>{c.name}</span>
              </Listbox.Option>
            ))}
          </div>

        </Listbox.Options>
      </div>
    </Listbox>
  );
}
