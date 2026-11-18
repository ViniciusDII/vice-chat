// Chave publishable = pública, pode ficar aqui. NUNCA coloque sb_secret_ neste arquivo.
// ===== CONFIG: deixe vazio para rodar em modo DEMO (bots + compras simuladas) =====
const CONFIG={SUPABASE_URL:'https://wtssgpnoambpeobrebot.supabase.co',SUPABASE_ANON_KEY:'sb_publishable_spzOePrjim1kuh5X8DmnPA_6mgCABKy',banners:[{},{}],clubBanner:{}}; // banners: {img:'https://...',link:'https://...'}
// SEGURANÇA: com Supabase ligado, loja e super chat ficam TRAVADOS. Cobrança/saldo/itens só podem ser liberados por Edge Function + webhook do Pix (Etapa 4). Nunca confie em valores vindos do navegador.
