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
    { name: 'Memorias', to: paths.memorias.getHref() },
    { name: 'Equipments', to: paths.equipments.getHref() },
    { name: 'Items', to: paths.items.getHref() },
    { name: 'Materials', to: paths.materials.getHref() },
  ].filter(Boolean) as NavigationItem[];
  return (
    <header className="text-background text-lg font-medium p-4 flex justify-center">
      <div className="bg-foreground/75 flex justify-center items-stretch p-2 w-2/3 rounded-sm">
        <nav className="flex space-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.to;
            return (
                <NextLink
                  key={item.name}
                  href={item.to}
                  className={`${
                    isActive ? 'menu-active' : ''
                  } hover:text-background/90`}
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
