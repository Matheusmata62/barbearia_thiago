'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sidebar } from '@/app/components/Sidebar'
import { Button } from '@/app/components/Button'
import { Card, CardHeader, CardContent } from '@/app/components/Card'
import { Stat } from '@/app/components/Stat'
import { Badge } from '@/app/components/Badge'

export default function Dashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
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
              {sidebarOpen ? '✕' : '☰'}
            </button>
            <h1 className="text-2xl font-bold text-neutral-900 flex-1 md:flex-none">Dashboard</h1>
            <Button variant="danger" size="sm" onClick={handleLogout}>
              🚪 Sair
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Stat label="Clientes Hoje" value="12" icon="👥" trend="up" trendValue="2 novos" />
            <Stat label="Agendamentos" value="8" icon="📅" trend="up" trendValue="3 pendentes" />
            <Stat label="Total de Clientes" value="156" icon="📊" trend="up" trendValue="8 este mês" />
            <Stat label="Receita Hoje" value="R$ 480" icon="💰" trend="up" trendValue="12% vs ontem" />
          </div>

          {/* Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/dashboard/clientes">
              <Card hover className="cursor-pointer group">
                <CardHeader 
                  title="Clientes" 
                  icon="👥"
                  description="Gerencie clientes cadastrados"
                />
                <CardContent>
                  <p className="text-3xl font-bold text-amber-600">156</p>
                  <p className="text-sm text-neutral-600 mt-2 group-hover:text-neutral-900">
                    Clique para gerenciar →
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/agendamentos">
              <Card hover className="cursor-pointer group">
                <CardHeader 
                  title="Agendamentos" 
                  icon="📅"
                  description="Visualize horários marcados"
                />
                <CardContent>
                  <p className="text-3xl font-bold text-amber-600">8</p>
                  <p className="text-sm text-neutral-600 mt-2 group-hover:text-neutral-900">
                    3 pendentes de confirmação
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/configuracoes">
              <Card hover className="cursor-pointer group">
                <CardHeader 
                  title="Configurações" 
                  icon="⚙️"
                  description="Configure seu negócio"
                />
                <CardContent>
                  <div className="flex gap-2 flex-wrap mt-2">
                    <Badge variant="success">Ativo</Badge>
                    <Badge variant="info">Completo</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Próximos Agendamentos */}
          <Card>
            <CardHeader 
              title="Próximos Agendamentos" 
              icon="📋"
              description="Seus agendamentos confirmados de hoje"
            />
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-neutral-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-600">Horário</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-600">Cliente</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-600">Serviço</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    <tr className="hover:bg-neutral-50 transition">
                      <td className="py-3 px-4">14:00</td>
                      <td className="py-3 px-4 font-medium">João Silva</td>
                      <td className="py-3 px-4">Corte + Barba</td>
                      <td className="py-3 px-4">
                        <Badge variant="success">Confirmado</Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-50 transition">
                      <td className="py-3 px-4">15:00</td>
                      <td className="py-3 px-4 font-medium">Pedro Santos</td>
                      <td className="py-3 px-4">Corte</td>
                      <td className="py-3 px-4">
                        <Badge variant="warning">Pendente</Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-50 transition">
                      <td className="py-3 px-4">16:30</td>
                      <td className="py-3 px-4 font-medium">Carlos Oliveira</td>
                      <td className="py-3 px-4">Barba</td>
                      <td className="py-3 px-4">
                        <Badge variant="success">Confirmado</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
