import React from 'react'

interface ChartData {
  label: string
  value: number
  percentage: number
}

interface BarChartProps {
  title: string
  data: ChartData[]
  maxValue?: number
}

export const BarChart = ({ title, data, maxValue = 100 }: BarChartProps) => {
  const max = Math.max(...data.map(d => d.value), maxValue)

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <h3 className="font-bold text-lg text-neutral-900 mb-6">{title}</h3>
      <div className="space-y-6">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-neutral-900">{item.label}</span>
              <span className="text-sm font-bold text-amber-600">{item.percentage}%</span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1">{item.value} clientes</p>
          </div>
        ))}
      </div>
    </div>
  )
}

interface LineChartProps {
  title: string
  data: Array<{ x: string; y: number }>
}

export const SimpleLineChart = ({ title, data }: LineChartProps) => {
  const maxValue = Math.max(...data.map(d => d.y))
  const height = 150

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <h3 className="font-bold text-lg text-neutral-900 mb-6">{title}</h3>
      <svg width="100%" height={height} className="mb-4">
        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((percent, idx) => (
          <line
            key={`grid-${idx}`}
            x1="0"
            y1={height * (1 - percent)}
            x2="100%"
            y2={height * (1 - percent)}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Line */}
        {data.length > 1 && (
          <polyline
            points={data
              .map((point, idx) => [
                (idx / (data.length - 1)) * 100 + '%',
                (height * (1 - point.y / maxValue)).toString()
              ])
              .map(([x, y]) => `${x} ${y}`)
              .join(' ')}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Gradient */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Points */}
        {data.map((point, idx) => (
          <circle
            key={`point-${idx}`}
            cx={(idx / (data.length - 1)) * 100 + '%'}
            cy={height * (1 - point.y / maxValue)}
            r="5"
            fill="#f59e0b"
            className="hover:r-7 transition-all"
          />
        ))}
      </svg>

      <div className="flex justify-between text-xs text-neutral-500 mt-4 overflow-x-auto">
        {data.map((point, idx) => (
          <div key={idx} className="text-center whitespace-nowrap">
            <p>{point.x}</p>
            <p className="font-bold text-neutral-900">{point.y}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
