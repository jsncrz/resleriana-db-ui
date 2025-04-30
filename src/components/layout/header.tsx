'use client';

import { Moon, Sun } from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { paths } from '@/config/paths';
import { LocaleState, useLocaleStore } from '@/hooks/use-locale';
type NavigationItem = {
  name: string;
  to: string;
};
const Header = () => {
  const pathname = usePathname();
  const locale = useLocaleStore((state: LocaleState) => state.locale);
  const { setTheme } = useTheme();
  const setLocale = useLocaleStore((state: LocaleState) => state.setLocale);

  const navigation = [
    { name: 'Characters', to: paths.characters.getHref() },
    { name: 'Memorias', to: paths.memorias.getHref() },
    { name: 'Equipments', to: paths.equipments.getHref() },
    { name: 'Items', to: paths.items.getHref() },
    { name: 'Materials', to: paths.materials.getHref() },
  ].filter(Boolean) as NavigationItem[];
  return (
    <header className="text-background text-lg font-medium flex justify-center w-full">
      <div className="h-12 w-full bg-foreground/75 flex justify-center items-stretch p-2 w-2/3 drop-shadow-md">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <div className="">
                  {locale === 'jp' ? 'Japanese' : 'English'}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLocale('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocale('jp')}>
                Japanese
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};

export default Header;
