# Barbearia THG - Sistema de Gerenciamento

Sistema completo de gerenciamento para barbearia desenvolvido com Next.js 14, TypeScript e Tailwind CSS, pronto para deploy no Vercel.

## 🚀 Funcionalidades

### Página Inicial
- Design moderno e responsivo
- Apresentação de serviços
- Horários de funcionamento
- Informações de contato
- Link para WhatsApp

### Área Administrativa
- **Dashboard**: Visão geral com estatísticas
- **Gerenciamento de Clientes**: Cadastro, edição, busca e exclusão
- **Agendamentos**: Calendário, novos agendamentos e controle de status
- **Configurações**: Personalização de nome, endereço, horários e serviços

## 🔧 Tecnologias

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização moderna
- **React Icons**: Ícones
- **LocalStorage**: Armazenamento temporário (pode ser substituído por banco de dados)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 🌐 Deploy no Vercel

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Import Project"
4. Selecione seu repositório
5. O Vercel detectará automaticamente Next.js
6. Clique em "Deploy"

Ou use a CLI do Vercel:

```bash
npm install -g vercel
vercel
```

## 🔐 Acesso Administrativo

**Credenciais padrão:**
- Usuário: `admin`
- Senha: `admin123`

⚠️ **IMPORTANTE**: Altere as credenciais em produção!

## 📱 Páginas

- `/` - Página inicial
- `/login` - Login administrativo
- `/dashboard` - Dashboard principal
- `/dashboard/clientes` - Gerenciar clientes
- `/dashboard/agendamentos` - Gerenciar agendamentos
- `/dashboard/configuracoes` - Configurações da barbearia

## 🎨 Personalização

Todas as configurações podem ser alteradas pela interface:
- Nome da barbearia
- Endereço e contatos
- Horários de funcionamento
- Serviços e preços

## 📝 Próximos Passos

Para produção, considere adicionar:
- Backend com API (Node.js, Python, etc)
- Banco de dados (PostgreSQL, MongoDB)
- Autenticação segura (NextAuth.js, JWT)
- Sistema de notificações (email, SMS)
- Integração com calendário
- Pagamentos online

## 📄 Licença

Projeto de código aberto para uso livre.
