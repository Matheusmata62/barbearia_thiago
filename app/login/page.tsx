'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // Simulating network delay for effect
    await new Promise(resolve => setTimeout(resolve, 800))

    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/dashboard')
    } else {
      setError('Credenciais inválidas. Tente novamente.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-900/20 group-hover:rotate-12 transition-transform duration-500">
              <span className="text-3xl">✂️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Barbearia THG</h1>
              <p className="text-neutral-400 text-sm mt-1 font-medium">Portal Administrativo</p>
            </div>
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-neutral-300 mb-2 text-sm font-medium ml-1">
                Usuário
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 group-focus-within:text-amber-400 transition-colors">👤</span>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full bg-neutral-900/50 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 border border-white/5 focus:border-amber-500/50 transition-all placeholder:text-neutral-600"
                  placeholder="Nome de usuário"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 mb-2 text-sm font-medium ml-1">
                Senha
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 group-focus-within:text-amber-400 transition-colors">🔒</span>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full bg-neutral-900/50 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 border border-white/5 focus:border-amber-500/50 transition-all placeholder:text-neutral-600"
                  placeholder="Sua senha secreta"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center font-medium animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-amber-500 focus:ring-4 focus:ring-amber-500/20 transition-all shadow-lg shadow-amber-900/20 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Entrando...
                </span>
              ) : (
                'Acessar Sistema'
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium">
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  )
}
