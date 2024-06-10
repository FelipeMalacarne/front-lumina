import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
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

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(1)}
                    >
                        <ChevronFirstIcon />
                    </Button>

                </PaginationItem>

                <PaginationItem>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <ChevronLeftIcon />
                    </Button>
                </PaginationItem>

                {startPage > 1 && (
                    <PaginationItem className="hidden md:block" >
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {pageNumbers.map((pageNumber) => (
                    <PaginationItem
                        className="hidden md:block"
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        <PaginationLink isActive={currentPage === pageNumber}>{pageNumber}</PaginationLink>
                    </PaginationItem>
                ))}

                {endPage < totalPages && (
                    <PaginationItem className="hidden md:block" >
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                <PaginationItem>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        <ChevronRightIcon />
                    </Button>
                </PaginationItem>

                <PaginationItem>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(totalPages)}
                    >
                        <ChevronLastIcon />
                    </Button>
                </PaginationItem>


            </PaginationContent>
        </Pagination >
    );
}
