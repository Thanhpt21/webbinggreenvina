'use client';

interface AccountSidebarProps {
  onMenuClick: (key: 'personal' | 'address' | 'history') => void;
  selected: 'personal' | 'address' | 'history';
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ onMenuClick, selected }) => {
  const menuItems = [
    {
      key: 'personal' as const,
      label: 'Thông tin cá nhân',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    
  ];

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => {
        const isSelected = selected === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onMenuClick(item.key)}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
              transition-all duration-200 ease-in-out
              ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
              }
            `}
          >
            <span className={`
              transition-transform duration-200
              ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
            `}>
              {item.icon}
            </span>
            <span className={`
              text-sm font-medium
              ${isSelected ? 'font-semibold' : ''}
            `}>
              {item.label}
            </span>
            {isSelected && (
              <span className="ml-auto">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default AccountSidebar;