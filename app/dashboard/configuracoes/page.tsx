'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Configuracoes() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [saved, setSaved] = useState(false)
  const [config, setConfig] = useState({
    nomeBarbearia: 'Barbearia THG',
    endereco: 'Rua Exemplo, 123',
    cidade: 'Cidade',
    estado: 'UF',
    cep: '00000-000',
    telefone: '(00) 00000-0000',
    whatsapp: '5500000000000',
    horarioSegSex: '09:00 - 19:00',
    horarioSab: '09:00 - 17:00',
    horairioDom: 'Fechado',
    servicos: [
      { nome: 'Corte de Cabelo', preco: '40' },
      { nome: 'Barba', preco: '30' },
      { nome: 'Corte + Barba', preco: '60' }
    ]
  })

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    if (!auth) {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você salvaria as configurações (localStorage, backend, etc)
    localStorage.setItem('barbeariaConfig', JSON.stringify(config))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleServicoChange = (index: number, field: 'nome' | 'preco', value: string) => {
    const novosServicos = [...config.servicos]
    novosServicos[index] = { ...novosServicos[index], [field]: value }
    setConfig({ ...config, servicos: novosServicos })
  }

  const addServico = () => {
    setConfig({
      ...config,
      servicos: [...config.servicos, { nome: '', preco: '' }]
    })
  }

  const removeServico = (index: number) => {
    const novosServicos = config.servicos.filter((_, i) => i !== index)
    setConfig({ ...config, servicos: novosServicos })
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-yellow-400 transition">
            <span>←</span>
            <span>Voltar ao Dashboard</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Configurações</h1>

        {saved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Configurações salvas com sucesso!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Informações da Barbearia */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏪</span>
              <h2 className="text-xl font-bold text-gray-900">Informações da Barbearia</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Nome da Barbearia</label>
                <input
                  type="text"
                  value={config.nomeBarbearia}
                  onChange={(e) => setConfig({...config, nomeBarbearia: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Telefone</label>
                <input
                  type="text"
                  value={config.telefone}
                  onChange={(e) => setConfig({...config, telefone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">WhatsApp (com DDI)</label>
                <input
                  type="text"
                  value={config.whatsapp}
                  onChange={(e) => setConfig({...config, whatsapp: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5511999999999"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">CEP</label>
                <input
                  type="text"
                  value={config.cep}
                  onChange={(e) => setConfig({...config, cep: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Endereço</label>
                <input
                  type="text"
                  value={config.endereco}
                  onChange={(e) => setConfig({...config, endereco: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cidade</label>
                <input
                  type="text"
                  value={config.cidade}
                  onChange={(e) => setConfig({...config, cidade: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Estado</label>
                <input
                  type="text"
                  value={config.estado}
                  onChange={(e) => setConfig({...config, estado: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Horários de Funcionamento */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🕐</span>
              <h2 className="text-xl font-bold text-gray-900">Horários de Funcionamento</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Segunda a Sexta</label>
                <input
                  type="text"
                  value={config.horarioSegSex}
                  onChange={(e) => setConfig({...config, horarioSegSex: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Sábado</label>
                <input
                  type="text"
                  value={config.horarioSab}
                  onChange={(e) => setConfig({...config, horarioSab: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Domingo</label>
                <input
                  type="text"
                  value={config.horairioDom}
                  onChange={(e) => setConfig({...config, horairioDom: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Serviços e Preços */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">✂️</span>
                <h2 className="text-xl font-bold text-gray-900">Serviços e Preços</h2>
              </div>
              <button
                type="button"
                onClick={addServico}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm"
              >
                + Adicionar Serviço
              </button>
            </div>
            <div className="space-y-3">
              {config.servicos.map((servico, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={servico.nome}
                    onChange={(e) => handleServicoChange(index, 'nome', e.target.value)}
                    placeholder="Nome do serviço"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    value={servico.preco}
                    onChange={(e) => handleServicoChange(index, 'preco', e.target.value)}
                    placeholder="Preço"
                    className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {config.servicos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeServico(index)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Botão Salvar */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition font-semibold"
            >
              <span>💾</span>
              Salvar Configurações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
