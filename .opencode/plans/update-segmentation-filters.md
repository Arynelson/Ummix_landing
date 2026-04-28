# Plano: Atualizar Seção de Segmentações/Filtros

## Arquivo a ser editado
`src/components/Segmentation.jsx` - linha 5-9

## Alteração
Substituir o objeto `tabs` atual:

```javascript
// ANTES (3 categorias, 6 filtros cada)
const tabs = {
  'Demográfico': ['Idade', 'Gênero', 'Renda', 'Escolaridade', 'Estado Civil', 'Classe Social'],
  'Geográfico': ['Estado', 'Cidade', 'Bairro', 'CEP', 'Região Metropolitana', 'Raio de Cobertura'],
  'Comportamental': ['Interesses', 'Hábitos de Consumo', 'Estilo de Vida', 'Audiência de TV', 'Horário de Pico', 'Afinidade de Marca'],
}

// DEPOIS (5 categorias, filtros consolidados)
const tabs = {
  'Geográfico': ['Estado', 'Cidade', 'Região', 'Bairro', 'Raio de Cobertura', 'Cidade de Nascimento', 'Estado de Nascimento'],
  'Demográfico': ['Idade', 'Sexo', 'Escolaridade', 'Ocupação', 'Renda Familiar', 'Possui Filhos', 'Mobilidade'],
  'Comportamento': ['Estilo de Vida', 'Atividades Físicas', 'Pets', 'Agronegócio', 'Conteúdo de Interesse', 'Consumo de Mídia', 'Meio', 'Dia', 'Horário'],
  'Intenções': ['Viagem', 'Eletrônicos', 'Automóveis', 'Imóveis', 'Reforma/Construção', 'Investimentos', 'Cursos', 'Procedimentos Estéticos'],
  'Opinião e Perfil': ['Posição Política', 'Aprovação de Gestões', 'Restrições Financeiras', 'Energia Residencial', 'Plano de Saúde', 'Seguros'],
}
```

## Mapeamento dos filtros brutos para consolidados

| Filtro Bruto | Filtro Consolidado | Categoria |
|---|---|---|
| Cidades | Cidade, Região, Bairro | Geográfico |
| Estado de Nascimento | Estado de Nascimento | Geográfico |
| Cidade de Nascimento | Cidade de Nascimento | Geográfico |
| Idade | Idade | Demográfico |
| Sexo | Sexo | Demográfico |
| Escolaridade | Escolaridade | Demográfico |
| Ocupação | Ocupação | Demográfico |
| Renda Familiar | Renda Familiar | Demográfico |
| Possui filhos | Possui Filhos | Demográfico |
| Estuda/trabalha fora | Mobilidade | Demográfico |
| Prática atividades físicas | Atividades Físicas | Comportamento |
| Possui pets | Pets | Comportamento |
| Relação com agronegócio | Agronegócio | Comportamento |
| Conteúdo de Interesse | Conteúdo de Interesse | Comportamento |
| Onde consumo mídia | Consumo de Mídia | Comportamento |
| Meio | Meio | Comportamento |
| Determinação de Dia | Dia | Comportamento |
| Determinação de Horário | Horário | Comportamento |
| Pretende viajar | Viagem | Intenções |
| Pretende comprar eletrônicos | Eletrônicos | Intenções |
| Pretende comprar automóveis | Automóveis | Intenções |
| Pretende comprar imóvel | Imóveis | Intenções |
| Pretende construir/reformar | Reforma/Construção | Intenções |
| Pretende fazer investimentos | Investimentos | Intenções |
| Pretende fazer curso | Cursos | Intenções |
| Pretende procedimento estético | Procedimentos Estéticos | Intenções |
| Posição Política | Posição Política | Opinião e Perfil |
| Aprova gestões (estadual/federal/municipal/câmara) | Aprovação de Gestões | Opinião e Perfil |
| Restrições em nome | Restrições Financeiras | Opinião e Perfil |
| Tipo de energia residencial | Energia Residencial | Opinião e Perfil |
| Plano de saúde | Plano de Saúde | Opinião e Perfil |
| Seguros (auto, celular, residência, saúde, vida) | Seguros | Opinião e Perfil |
