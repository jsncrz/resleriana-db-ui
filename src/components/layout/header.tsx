'use client';
import { paths } from '@/config/paths';
import NextLink from 'next/link';

import { usePathname } from 'next/navigation';

type NavigationItem = {
  name: string;
  to: string;
};
const Header = () => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Characters', to: paths.characters.getHref() },
    { name: 'Memorias', to: paths.characters.getHref() },
    { name: 'Equipments', to: paths.characters.getHref() },
    { name: 'Items', to: paths.characters.getHref() },
    { name: 'Materials', to: paths.characters.getHref() },
  ].filter(Boolean) as NavigationItem[];
  return (
    <header className="text-white text-lg font-medium p-4">
      <div className="bg-sky-100/20 container flex justify-center items-stretch p-2 w-full">
        <nav className='flex space-x-8'>
          {navigation.map((item) => {
            const isActive = pathname === item.to;
            return (
              <NextLink
                key={item.name}
                href={item.to}
                className="hover:text-gray-400"
              >
                {item.name}
              </NextLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
