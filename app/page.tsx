'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-neutral-50 selection:bg-amber-500 selection:text-white font-sans">
      {/* Navigation - Glassmorphism */}
      <header className="fixed top-0 w-full z-50 transition-all duration-300 glass-effect shadow-sm">
        <div className="container-max flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
              <span className="text-xl text-white">✂️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Barbearia THG</h1>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-neutral-600 hover:text-amber-600 font-medium transition-colors duration-300">Início</a>
            <a href="#servicos" className="text-neutral-600 hover:text-amber-600 font-medium transition-colors duration-300">Serviços</a>
            <a href="#contato" className="text-neutral-600 hover:text-amber-600 font-medium transition-colors duration-300">Contato</a>
          </nav>

          <div className="hidden md:block">
            <Link 
              href="/login" 
              className="btn-primary text-sm px-5 py-2.5"
            >
              Área do Cliente
            </Link>
          </div>

          <button 
            className="md:hidden text-2xl p-2 text-neutral-800 hover:bg-neutral-200 rounded-lg transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-neutral-200 shadow-xl py-6 px-6 flex flex-col gap-4 animate-fade-in-up">
            <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-neutral-600 hover:text-amber-600 transition-colors">Início</a>
            <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-neutral-600 hover:text-amber-600 transition-colors">Serviços</a>
            <a href="#contato" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-neutral-600 hover:text-amber-600 transition-colors">Contato</a>
            <Link 
              href="/login" 
              className="btn-primary text-center py-3 mt-2"
            >
              Área do Cliente
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-neutral-900">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container-max relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Experiência Premium em Barbearia
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.2] animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Estilo que Define <br/>
            <span className="gradient-text">Sua Personalidade</span>
          </h1>
          
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Mais do que um corte, proporcionamos um momento de cuidado e relaxamento. 
            Profissionais experientes em um ambiente pensado para você.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <a 
              href="#agendar" 
              className="w-full md:w-auto px-8 py-4 btn-primary text-lg hover:scale-105"
            >
              ✂️ Agendar Horário
            </a>
            <a 
              href="#servicos" 
              className="w-full md:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              📋 Conhecer Serviços
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 bg-white">
        <div className="container-max">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Nossos Serviços</h2>
            <p className="text-neutral-500 text-lg">Excelência e precisão em cada detalhe do seu visual</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group card-base">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                ✂️
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Corte Moderno</h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                Consultoria de visagismo e cortes alinhados com as últimas tendências.
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                <span className="text-2xl font-bold text-neutral-900">R$ 45</span>
                <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">30-40 min</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group card-base">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                🧔
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Barba Terapia</h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                Toalha quente, hidratação profunda e alinhamento perfeito dos fios.
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                <span className="text-2xl font-bold text-neutral-900">R$ 35</span>
                <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">30 min</span>
              </div>
            </div>

            {/* Card 3 - Featured */}
            <div className="group card-base !bg-neutral-900 !text-white !border-amber-500/30 hover:!border-amber-500/50 relative overflow-hidden md:md:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <div className="inline-block px-3 py-1 bg-amber-500/20 rounded-full text-xs font-bold text-amber-300 mb-4">⭐ DESTAQUE</div>
                <h3 className="text-xl font-bold text-white mb-3">Combo Completo</h3>
                <p className="text-neutral-300 mb-6 leading-relaxed">
                  A experiência definitiva. Corte, barba e tratamento facial relaxante.
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <span className="text-2xl font-bold text-amber-400">R$ 70</span>
                  <span className="text-sm font-medium text-white bg-white/10 px-3 py-1 rounded-full">60 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info/Hours Section */}
      <section className="py-24 bg-neutral-900 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

        <div className="container-max relative z-10">
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-[2rem] p-8 md:p-12 border border-white/5 shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            
            <div className="flex-1 space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Horários Flexíveis</h3>
                <p className="text-neutral-400">Para se ajustar à sua rotina corrida.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-500 text-xl">📅</span>
                    <span className="text-neutral-200 font-medium">Segunda a Sexta</span>
                  </div>
                  <span className="text-white font-bold">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-500 text-xl">📅</span>
                    <span className="text-neutral-200 font-medium">Sábado</span>
                  </div>
                  <span className="text-white font-bold">09:00 - 18:00</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-px h-px md:h-64 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

            <div id="contato" className="flex-1 w-full space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Localização</h3>
                <p className="text-neutral-400">Fácil acesso e estacionamento.</p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl text-center transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-lg shadow-amber-900/30">
                <span className="text-4xl block mb-2">📍</span>
                <p className="text-amber-950 font-bold text-lg mb-1">Rua das Acácias, 123</p>
                <p className="text-amber-900/80 text-sm">Centro - Sua Cidade</p>
                <button className="mt-4 bg-white text-amber-600 px-6 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-amber-50 hover:shadow-md transition-all duration-300">
                  Ver no Mapa
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-neutral-100">
        <div className="container-max">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">✂️</span>
              <span className="font-bold text-neutral-900">Barbearia THG</span>
            </Link>
            <p className="text-neutral-500 text-sm">
              © 2026 Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                📸
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                📱
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20um%20horário!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:scale-110 transition-all duration-300"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <div className="hidden md:block text-left">
           <p className="text-xs font-bold text-green-100 leading-none mb-0.5">Agende via</p>
           <p className="font-bold text-sm leading-none">WhatsApp</p>
        </div>
      </a>
    </main>
  )
}
