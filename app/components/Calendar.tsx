import React, { useState } from 'react'

interface CalendarProps {
  onDateSelect?: (date: Date) => void
}

export const Calendar = ({ onDateSelect }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthName = (date: Date) => {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    return months[date.getMonth()]
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    onDateSelect?.(selectedDate)
  }

  const days = []
  const totalCells = firstDayOfMonth(currentDate) + daysInMonth(currentDate)

  for (let i = 0; i < totalCells; i++) {
    if (i < firstDayOfMonth(currentDate)) {
      days.push(null)
    } else {
      days.push(i - firstDayOfMonth(currentDate) + 1)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-neutral-900">
          {monthName(currentDate)} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            ←
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(day => (
          <div key={day} className="text-center text-sm font-semibold text-neutral-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => day && handleDateClick(day)}
            disabled={!day}
            className={`py-2 rounded-lg font-medium transition-all ${
              day
                ? 'hover:bg-amber-100 hover:text-amber-900 cursor-pointer bg-neutral-50 text-neutral-900'
                : 'opacity-0 cursor-not-allowed'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}
