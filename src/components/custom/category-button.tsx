import type { FC } from 'react'

import { cn } from '@/lib/utils'

interface Props {
  label: string
  id?: number | null
  onClick: () => void
  selectedCategory: number | null
}

const CategoryButton: FC<Props> = ({ id, label, onClick, selectedCategory }) => {
  return (
    <div
      className={cn(
        'w-full justify-start flex-wrap h-auto text-sm text-left transition-all duration-200',
        'cursor-pointer rounded-lg transition-all disabled:pointer-events-none min-h-10 px-4 py-2',
        'hover:bg-blue-600',
        selectedCategory === id
          ? 'bg-primary text-primary-foreground shadow-md'
          : 'hover:bg-primary/10 hover:text-primary'
      )}
      onClick={onClick}
    >
      {label}

      {/* {selectedCategory === category && (
            <Badge
                variant="secondary"
                className="ml-auto bg-secondary text-secondary-foreground border-0"
            >
                {filteredWords.filter((w) => category === 'all' || w.category === category).length}
            </Badge>
        )} */}
    </div>
  )
}

export default CategoryButton
