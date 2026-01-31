'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLocalStorage } from '../../hooks/useLocalStorage'

interface Cliente {
  id: number
  nome: string
  telefone: string
  email: string
  ultimaVisita: string
}

export default function Clientes() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [clientes, setClientes] = useLocalStorage<Cliente[]>('clientes', [
    { id: 1, nome: 'João Silva', telefone: '(11) 98765-4321', email: 'joao@email.com', ultimaVisita: '25/01/2026' },
    { id: 2, nome: 'Pedro Santos', telefone: '(11) 91234-5678', email: 'pedro@email.com', ultimaVisita: '28/01/2026' },
    { id: 3, nome: 'Carlos Oliveira', telefone: '(11) 99876-5432', email: 'carlos@email.com', ultimaVisita: '30/01/2026' },
  ])
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    telefone: '',
    email: ''
  })

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    if (!auth) {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleAddCliente = (e: React.FormEvent) => {
    e.preventDefault()
    const cliente: Cliente = {
      id: clientes.length + 1,
      ...novoCliente,
      ultimaVisita: new Date().toLocaleDateString('pt-BR')
    }
    setClientes([...clientes, cliente])
    setNovoCliente({ nome: '', telefone: '', email: '' })
    setShowModal(false)
  }

  const handleDeleteCliente = (id: number) => {
    if (confirm('Deseja realmente excluir este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id))
    }
  }

  const filteredClientes = clientes.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.telefone.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Clientes</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <span>➕</span>
            Novo Cliente
          </button>
        </div>

        {/* Busca */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Buscar por nome, telefone ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Lista de Clientes */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Nome</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Telefone</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Email</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Última Visita</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{cliente.nome}</td>
                  <td className="py-3 px-4">{cliente.telefone}</td>
                  <td className="py-3 px-4">{cliente.email}</td>
                  <td className="py-3 px-4">{cliente.ultimaVisita}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <span>✏️</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteCliente(cliente.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <span>🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClientes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum cliente encontrado
          </div>
        )}
      </div>

      {/* Modal Novo Cliente */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Novo Cliente</h2>
            <form onSubmit={handleAddCliente}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    value={novoCliente.nome}
                    onChange={(e) => setNovoCliente({...novoCliente, nome: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={novoCliente.telefone}
                    onChange={(e) => setNovoCliente({...novoCliente, telefone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={novoCliente.email}
                    onChange={(e) => setNovoCliente({...novoCliente, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
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
