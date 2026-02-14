# 🎬 Catálogo de Filmes

Uma aplicação web moderna para explorar e descobrir filmes utilizando a API do TMDB (The Movie Database). Construída com Next.js e React, oferece uma experiência de usuário fluida com busca em tempo real, paginação e informações detalhadas sobre cada filme.

## ✨ Funcionalidades

- **🔍 Busca Global**: Pesquise filmes em toda a base de dados do TMDB sem limitações de página
- **📄 Paginação**: Navegue pelos filmes com paginação numerada e intuitiva
- **🎞️ Detalhes Completos**: Acesse informações abrangentes sobre cada filme em um modal elegante:
  - Título e Nota (avaliação)
  - Gêneros
  - Diretor
  - Sinopse detalhada
  - Elenco principal (6 atores)
- **💅 Design Moderno**: Interface responsiva com gradientes, animações suaves e tema escuro
- **⚡ Performance**: Carregamento otimizado com debounce na busca

## 🛠️ Tecnologias

- **Next.js 16.1.6** - Framework React com app router
- **React 19.2.3** - Biblioteca para UI interativa
- **TypeScript 5** - Type safety
- **Sass** - CSS com superpoderes
- **Axios** - Cliente HTTP
- **React Icons** - Ícones vetoriais
- **TMDB API** - Base de dados de filmes

## 📦 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Davi300Git/Catalogo-de-Filmes.git
cd CatalagoFilmes/movies-app
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🚀 Como Usar

### Explorar Filmes
- A página inicial mostra um catálogo de filmes com paginação
- Use os botões **Anterior** e **Próxima** para navegar entre páginas
- Clique no número da página para ir diretamente

### Buscar Filmes
- Use a barra de pesquisa no topo direito
- Digite o nome do filme desejado
- A busca ocorre em tempo real com debounce de 300ms
- Busca em **toda a base de dados** do TMDB, não apenas na página atual

### Ver Detalhes
- Clique no botão **"Ver mais"** em qualquer cartão de filme
- Um modal abrirá mostrando:
  - Pôster do filme
  - Título e nota de avaliação
  - Gêneros
  - Diretor
  - Sinopse completa
  - Elenco principal
- Clique fora do modal ou no ícone **×** para fechar

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── navbar/
│   │   ├── index.tsx           # Barra de navegação com search
│   │   ├── index.scss
│   │   ├── MovieList/          # Lista de filmes com paginação
│   │   │   ├── index.tsx
│   │   │   └── index.scss
│   │   └── MOvieCard/          # Card individual do filme
│   │       ├── index.tsx
│   │       └── index.scss
│   ├── Modal/                  # Modal para detalhes
│   │   ├── index.tsx
│   │   └── index.scss
│   ├── search/
│   │   └── SearchProvider.tsx  # Context para estado de busca
│   └── StarRating/             # Componente de avaliação
│       ├── index.tsx
│       └── index.scss
├── type/
│   └── movie.ts                # Interface de dados
└── app/
    ├── layout.tsx              # Layout raiz
    ├── page.tsx                # Página principal
    └── globals.scss            # Estilos globais
```

## 🌐 API

A aplicação utiliza a **TMDB (The Movie Database) API**:

- **Endpoint de Catálogo**: `/discover/movie`
- **Endpoint de Busca**: `/search/movie`
- **Endpoint de Detalhes**: `/movie/{id}?append_to_response=credits`

## 🎨 Recursos de Design

- **Paleta de Cores**:
  - Primária: `#7c5cff` (Roxo)
  - Secundária: `#5dd3ff` (Azul claro)
  - Fundo: `rgba(2, 6, 23)` (Preto azulado)

- **Tamanho dos Cards**: 220px × 330px (fixo, mantém proporção na busca)
- **Animações**: Transições suaves de 220ms a 450ms
- **Responsividade**: Grid adaptativo com quebras automáticas

## 📝 Notas

- A busca agora utiliza a API `/search/movie` do TMDB para resultados em toda a base de dados
- Os resultados da busca também possuem paginação própria
- Ao limpar a barra de busca, retorna ao catálogo de descoberta
- Debounce de 300ms na busca para otimizar requisições

## 📄 Licença

Este projeto utiliza a API pública do TMDB. Consulte os [termos de uso](https://www.themoviedb.org/settings/api) do TMDB.

## 👨‍💻 Autor

Desenvolvido usando Next.js e React

---

**Aproveite a exploração de filmes! 🍿**
