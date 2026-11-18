// node tools/build-termos.js  -> gera js/termos.js a partir de termos.md (EN, versao que prevalece) e termos.pt.md (PT)
// Permite abrir index.html por duplo clique, sem servidor.
const fs=require('fs'),d=__dirname+'/../',en=fs.readFileSync(d+'termos.md','utf8'),pt=fs.readFileSync(d+'termos.pt.md','utf8'),ver=s=>(/versao:\s*([\w.\-]+)/.exec(s)||[])[1]||'0';
if(ver(en)!==ver(pt))throw new Error('Versoes diferentes entre termos.md ('+ver(en)+') e termos.pt.md ('+ver(pt)+')');
fs.writeFileSync(d+'js/termos.js','// GERADO por tools/build-termos.js a partir de termos.md e termos.pt.md. NAO EDITE AQUI.\n// TODO(JURIDICO): os textos precisam de revisao juridica antes do lancamento.\nconst TERMOS_VERSION='+JSON.stringify(ver(en))+';\nconst TERMOS_MD={en:'+JSON.stringify(en)+',pt:'+JSON.stringify(pt)+'};\n');
console.log('termos v'+ver(en));
