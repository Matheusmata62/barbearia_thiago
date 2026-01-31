'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLocalStorage } from '../../hooks/useLocalStorage'

interface Agendamento {
  id: number
  cliente: string
  servico: string
  data: string
  horario: string
  status: 'confirmado' | 'pendente' | 'cancelado'
}

export default function Agendamentos() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [viewMode, setViewMode] = useState<'dia' | 'mes'>('dia')
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  const [agendamentos, setAgendamentos] = useLocalStorage<Agendamento[]>('agendamentos', [
    { id: 1, cliente: 'João Silva', servico: 'Corte + Barba', data: '2026-01-31', horario: '09:00', status: 'confirmado' },
    { id: 2, cliente: 'Pedro Santos', servico: 'Corte', data: '2026-01-31', horario: '10:00', status: 'pendente' },
    { id: 3, cliente: 'Carlos Oliveira', servico: 'Barba', data: '2026-01-31', horario: '11:00', status: 'confirmado' },
    { id: 4, cliente: 'Lucas Almeida', servico: 'Corte + Barba', data: '2026-01-31', horario: '14:00', status: 'confirmado' },
    { id: 5, cliente: 'Rafael Costa', servico: 'Corte', data: '2026-01-31', horario: '15:00', status: 'pendente' },
    { id: 6, cliente: 'Bruno Fernandes', servico: 'Barba', data: '2026-01-31', horario: '16:00', status: 'confirmado' },
  ])
  
  const [novoAgendamento, setNovoAgendamento] = useState({
    cliente: '',
    servico: 'Corte',
    data: '',
    horario: ''
  })

  const horarios = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
  ]

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
    const agendamento: Agendamento = {
      id: agendamentos.length + 1,
      ...novoAgendamento,
      status: 'pendente'
    }
    setAgendamentos([...agendamentos, agendamento])
    setNovoAgendamento({ cliente: '', servico: 'Corte', data: '', horario: '' })
    setShowModal(false)
  }

  const handleDeleteAgendamento = (id: number) => {
    if (confirm('Deseja realmente excluir este agendamento?')) {
      setAgendamentos(agendamentos.filter(a => a.id !== id))
    }
  }

  const handleStatusChange = (id: number, status: Agendamento['status']) => {
    setAgendamentos(agendamentos.map(a => 
      a.id === id ? { ...a, status } : a
    ))
  }

  const getAgendamentosPorData = (data: string) => {
    return agendamentos.filter(a => a.data === data)
  }

  const getAgendamentosHoje = () => {
    const hoje = selectedDate.toISOString().split('T')[0]
    return agendamentos.filter(a => a.data === hoje).sort((a, b) => a.horario.localeCompare(b.horario))
  }

  const getDiasDoMes = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    
    const firstDayWeek = firstDay.getDay()
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i)
      days.push({ date: day, isCurrentMonth: false })
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true })
    }
    
    return days
  }

  const mudarMes = (delta: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + delta, 1))
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition">
            <span>←</span>
            <span className="font-semibold">Voltar ao Dashboard</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Agenda</h1>
            <p className="text-gray-600">Gerencie todos os agendamentos</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('dia')}
                className={`px-6 py-2.5 rounded-lg font-semibold transition ${
                  viewMode === 'dia' 
                    ? 'bg-amber-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                📅 Dia
              </button>
              <button
                onClick={() => setViewMode('mes')}
                className={`px-6 py-2.5 rounded-lg font-semibold transition ${
                  viewMode === 'mes' 
                    ? 'bg-amber-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                📆 Mês
              </button>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition shadow-md flex items-center gap-2"
            >
              <span>➕</span>
              Novo Agendamento
            </button>
          </div>
        </div>

        {viewMode === 'dia' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24*60*60*1000))}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-semibold"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={() => setSelectedDate(new Date())}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-semibold"
                  >
                    Hoje
                  </button>
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24*60*60*1000))}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-semibold"
                  >
                    Próximo →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {horarios.map((horario) => {
                  const agendamento = getAgendamentosHoje().find(a => a.horario === horario)
                  const isOcupado = Boolean(agendamento)
                  
                  return (
                    <div
                      key={horario}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        agendamento
                          ? agendamento.status === 'confirmado'
                            ? 'bg-green-50 border-green-200'
                            : agendamento.status === 'pendente'
                            ? 'bg-yellow-50 border-yellow-200'
                            : 'bg-red-50 border-red-200'
                          : 'bg-gray-50 border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl font-bold text-gray-900">{horario}</span>
                        {isOcupado && agendamento && (
                          <select
                            value={agendamento.status}
                            onChange={(e) => handleStatusChange(agendamento.id, e.target.value as Agendamento['status'])}
                            className={`text-xs px-2 py-1 rounded-lg font-semibold border-0 ${
                              agendamento.status === 'confirmado' ? 'bg-green-200 text-green-800' :
                              agendamento.status === 'pendente' ? 'bg-yellow-200 text-yellow-800' :
                              'bg-red-200 text-red-800'
                            }`}
                          >
                            <option value="pendente">Pendente</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="cancelado">Cancelado</option>
                          </select>
                        )}
                      </div>
                      {isOcupado && agendamento ? (
                        <div>
                          <p className="font-semibold text-gray-900">{agendamento.cliente}</p>
                          <p className="text-sm text-gray-600">{agendamento.servico}</p>
                          <button
                            onClick={() => handleDeleteAgendamento(agendamento.id)}
                            className="mt-2 text-xs text-red-600 hover:text-red-800 font-semibold"
                          >
                            🗑️ Remover
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Disponível</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Total Agendamentos</p>
                    <p className="text-3xl font-bold text-gray-900">{getAgendamentosHoje().length}</p>
                  </div>
                  <span className="text-4xl">📋</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Confirmados</p>
                    <p className="text-3xl font-bold text-green-600">
                      {getAgendamentosHoje().filter(a => a.status === 'confirmado').length}
                    </p>
                  </div>
                  <span className="text-4xl">✅</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Pendentes</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {getAgendamentosHoje().filter(a => a.status === 'pendente').length}
                    </p>
                  </div>
                  <span className="text-4xl">⏳</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'mes' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => mudarMes(-1)}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-semibold"
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-semibold"
                >
                  Hoje
                </button>
                <button
                  onClick={() => mudarMes(1)}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-semibold"
                >
                  Próximo →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                <div key={dia} className="text-center font-bold text-gray-600 py-2">
                  {dia}
                </div>
              ))}
              
              {getDiasDoMes().map((item, index) => {
                const dateStr = item.date.toISOString().split('T')[0]
                const agendamentosNoDia = getAgendamentosPorData(dateStr)
                const isToday = dateStr === new Date().toISOString().split('T')[0]
                const isSelected = dateStr === selectedDate.toISOString().split('T')[0]
                
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedDate(item.date)
                      setViewMode('dia')
                    }}
                    className={`min-h-24 p-2 rounded-xl border-2 transition-all ${
                      !item.isCurrentMonth
                        ? 'bg-gray-50 border-gray-100 text-gray-400'
                        : isSelected
                        ? 'bg-amber-500 border-amber-600 text-white shadow-lg'
                        : isToday
                        ? 'bg-amber-50 border-amber-300 text-gray-900'
                        : 'bg-white border-gray-200 text-gray-900 hover:border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    <div className="text-lg font-bold mb-1">{item.date.getDate()}</div>
                    {agendamentosNoDia.length > 0 && (
                      <div className="space-y-1">
                        <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-amber-600'}`}>
                          {agendamentosNoDia.length} agend.
                        </div>
                        <div className="flex gap-1 justify-center flex-wrap">
                          {agendamentosNoDia.slice(0, 3).map((ag) => (
                            <div
                              key={ag.id}
                              className={`w-2 h-2 rounded-full ${
                                ag.status === 'confirmado' ? 'bg-green-500' :
                                ag.status === 'pendente' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Novo Agendamento</h2>
            <form onSubmit={handleAddAgendamento}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold text-sm">Cliente</label>
                  <input
                    type="text"
                    value={novoAgendamento.cliente}
                    onChange={(e) => setNovoAgendamento({...novoAgendamento, cliente: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold text-sm">Serviço</label>
                  <select
                    value={novoAgendamento.servico}
                    onChange={(e) => setNovoAgendamento({...novoAgendamento, servico: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50"
                    required
                  >
                    <option value="Corte">Corte</option>
                    <option value="Barba">Barba</option>
                    <option value="Corte + Barba">Corte + Barba</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold text-sm">Data</label>
                  <input
                    type="date"
                    value={novoAgendamento.data}
                    onChange={(e) => setNovoAgendamento({...novoAgendamento, data: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold text-sm">Horário</label>
                  <select
                    value={novoAgendamento.horario}
                    onChange={(e) => setNovoAgendamento({...novoAgendamento, horario: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50"
                    required
                  >
                    <option value="">Selecione um horário</option>
                    {horarios.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition font-semibold"
                >
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
