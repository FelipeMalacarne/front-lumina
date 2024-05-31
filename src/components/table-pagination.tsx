import { Button } from "./ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

interface TablePaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}
export const TablePagination = ({ currentPage, totalPages, onPageChange }: TablePaginationProps) => {

    const pageNumbers = [];
    const maxPagesToShow = 2;

    let startPage = Math.max(1, currentPage - maxPagesToShow);
    let endPage = Math.min(totalPages, currentPage + maxPagesToShow);

    if (endPage - startPage < maxPagesToShow * 2) {
        if (startPage === 1) {
            endPage = Math.min(startPage + maxPagesToShow * 2, totalPages);
        } else {
            startPage = Math.max(1, endPage - maxPagesToShow * 2);
        }
    }

    // Add page numbers to the array
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button variant={'ghost'} disabled={currentPage === 1} aria-disabled>
                        <PaginationFirst onClick={() => onPageChange(1)} />
                    </Button>

                </PaginationItem>

                <PaginationItem>
                    <Button variant={'ghost'} disabled={currentPage === 1} aria-disabled>
                        <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
                    </Button>
                </PaginationItem>

                {startPage > 1 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {pageNumbers.map((pageNumber) => (
                    <PaginationItem
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        <PaginationLink isActive={currentPage === pageNumber}>{pageNumber}</PaginationLink>
                    </PaginationItem>
                ))}

                {endPage < totalPages && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                <PaginationItem>
                    <Button variant={'ghost'} disabled={currentPage === totalPages} aria-disabled>
                        <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
                    </Button>
                </PaginationItem>

                <PaginationItem>
                    <Button variant={'ghost'} disabled={currentPage === totalPages} aria-disabled>
                        <PaginationLast onClick={() => onPageChange(totalPages)} />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
