import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMemoria } from '../api/get-memoria';
import { useLocaleStore } from '@/hooks/use-locale';
import { env } from '@/config/env';
import { MemoriaStatusView } from '@/features/memoria-status/components/memoria-stat-view';
import { MemoriaAbilityView } from '@/features/memoria-ability/components/memoria-ability-view';

export type MemoriaViewProps = {
  memoriaId: number;
  isOpen: boolean;
  toggle: () => void;
};

const MemoriaView = ({ memoriaId, isOpen, toggle }: MemoriaViewProps) => {
  const imgUrl = env.IMAGE_URL;
  const { locale } = useLocaleStore();
  const memoriasQuery = useMemoria({ memoriaId: memoriaId.toString(), locale });
  if (memoriasQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">HELLO</div>
    );
  }

  const memoria = memoriasQuery.data;
  if (!memoria) return null;

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent
        className="w-[95%] lg:w-[70%] max-w-[512px] lg:!max-w-none !p-0 outline-none overflow-y-hidden"
        hasClose={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>View Memoria</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 justify-items-center overflow-y-auto lg:overflow-auto h-[95vh] lg:h-auto">
          <img
            className="col-span-3 lg:col-span-1"
            src={imgUrl + 'memorias/memoria_' + memoria.id + '.png'}
          ></img>
          <div className="flex flex-col col-span-3 lg:col-span-2 p-6 text-center justify-items-center">
            <p className="text-lg lg:text-2xl font-bold text-shadow-md text-shadow-background/50">
              {memoria.name}
            </p>
            <div className="justify-items-center item-center place-self-center p-6">
              <MemoriaStatusView memoriaId={memoria.id}></MemoriaStatusView>
            </div>
            <div className='border-y-1 p-6'>
              <MemoriaAbilityView abilities={memoria.abilities}></MemoriaAbilityView>
            </div>

            <p className="p-6 lg:text-lg font-bold text-shadow-md text-shadow-background/50">
              {memoria.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemoriaView;
