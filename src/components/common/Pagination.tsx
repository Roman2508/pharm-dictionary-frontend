import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { type Dispatch, type FC, type SetStateAction } from "react"

interface Props {
  totalPages: number
  currentPage: number
  isDisabled?: boolean
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const Pagination: FC<Props> = ({ totalPages, isDisabled, currentPage, setCurrentPage }) => {
  const createPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | "ellipsis")[] = []

    // первая страница
    pages.push(1)

    // левый "..."
    if (currentPage > 3) {
      pages.push("ellipsis")
    }

    // окно вокруг текущей
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // правый "..."
    if (currentPage < totalPages - 2) {
      pages.push("ellipsis")
    }

    // последняя страница
    pages.push(totalPages)

    return pages
  }

  const pages = createPages()

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem onClick={() => !isDisabled && setCurrentPage((p) => Math.max(1, p - 1))}>
          <PaginationPrevious />
        </PaginationItem>

        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
              <PaginationLink href="#" isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem onClick={() => !isDisabled && setCurrentPage((p) => Math.min(totalPages, p + 1))}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  )
}

export default Pagination
