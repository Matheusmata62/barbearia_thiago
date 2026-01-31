'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/app/components/Sidebar'
import { Button } from '@/app/components/Button'
import { Card, CardHeader, CardContent, CardFooter } from '@/app/components/Card'
import { Badge } from '@/app/components/Badge'
import { Calendar } from '@/app/components/Calendar'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'

interface Agendamento {
  id: number
  cliente: string
  servico: string
  data: string
  horario: string
  status: 'confirmado' | 'pendente' | 'cancelado'
}

const horarios = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
]

const servicos = ['Corte', 'Barba', 'Corte + Barba', 'Tratamento Facial', 'Higiene']

export default function Agendamentos() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const [agendamentos, setAgendamentos] = useLocalStorage<Agendamento[]>('agendamentos', [
    { id: 1, cliente: 'João Silva', servico: 'Corte + Barba', data: '2026-01-31', horario: '09:00', status: 'confirmado' },
    { id: 2, cliente: 'Pedro Santos', servico: 'Corte', data: '2026-01-31', horario: '10:00', status: 'pendente' },
    { id: 3, cliente: 'Carlos Oliveira', servico: 'Barba', data: '2026-01-31', horario: '11:00', status: 'confirmado' },
    { id: 4, cliente: 'Lucas Almeida', servico: 'Corte + Barba', data: '2026-01-31', horario: '14:00', status: 'confirmado' },
    { id: 5, cliente: 'Rafael Costa', servico: 'Corte', data: '2026-01-31', horario: '15:00', status: 'pendente' },
  ])

  const [novoAgendamento, setNovoAgendamento] = useState({
    cliente: '',
    servico: 'Corte',
    data: '',
    horario: ''
  })

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    if (!auth) {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleAddAgendamento = (e: React.FormEvent) => {
    e.preventDefault()
    if (novoAgendamento.cliente && novoAgendamento.data && novoAgendamento.horario) {
      const novoId = Math.max(...agendamentos.map(a => a.id), 0) + 1
      setAgendamentos([
        ...agendamentos,
        {
          id: novoId,
          ...novoAgendamento,
          status: 'pendente'
        }
      ])
      setNovoAgendamento({ cliente: '', servico: 'Corte', data: '', horario: '' })
      setShowModal(false)
      setSelectedDate(null)
    }
  }

  const handleDateSelect = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0]
    setSelectedDate(date)
    setNovoAgendamento(prev => ({ ...prev, data: formattedDate }))
  }

  const handleDeleteAgendamento = (id: number) => {
    setAgendamentos(agendamentos.filter(a => a.id !== id))
  }

  const handleStatusChange = (id: number, status: 'confirmado' | 'pendente' | 'cancelado') => {
    setAgendamentos(agendamentos.map(a => a.id === id ? { ...a, status } : a))
  }

  const agendamentosOrdenados = [...agendamentos].sort((a, b) => {
    const timeA = `${a.data} ${a.horario}`
    const timeB = `${b.data} ${b.horario}`
    return new Date(timeA).getTime() - new Date(timeB).getTime()
  })

  const stats = {
    total: agendamentos.length,
    confirmados: agendamentos.filter(a => a.status === 'confirmado').length,
    pendentes: agendamentos.filter(a => a.status === 'pendente').length,
    cancelados: agendamentos.filter(a => a.status === 'cancelado').length,
  }

  if (!isAuthenticated) return null

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="glass-effect border-b sticky top-0 z-20">
          <div className="flex items-center justify-between p-4 container-max">
            <button
              className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1 className="text-2xl font-bold text-neutral-900 flex-1 md:flex-none">Agendamentos</h1>
            <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
              + Novo Agendamento
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent>
                <p className="text-neutral-600 text-sm font-medium">Total</p>
                <p className="text-3xl font-bold text-neutral-900 mt-2">{stats.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-neutral-600 text-sm font-medium">Confirmados</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.confirmados}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-neutral-600 text-sm font-medium">Pendentes</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">{stats.pendentes}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-neutral-600 text-sm font-medium">Cancelados</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.cancelados}</p>
              </CardContent>
            </Card>
          </div>

          {/* Agendamentos Grid */}
          {agendamentosOrdenados.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agendamentosOrdenados.map(agendamento => (
                <Card key={agendamento.id}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-neutral-900">{agendamento.cliente}</h3>
                      <p className="text-sm text-neutral-600">{agendamento.servico}</p>
                    </div>
                    <Badge variant={agendamento.status === 'confirmado' ? 'success' : agendamento.status === 'pendente' ? 'warning' : 'danger'}>
                      {agendamento.status === 'confirmado' ? '✓ Confirmado' : agendamento.status === 'pendente' ? '⏳ Pendente' : '✕ Cancelado'}
                    </Badge>
                  </div>
                  
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-neutral-600">
                        <span>📅</span>
                        <span>{new Date(agendamento.data).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-600">
                        <span>🕐</span>
                        <span>{agendamento.horario}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <select
                      value={agendamento.status}
                      onChange={(e) => handleStatusChange(agendamento.id, e.target.value as any)}
                      className="flex-1 text-sm px-2 py-1 rounded border border-neutral-200 focus:ring-2 focus:ring-amber-500/50"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDeleteAgendamento(agendamento.id)}
                    >
                      🗑️
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent>
                <p className="text-center text-neutral-500 py-8">
                  Nenhum agendamento registrado. Clique em "Novo Agendamento" para começar.
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader title="Novo Agendamento" icon="📅" />
            <CardContent>
              <form onSubmit={handleAddAgendamento} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Nome do Cliente
                  </label>
                  <input
                    type="text"
                    value={novoAgendamento.cliente}
                    onChange={(e) => setNovoAgendamento({ ...novoAgendamento, cliente: e.target.value })}
                    placeholder="Ex: João Silva"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Serviço
                  </label>
                  <select
                    value={novoAgendamento.servico}
                    onChange={(e) => setNovoAgendamento({ ...novoAgendamento, servico: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    {servicos.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <p className="text-sm font-medium text-neutral-900 mb-3">Selecione a Data</p>
                  <Calendar onDateSelect={handleDateSelect} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Horário
                  </label>
                  <select
                    value={novoAgendamento.horario}
                    onChange={(e) => setNovoAgendamento({ ...novoAgendamento, horario: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    required
                  >
                    <option value="">Selecione um horário</option>
                    {horarios.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                {novoAgendamento.data && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✓ Data selecionada: {new Date(novoAgendamento.data).toLocaleDateString('pt-BR')} às {novoAgendamento.horario || '-- :--'}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="flex-1"
                  >
                    Agendar
                  </Button>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => {
                      setShowModal(false)
                      setSelectedDate(null)
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
