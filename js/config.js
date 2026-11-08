// ===== CONFIG: deixe vazio para rodar em modo DEMO (bots + compras simuladas) =====
const CONFIG={SUPABASE_URL:'',SUPABASE_ANON_KEY:'',banners:[{},{},{},{}]}; // banners: {img:'https://...',link:'https://...'}
// SEGURANÇA: com Supabase ligado, loja e super chat ficam TRAVADOS. Cobrança/saldo/itens só podem ser liberados por Edge Function + webhook do Pix (Etapa 4). Nunca confie em valores vindos do navegador.
