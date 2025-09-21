const notas = [
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Aprendi lógica de programação na escola técnica."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Fiz um curso livre de React e amei a experiência."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Aprendo assistindo vídeos tutoriais no YouTube todo dia."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Matemática financeira no curso me ajudou a entender melhor meu orçamento."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Participei de um workshop sobre UX Design que mudou minha visão."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Conversar com colegas mais experientes me faz crescer muito."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "No laboratório de informática fiz vários projetos que aprendi fazendo."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Gosto de fazer bootcamps rápidos para aprender tecnologias novas."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Errei muito em projetos pessoais, mas aprendi com cada erro."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "A disciplina de redes na escola foi importante para meu entendimento de internet."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Participei de uma oficina de soft skills que mudou minha postura profissional."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Aprendo todos os dias jogando e conversando com amigos online."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Estudo inglês no curso técnico, essencial para a área de TI."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Curso de Python online me ajudou a conseguir estágio."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Sigo canais de programação no YouTube para me manter atualizado."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Frequentei aulas práticas de banco de dados na escola."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Workshop sobre gestão de tempo me ajudou a organizar meus estudos."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Conversar com familiares sobre tecnologia me motiva a aprender mais."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Aprendi lógica e algoritmos nas aulas formais de programação."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Curso de git e versionamento foi fundamental para meu trabalho."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Busco resolver problemas sozinho para aprender de forma prática."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Estudo matemática para entender melhor a lógica computacional."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Participar de bootcamp me deu uma visão de mercado."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Aprendi muito com feedback dos colegas em projetos pessoais."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Fui aluno da disciplina de Sistemas Operacionais."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Oficina de design de interfaces ajudou meu portfólio."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Testar códigos diferentes me fez evoluir muito no aprendizado informal."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Aprendi conceitos de hardware na aula prática da escola."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Curso de marketing digital fora da escola abriu minha mente para negócios."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Trocar ideias em fóruns online ajuda no aprendizado informal."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Fiz projeto final de curso que consolidou meu aprendizado formal."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Participei de evento de tecnologia e networking."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Aprendo muito ao tentar resolver problemas reais no dia a dia."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Frequentei aulas de linguagens de programação no curso técnico."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Curso rápido de Excel melhorou minha organização."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Conversar com amigos sobre carreira é uma forma importante de aprendizado."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Aulas de ética no curso me mostraram a importância disso na carreira."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Participei de hackathon e aprendi muito fora da sala formal."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Ler blogs técnicos me ajuda a ficar atualizado."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Aprendi noções básicas de segurança da informação na escola."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Curso de desenvolvimento pessoal me ajudou a ter mais foco."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Ver tutoriais semanais me mantém motivado."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Estudei algoritmos avançados no curso técnico."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Workshop de comunicação melhorou minha apresentação em grupo."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Praticar programação fora da escola é meu principal aprendizado."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Disciplina de redes ensina conceitos fundamentais para tecnologia."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Curso de gestão de projetos ajudou a organizar meus estudos."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Conversar com mentores informalmente é um aprendizado constante."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Aprendi lógica booleana nas aulas técnicas."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Evento de inovação me inspirou a buscar mais conhecimento."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Aprendo programando pequenos projetos em casa."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Matéria de banco de dados organizou meu conhecimento."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Curso de design thinking inovou minha forma de pensar."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Dialogar com amigos sobre tecnologia me ajuda a entender conceitos."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Aulas práticas de manutenção de hardware foram importantes."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Bootcamp de front-end abriu meus horizontes."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Observar como colegas resolvem problemas é aprendizado."
    },
    {
        "usuario_id": 1,
        "categoria_id": 1,
        "texto": "Curso técnico deu base sólida para minha carreira."
    },
    {
        "usuario_id": 1,
        "categoria_id": 2,
        "texto": "Participação em grupos de estudo melhorou meu desempenho."
    },
    {
        "usuario_id": 1,
        "categoria_id": 3,
        "texto": "Aprendo muito com erros e tentativas pessoais."
    }
];
