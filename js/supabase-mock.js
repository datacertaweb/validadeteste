
/**
 * Mock do Supabase para demonstração
 * Substitui o cliente real para contornar bloqueios de firewall e permitir demo offline.
 */

console.log('Carregando Supabase Mock...');

// Dados Mockados
const MOCK_DB = {
    master_users: [
        {
            id: 'master-123',
            email: 'admin@datacerta.com',
            role: 'master',
            ativo: true,
            nome: 'Administrador Master',
            created_at: new Date().toISOString()
        }
    ],
    empresas: [
        {
            id: 'empresa-123',
            nome: 'Supermercado Demo',
            cnpj: '12.345.678/0001-90',
            status: 'ativo',
            plano_id: 'plano-pro',
            trial_ends_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // +30 dias
            created_at: new Date().toISOString()
        }
    ],
    usuarios: [
        {
            id: 'user-123',
            empresa_id: 'empresa-123',
            nome: 'Gerente Demo',
            email: 'gerente@demo.com',
            role_id: 'role-admin',
            ativo: true,
            created_at: new Date().toISOString()
        },
        {
            id: 'user-456',
            empresa_id: 'empresa-123',
            nome: 'Repositor Demo',
            email: 'repositor@demo.com',
            role_id: 'role-user',
            ativo: true,
            created_at: new Date().toISOString()
        }
    ],
    roles: [
        {
            id: 'role-admin',
            empresa_id: 'empresa-123',
            nome: 'Administrador',
            is_admin: true,
            created_at: new Date().toISOString()
        },
        {
            id: 'role-user',
            empresa_id: 'empresa-123',
            nome: 'Operador',
            is_admin: false,
            created_at: new Date().toISOString()
        }
    ],
    lojas: [
        {
            id: 'loja-1',
            empresa_id: 'empresa-123',
            nome: 'Matriz - Centro',
            endereco: 'Av. Principal, 1000',
            ativo: true,
            created_at: new Date().toISOString()
        },
        {
            id: 'loja-2',
            empresa_id: 'empresa-123',
            nome: 'Filial - Shopping',
            endereco: 'Rua do Shopping, 500',
            ativo: true,
            created_at: new Date().toISOString()
        }
    ],
    locais: [
        {
            id: 'local-1',
            loja_id: 'loja-1',
            nome: 'Gôndola 1',
            descricao: 'Mercearia',
            ativo: true
        },
        {
            id: 'local-2',
            loja_id: 'loja-1',
            nome: 'Geladeira Laticínios',
            descricao: 'Frios e Laticínios',
            ativo: true
        },
        {
            id: 'local-3',
            loja_id: 'loja-2',
            nome: 'Corredor Bebidas',
            descricao: 'Bebidas e Sucos',
            ativo: true
        }
    ],
    // Tabela de produtos (chamada de 'base' no código)
    base: [
        {
            id: 'prod-1',
            empresa_id: 'empresa-123',
            codigo: '7891234567890',
            descricao: 'Leite Integral 1L',
            marca: 'Laticínios Bom',
            categoria: 'Laticínios',
            valor_unitario: 5.99,
            foto_url: null,
            ativo: true
        },
        {
            id: 'prod-2',
            empresa_id: 'empresa-123',
            codigo: '7890987654321',
            descricao: 'Arroz Branco 5kg',
            marca: 'Arroz Soltinho',
            categoria: 'Mercearia',
            valor_unitario: 24.90,
            foto_url: null,
            ativo: true
        },
        {
            id: 'prod-3',
            empresa_id: 'empresa-123',
            codigo: '7891112223334',
            descricao: 'Iogurte Natural 170g',
            marca: 'Laticínios Bom',
            categoria: 'Laticínios',
            valor_unitario: 3.50,
            foto_url: null,
            ativo: true
        },
        {
            id: 'prod-4',
            empresa_id: 'empresa-123',
            codigo: '7895556667778',
            descricao: 'Refrigerante Cola 2L',
            marca: 'Cola Cool',
            categoria: 'Bebidas',
            valor_unitario: 8.99,
            foto_url: null,
            ativo: true
        }
    ],
    // Tabela de estoque/validade (chamada de 'coletados' no código)
    coletados: [
        {
            id: 'col-1',
            produto_id: 'prod-1',
            loja_id: 'loja-1',
            local_id: 'local-2',
            validade: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // Vencido há 2 dias
            lote: 'L123',
            quantidade: 10,
            created_at: new Date().toISOString()
        },
        {
            id: 'col-2',
            produto_id: 'prod-3',
            loja_id: 'loja-1',
            local_id: 'local-2',
            validade: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // Vence em 2 dias (Crítico)
            lote: 'L124',
            quantidade: 15,
            created_at: new Date().toISOString()
        },
        {
            id: 'col-3',
            produto_id: 'prod-2',
            loja_id: 'loja-1',
            local_id: 'local-1',
            validade: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(), // Vence em 15 dias (Alerta)
            lote: 'L125',
            quantidade: 50,
            created_at: new Date().toISOString()
        },
        {
            id: 'col-4',
            produto_id: 'prod-4',
            loja_id: 'loja-2',
            local_id: 'local-3',
            validade: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(), // OK
            lote: 'L126',
            quantidade: 100,
            created_at: new Date().toISOString()
        }
    ],
    planos: [
        {
            id: 'plano-pro',
            nome: 'Profissional',
            descricao: 'Plano completo para médias empresas',
            preco: 199.90,
            limite_lojas: 5,
            limite_usuarios: 20,
            ativo: true
        }
    ],
    usuarios_lojas: [],
    role_permissions: [],
    usuario_permissions: []
};

// Estado da Sessão Mockada
let currentSession = null;

try {
    const savedSession = localStorage.getItem('mock_supabase_session');
    if (savedSession) {
        currentSession = JSON.parse(savedSession);
    }
} catch (e) {
    console.error('Erro ao restaurar sessão mock:', e);
}

// Classe QueryBuilder Mock
class MockQueryBuilder {
    constructor(table) {
        this.table = table;
        this.data = MOCK_DB[table] ? [...MOCK_DB[table]] : [];
        this.error = null;
        this._single = false;
        this._count = null;
        this._select_columns = '*';
    }

    select(columns = '*', { count, head } = {}) {
        this._select_columns = columns;
        if (count) {
            this._count = this.data.length; // Count total antes dos filtros, ou depois? Supabase count depende do parametro
            // Simular count 'exact' aplicando filtros depois se necessário, mas aqui simplificamos
        }
        if (head) {
             this.data = []; // Apenas count
        }
        return this;
    }

    eq(column, value) {
        this.data = this.data.filter(item => item[column] == value);
        return this;
    }
    
    in(column, values) {
        if (!Array.isArray(values)) values = [values];
        this.data = this.data.filter(item => values.includes(item[column]));
        return this;
    }

    neq(column, value) {
        this.data = this.data.filter(item => item[column] != value);
        return this;
    }

    gt(column, value) {
        this.data = this.data.filter(item => item[column] > value);
        return this;
    }

    gte(column, value) {
        this.data = this.data.filter(item => item[column] >= value);
        return this;
    }

    lt(column, value) {
        this.data = this.data.filter(item => item[column] < value);
        return this;
    }

    lte(column, value) {
        this.data = this.data.filter(item => item[column] <= value);
        return this;
    }

    order(column, { ascending = true } = {}) {
        this.data.sort((a, b) => {
            const valA = a[column];
            const valB = b[column];
            
            // Tratamento simples para datas e strings
            if (valA < valB) return ascending ? -1 : 1;
            if (valA > valB) return ascending ? 1 : -1;
            return 0;
        });
        return this;
    }

    limit(count) {
        this.data = this.data.slice(0, count);
        return this;
    }

    single() {
        this._single = true;
        return this;
    }

    async then(resolve, reject) {
        await new Promise(r => setTimeout(r, 100)); // Delay

        // Processar Joins simples (apenas se solicitado no select)
        // Ex: select('*, base(descricao)')
        // Mocking joins is hard, vamos fazer um mock específico para 'coletados' que precisa de joins
        if (this.table === 'coletados' && this._select_columns.includes('base')) {
            this.data = this.data.map(item => {
                const base = MOCK_DB.base.find(b => b.id === item.produto_id);
                const loja = MOCK_DB.lojas.find(l => l.id === item.loja_id);
                const local = MOCK_DB.locais.find(l => l.id === item.local_id);
                return { 
                    ...item, 
                    base: base || {}, 
                    lojas: loja || {}, 
                    locais: local || {} 
                };
            });
        }
        
        if (this.table === 'usuarios' && this._select_columns.includes('roles')) {
            this.data = this.data.map(item => {
                const role = MOCK_DB.roles.find(r => r.id === item.role_id);
                const empresa = MOCK_DB.empresas.find(e => e.id === item.empresa_id);
                return {
                    ...item,
                    roles: role || {},
                    empresas: empresa || {}
                };
            });
        }

        if (this.table === 'empresas' && this._select_columns.includes('planos')) {
             this.data = this.data.map(item => {
                const plano = MOCK_DB.planos.find(p => p.id === item.plano_id);
                return { ...item, planos: plano || {} };
             });
        }

        if (this._single) {
            if (this.data.length === 0) {
                resolve({ data: null, error: { message: 'Not found', code: '404' } });
            } else {
                resolve({ data: this.data[0], error: null });
            }
        } else {
            resolve({ data: this.data, error: null, count: this._count !== null ? this._count : this.data.length });
        }
    }
    
    async insert(data) {
        await new Promise(r => setTimeout(r, 300));
        const newItem = { ...data, id: `mock-${Date.now()}`, created_at: new Date().toISOString() };
        if (MOCK_DB[this.table]) {
            MOCK_DB[this.table].push(newItem);
        }
        return { data: [newItem], error: null };
    }

    async update(data) {
         await new Promise(r => setTimeout(r, 300));
         this.data.forEach(item => {
             Object.assign(item, data);
             const original = MOCK_DB[this.table].find(i => i.id === item.id);
             if (original) Object.assign(original, data);
         });
         return { data: this.data, error: null };
    }

    async delete() {
        await new Promise(r => setTimeout(r, 300));
        const idsToRemove = this.data.map(i => i.id);
        MOCK_DB[this.table] = MOCK_DB[this.table].filter(i => !idsToRemove.includes(i.id));
        return { data: this.data, error: null };
    }
}

// Cliente Supabase Mock
const supabaseMock = {
    auth: {
        async getUser() {
             return { data: { user: currentSession ? currentSession.user : null }, error: null };
        },
        async signInWithPassword({ email, password }) {
            // Login Mock
            if (email === 'admin@datacerta.com' && password === 'admin') {
                const user = {
                    id: 'master-123',
                    email: 'admin@datacerta.com',
                    role: 'authenticated'
                };
                currentSession = { user, access_token: 'mock-token-master' };
                localStorage.setItem('mock_supabase_session', JSON.stringify(currentSession));
                return { data: { user, session: currentSession }, error: null };
            }
            
            if (email === 'gerente@demo.com' && password === '123456') {
                 const user = {
                    id: 'user-123',
                    email: 'gerente@demo.com',
                    role: 'authenticated'
                };
                currentSession = { user, access_token: 'mock-token-user' };
                localStorage.setItem('mock_supabase_session', JSON.stringify(currentSession));
                return { data: { user, session: currentSession }, error: null };
            }

            return { data: { user: null, session: null }, error: { message: 'Credenciais inválidas (Use: admin@datacerta.com / admin ou gerente@demo.com / 123456)' } };
        },
        async signOut() {
            currentSession = null;
            localStorage.removeItem('mock_supabase_session');
            return { error: null };
        },
        async signUp({ email, password, options }) {
             // Mock Sign Up
             return { data: { user: { id: `mock-${Date.now()}`, email } }, error: null };
        },
        onAuthStateChange(callback) {
            return { data: { subscription: { unsubscribe: () => {} } } };
        }
    },
    from(table) {
        return new MockQueryBuilder(table);
    }
};

// Sobrescreve a criação do cliente no window
window.supabase = {
    createClient: () => supabaseMock
};

// Expõe diretamente também
window.supabaseClient = supabaseMock;

// Dispara evento de pronto
setTimeout(() => {
    window.dispatchEvent(new Event('supabaseReady'));
    console.log('Supabase Mock Ready');
}, 100);
