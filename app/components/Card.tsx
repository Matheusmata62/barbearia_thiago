import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export const Card = ({ children, className = '', hover = true }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-xl border border-neutral-200 p-6 shadow-sm ${
        hover ? 'hover:shadow-lg transition-shadow duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  description?: string
  icon?: string
}

export const CardHeader = ({ title, description, icon }: CardHeaderProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 mb-2">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
      </div>
      {description && <p className="text-neutral-600 text-sm">{description}</p>}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
}

export const CardContent = ({ children }: CardContentProps) => {
  return <div className="text-neutral-700">{children}</div>
}

interface CardFooterProps {
  children: React.ReactNode
}

export const CardFooter = ({ children }: CardFooterProps) => {
  return <div className="mt-4 pt-4 border-t border-neutral-200 flex gap-2">{children}</div>
}
