import { useState } from 'react'

import Logo from '../icons/logo'
import { cn } from '@/lib/utils'

const categories = [
  'Назви рослин',
  'Алфавітний покажчик ботанічних назв',
  'Назви лікарських форм',
  'Рецептурні вирази, рецептурні скорочення',
  'Частотні відрізки',
  'Клінічна термінологія',
  'Хімічна номенклатура',
  'Крилаті фрази',
]

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState('')

  return (
    <aside className="w-64 bg-white shadow-sm border-r p-4">
      <div className="sticky top-4">
        <div className="flex items-center gap-3">
          <Logo />
          <p className="font-bold text-lg leading-none text-black">ЖБФФК</p>
        </div>

        <hr className="my-4" />

        <h2 className="text-lg font-semibold mb-4">Категорії</h2>
        <ul className="space-y-1">
          {categories.map((c) => (
            <li
              key={c}
              onClick={() => {
                if (c === activeCategory) {
                  setActiveCategory('')
                } else {
                  setActiveCategory(c)
                }
              }}
              className={cn(
                'cursor-pointer rounded-lg px-3 py-2 transition-colors duration-200',
                activeCategory === c ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'
              )}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
