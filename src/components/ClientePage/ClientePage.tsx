import React, { useState } from 'react';
import './clientePage.css';

type ProblemaRoupa = {
    descricao: string;
};

type ProdutoLavanderia = {
    tipo: string;
    quantidade: number;
    problemas?: ProblemaRoupa[];
};

type Cliente = {
    id: number;
    nome: string;
    produtos: ProdutoLavanderia[];
};

const ClientePage: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([
        {
            id: 1,
            nome: 'João Silva',
            produtos: [
                { tipo: 'Camisa', quantidade: 3, problemas: [{ descricao: 'Rasgo na manga' }] },
                { tipo: 'Calça', quantidade: 2 },
            ],
        },
        {
            id: 2,
            nome: 'Maria Souza',
            produtos: [
                { tipo: 'Cobertor', quantidade: 1, problemas: [{ descricao: 'Mancha de vinho' }] },
            ],
        },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [novoNome, setNovoNome] = useState('');
    const [novoProdutos, setNovoProdutos] = useState<ProdutoLavanderia[]>([
        { tipo: '', quantidade: 1, problemas: [] },
    ]);
    const [editingClienteId, setEditingClienteId] = useState<number | null>(null);

    const handleNomeChange = (id: number, novoNome: string) => {
        setClientes(clientes.map(c => c.id === id ? { ...c, nome: novoNome } : c));
    };

    const handleProdutoChange = (
        clienteId: number,
        produtoIdx: number,
        campo: keyof ProdutoLavanderia,
        valor: string | number
    ) => {
        setClientes(prev =>
            prev.map(cliente => {
                if (cliente.id !== clienteId) return cliente;
                const novosProdutos = [...cliente.produtos];
                if (campo === 'tipo' && typeof valor === 'string') {
                    novosProdutos[produtoIdx].tipo = valor;
                } else if (campo === 'quantidade' && typeof valor === 'number') {
                    novosProdutos[produtoIdx].quantidade = valor;
                }
                return { ...cliente, produtos: novosProdutos };
            })
        );
    };

    const handleProblemaChange = (
        clienteId: number,
        produtoIdx: number,
        problemaIdx: number,
        descricao: string
    ) => {
        setClientes(prev =>
            prev.map(cliente => {
                if (cliente.id !== clienteId) return cliente;
                const novosProdutos = [...cliente.produtos];
                if (!novosProdutos[produtoIdx].problemas) return cliente;
                novosProdutos[produtoIdx].problemas![problemaIdx].descricao = descricao;
                return { ...cliente, produtos: novosProdutos };
            })
        );
    };

    const handleNovoProdutoChange = (produtoIdx: number, campo: keyof ProdutoLavanderia, valor: string | number) => {
        const novos = [...novoProdutos];
        (novos[produtoIdx] as ProdutoLavanderia)[campo] = valor as never;
        setNovoProdutos(novos);
    };

    const handleNovoProblemaChange = (produtoIdx: number, problemaIdx: number, valor: string) => {
        const novos = [...novoProdutos];
        novos[produtoIdx].problemas![problemaIdx].descricao = valor;
        setNovoProdutos(novos);
    };

    const adicionarProdutoNovo = () => {
        setNovoProdutos([...novoProdutos, { tipo: '', quantidade: 1, problemas: [] }]);
    };

    const adicionarProblemaAoProduto = (produtoIdx: number) => {
        const novos = [...novoProdutos];
        if (!novos[produtoIdx].problemas) novos[produtoIdx].problemas = [];
        novos[produtoIdx].problemas!.push({ descricao: '' });
        setNovoProdutos(novos);
    };

    const adicionarCliente = () => {
        if (!novoNome.trim()) return;
        const novoCliente: Cliente = {
            id: clientes.length + 1,
            nome: novoNome.trim(),
            produtos: novoProdutos,
        };
        setClientes([...clientes, novoCliente]);
        setNovoNome('');
        setNovoProdutos([{ tipo: '', quantidade: 1, problemas: [] }]);
        setShowForm(false);
    };

    return (
        <div className="container">
            <h1>Clientes da Lavanderia</h1>

            <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: '16px' }}>
                {showForm ? 'Cancelar' : 'Adicionar Cliente'}
            </button>

            {showForm && (
                <div className="form-container" style={{ flexDirection: 'column', gap: '12px' }}>
                    <input
                        type="text"
                        placeholder="Nome do cliente"
                        value={novoNome}
                        onChange={(e) => setNovoNome(e.target.value)}
                    />

                    {novoProdutos.map((produto, idx) => (
                        <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                            <input
                                type="text"
                                placeholder="Tipo de produto"
                                value={produto.tipo}
                                onChange={(e) => handleNovoProdutoChange(idx, 'tipo', e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Quantidade"
                                value={produto.quantidade}
                                onChange={(e) => handleNovoProdutoChange(idx, 'quantidade', Number(e.target.value))}
                            />
                            <div style={{ marginLeft: '12px' }}>
                                <strong>Problemas:</strong>
                                {produto.problemas?.map((problema, pidx) => (
                                    <input
                                        key={pidx}
                                        type="text"
                                        placeholder="Descrição do problema"
                                        value={problema.descricao}
                                        onChange={(e) => handleNovoProblemaChange(idx, pidx, e.target.value)}
                                    />
                                ))}
                                <button onClick={() => adicionarProblemaAoProduto(idx)} type="button">
                                    + Adicionar Problema
                                </button>
                            </div>
                        </div>
                    ))}

                    <button type="button" onClick={adicionarProdutoNovo}>
                        + Adicionar Produto
                    </button>
                    <button onClick={adicionarCliente}>Salvar Cliente</button>
                </div>
            )}

            <div className="clientes-grid">
                {clientes.map((cliente) => (
                    <div key={cliente.id} className="cliente-card">
                        <div className="cliente-header">
                            {editingClienteId === cliente.id ? (
                                <input
                                    type="text"
                                    value={cliente.nome}
                                    onChange={(e) => handleNomeChange(cliente.id, e.target.value)}
                                />
                            ) : (
                                <h2>{cliente.nome}</h2>
                            )}
                            <button onClick={() =>
                                setEditingClienteId(editingClienteId === cliente.id ? null : cliente.id)
                            }>
                                {editingClienteId === cliente.id ? 'Salvar' : 'Editar'}
                            </button>
                        </div>

                        <div className="card-section">
                            {cliente.produtos.length > 0 ? (
                                <ul>
                                    {cliente.produtos.map((produto, idx) => (
                                        <li key={idx}>
                                            {editingClienteId === cliente.id ? (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={produto.tipo}
                                                        onChange={(e) =>
                                                            handleProdutoChange(cliente.id, idx, 'tipo', e.target.value)
                                                        }
                                                        placeholder="Tipo"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={produto.quantidade}
                                                        onChange={(e) =>
                                                            handleProdutoChange(cliente.id, idx, 'quantidade', Number(e.target.value))
                                                        }
                                                        placeholder="Quantidade"
                                                    />
                                                    {produto.problemas?.map((problema, pidx) => (
                                                        <input
                                                            key={pidx}
                                                            type="text"
                                                            value={problema.descricao}
                                                            onChange={(e) =>
                                                                handleProblemaChange(cliente.id, idx, pidx, e.target.value)
                                                            }
                                                            placeholder="Descrição do problema"
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div>
                                                    <strong>{produto.tipo}</strong> - {produto.quantidade} unidade(s)
                                                    {produto.problemas && produto.problemas.length > 0 && (
                                                        <ul>
                                                            {produto.problemas.map((problema, pidx) => (
                                                                <li key={pidx} className="problema">
                                                                    Problema: {problema.descricao}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="sem-produto">Nenhum produto registrado</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientePage;
