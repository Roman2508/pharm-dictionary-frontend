import { useState } from 'react'

import Logo from '../icons/logo'

const Header = () => {
  const [activeTab, setActiveTab] = useState('dictionary')

  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Латинсько-український словник фармацевтично-медичних термінів
      </h1>

      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab('dictionary')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer ${
            activeTab === 'dictionary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Словник
        </button>
        <button
          onClick={() => setActiveTab('trainer')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer ${
            activeTab === 'trainer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Тренажер
        </button>
      </div>
    </header>
  )
}

export { Header }
