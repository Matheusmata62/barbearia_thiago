import React from 'react'

interface StatProps {
  label: string
  value: string | number
  icon?: string
  trend?: 'up' | 'down'
  trendValue?: string
}

export const Stat = ({ label, value, icon, trend, trendValue }: StatProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-neutral-900 mt-2">{value}</p>
          {trend && trendValue && (
            <p className={`text-xs font-semibold mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </p>
          )}
        </div>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>
    </div>
  )
}
