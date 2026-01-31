'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar autenticação
    const auth = localStorage.getItem('isAuthenticated')
    if (!auth) {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    router.push('/login')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✂️</span>
            <h1 className="text-xl font-bold">Barbearia THG - Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <span>🚪</span>
            Sair
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Clientes Hoje</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <span className="text-4xl">👥</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Agendamentos</p>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
              <span className="text-4xl">📅</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Clientes</p>
                <p className="text-3xl font-bold text-gray-900">156</p>
              </div>
              <span className="text-4xl">📊</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Receita Hoje</p>
                <p className="text-3xl font-bold text-gray-900">R$ 480</p>
              </div>
              <span className="text-4xl">💰</span>
            </div>
          </div>
        </div>

        {/* Menu Principal */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/dashboard/clientes"
            className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition group"
          >
            <span className="text-5xl mb-4 inline-block group-hover:scale-110 transition">👥</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Clientes</h2>
            <p className="text-gray-600">
              Gerencie todos os clientes cadastrados
            </p>
          </Link>

          <Link 
            href="/dashboard/agendamentos"
            className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition group"
          >
            <span className="text-5xl mb-4 inline-block group-hover:scale-110 transition">📅</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Agendamentos</h2>
            <p className="text-gray-600">
              Visualize e gerencie agendamentos
            </p>
          </Link>

          <Link 
            href="/dashboard/configuracoes"
            className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition group"
          >
            <span className="text-5xl mb-4 inline-block group-hover:scale-110 transition">⚙️</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Configurações</h2>
            <p className="text-gray-600">
              Configure nome, horários e serviços
            </p>
          </Link>
        </div>

        {/* Últimos Agendamentos */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Próximos Agendamentos</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-600">Horário</th>
                  <th className="text-left py-3 px-4 text-gray-600">Cliente</th>
                  <th className="text-left py-3 px-4 text-gray-600">Serviço</th>
                  <th className="text-left py-3 px-4 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">14:00</td>
                  <td className="py-3 px-4">João Silva</td>
                  <td className="py-3 px-4">Corte + Barba</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      Confirmado
                    </span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">15:00</td>
                  <td className="py-3 px-4">Pedro Santos</td>
                  <td className="py-3 px-4">Corte</td>
                  <td className="py-3 px-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                      Pendente
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">16:30</td>
                  <td className="py-3 px-4">Carlos Oliveira</td>
                  <td className="py-3 px-4">Barba</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      Confirmado
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
