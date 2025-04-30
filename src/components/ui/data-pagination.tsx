import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

export type DataPaginationProps = {
  totalPages: number;
  currentPage: number;
  rootUrl: string;
};

export const DataPagination = ({
  totalPages,
  currentPage,
  rootUrl,
}: DataPaginationProps) => {
  const createHref = (page: number) => `${rootUrl}?page=${page}`;
  currentPage += 1;
  return (
    <Pagination className="justify-end py-8">
      <PaginationContent className="bg-white/25 dark:bg-black/25 rounded-md shadow-sm">
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationFirst href={createHref(1)} />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createHref(currentPage - 1)} />
          </PaginationItem>
        )}
        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink href={createHref(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={createHref(currentPage - 1)} className='font-bold'>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink className='bg-foreground font-bold text-background'>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {totalPages > currentPage && (
          <PaginationItem>
            <PaginationLink href={createHref(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {totalPages - 1 > currentPage && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={createHref(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createHref(currentPage + 1)} />
          </PaginationItem>
        )}
        {totalPages > currentPage && (
          <PaginationItem>
            <PaginationLast href={createHref(totalPages)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
