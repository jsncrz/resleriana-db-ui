'use client';

import { DataPagination } from '@/components/ui/data-pagination';
import { env } from '@/config/env';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useLocaleStore } from '@/hooks/use-locale';
import { Memoria } from '@/types/api';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useMemorias } from '../api/get-memorias';
import MemoriaView from './memoria-view';

export type MemoriasListProps = {};

type MemoriaEntryProps = {
  imgUrl: string;
  memoria: Memoria;
  onClickEvent: () => void;
};

const MemoriaEntry = ({ imgUrl, memoria, onClickEvent }: MemoriaEntryProps) => (
  <div
    onClick={onClickEvent}
    key={memoria.id}
    className={`overflow-hidden h-full content-center cursor-pointer max-w-md rounded-xl p-3px drop-shadow-lg/25 transition-[scale,box-shadow] duration-300 
            ease-in-out hover:scale-103 hover:shadow-glow bg-white dark:bg-black/50`}
  >
    <img
      className="w-full"
      src={imgUrl + 'memorias/memoria_' + memoria.id + '_small.png'}
    ></img>
    <div className="rounded-b-xl p-2 text-center">
      <span className="text-xs lg:text-sm font-bold text-shadow-md text-shadow-background/50">
        {memoria.name}
      </span>
    </div>
  </div>
);

export const MemoriasList = ({}: MemoriasListProps) => {
  const imgUrl = env.IMAGE_URL;
  const { open, isOpen, toggle } = useDisclosure();
  const { locale } = useLocaleStore();
  const [chosen, setChosen] = useState<number>();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') ? Number(searchParams.get('page')) : 0;
  const sort = searchParams?.get('sort') || 'releaseDate,desc';
  const rarity = searchParams?.get('rarity')
    ? Number(searchParams.get('rarity'))
    : undefined;

  const memoriasQuery = useMemorias({ page, sort, rarity, locale });
  if (memoriasQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">HELLO</div>
    );
  }

  const memorias = memoriasQuery.data?.content;
  const paging = memoriasQuery.data?.page;

  if (!memorias) return null;

  return (
    <div>
      <DataPagination
        totalPages={paging?.totalPages || 0}
        currentPage={paging?.number || 0}
        rootUrl="memorias"
      ></DataPagination>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 items-center">
        {memorias.map((memoria) => {
          return (
              <MemoriaEntry
                key={memoria.id}
                memoria={memoria}
                imgUrl={imgUrl}
                onClickEvent={() => {
                  setChosen(memoria.id)
                  open();
                }}
              ></MemoriaEntry>
          );
        })}
        {chosen && (
          <MemoriaView
            isOpen={isOpen}
            toggle={toggle}
            memoriaId={chosen}
          ></MemoriaView>
        )}
      </div>
    </div>
  );
};
