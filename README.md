# trabalho-life
Senac - Trabalho de atividade em grupo sobre Lifelong Learning.


## Banco de dados no SUPABASE
Banco de dados no SUPABASE
O Supabase oferece um banco de dados PostgreSQL totalmente gerenciado, que cria automaticamente APIs para todas as tabelas, facilitando a manipulação dos dados. Além disso, suporta autenticação, armazenamento e funções sem servidor, tudo integrado em uma única plataforma.

### Criando tabela
Aqui será explicado o passo a passo para criar as tabelas no painel do Supabase, definindo colunas e tipos de dados, que automaticamente geram endpoints para uso na aplicação. Como eu só posso ter dois banco de dados eu usu tabelas com o préfixo dos projetos, no caso Lifelong Learning vai ser ll_tabela

- Criando tabela ll_usuarios

```sql
create table ll_usuarios (
    id bigserial primary key,
    nome text not null default 'Anônimo'
);
```

- Criando tabela ll_categorias

```sql
create table ll_categorias (
  id bigserial primary key,
  nome text not null
);
```

- Criando tabela ll_notas

```sql
create table ll_notas (
    id bigserial primary key,
    usuario_id bigint not null,
    categoria_id bigint not null,
    texto text not null,
    data timestamptz default now(),

    constraint notas_usuario_fk foreign key (usuario_id) references ll_usuarios(id),
    constraint notas_categoria_fk foreign key (categoria_id) references ll_categorias(id)
);
```

- Criando view para ver os joins da tabela ll_notas

```sql
CREATE VIEW ll_vw_notas AS
SELECT 
    n.id,
    n.categoria_id,
    n.usuario_id,
    u.nome AS usuario_nome,
    n.texto
FROM ll_notas n
JOIN ll_usuarios u ON u.id = n.usuario_id;
```

### Criando conexão com o banco de dados

Documentação consultada: https://supabase.github.io/supabase-js/v2/

- no .html inserir:

```html
<script type="module" src="script.js"></script>
```

- e no javascript inserir:

```js
// SUPABASE - Biblioteca
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// SUPABASE - Conexão
const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = 'SUA_ANON_KEY_AQUI';
const supabase = createClient(supabaseUrl, supabaseKey);
```

- A `URL` você pega em Project Settings > Data API
- A `ANON_KEY` você pega em Project Setting > API Keys, NUNCA COLOQUE A CHAVE SECRETA NO FRONTEND!

- Pegando informações do banco

```js
const { data, error } = await supabase
    .from('ll_vw_notas')
    .select('*')
    .order('id', { ascending: false }); // ← últimas notas primeiro

if (error) console.error('Erro ao conectar:', error);
```

- Inserindo dados

```js
const { data, error } = await supabase
    .from('ll_notas')
    .insert([
        {
            usuario_id: logado.id,
            categoria_id: parseInt(categoria),
            texto: texto
        }
    ])
    .select()
    .single(); // retorna o registro inserido

if (error) console.error('Erro ao cadastrar nota:', error);
```
- Apagando dados

```js
const { data, error } = await supabase
.from('ll_notas')
.delete()
.eq('id', id)

if(error) {
    console.error('Erro ao apagar nota:', error)
    return null
}
```

### Ativando `realtime` para ouvir alterações nas tabelas

- No site do supabase vá até Table Editor > na tabela vai ter mais opções, selecione Edit Table e em seguita marque `Enable Realtime`

