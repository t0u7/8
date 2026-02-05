function AlteraSenhaVpn(destino, idVpn, divSenha){
var janela;
var btSim;
var btNao;
var sim = 0;
var btAlterar = document.createElement('input');
btAlterar.setAttribute('type', 'button');
btAlterar.setAttribute('value', 'Alterar Senha');
btAlterar.className = 'botao_pequeno';
btAlterar.onclick = function(){
janela = new Janela(document.body, 300, 130);
btSim = document.createElement('input');
btSim.setAttribute('type', 'button');
btSim.setAttribute('value', 'Sim');
btSim.className = 'botao verde';
btSim.onclick = function(){
if(sim == 1){
sim = 0;
alterar();
}else if(sim == 0){
divLblPergunta.innerHTML = 'Esta a&ccedil;&atilde;o causar&aacute; a desconex&atilde;o da conta e ser&aacute; necess&aacute;rio configurar a nova senha na VPN do cliente.<br/>Deseja realmente alterar a senha desta VPN?';
sim = 1;
}
};
btNao = document.createElement('input');
btNao.setAttribute('type', 'button');
btNao.setAttribute('value', 'NÃ£o');
btNao.className = 'botao vermelho';
btNao.onclick = function(){
janela.fechar();
};
var divLblPergunta = document.createElement('div');
divLblPergunta.className = 'form_lbl';
divLblPergunta.innerHTML = 'Tem certeza que deseja alterar a senha desta VPN?';
var divLblBt = document.createElement('div');
divLblBt.className = 'form_lbl';
divLblBt.appendChild(btSim);
divLblBt.appendChild(document.createTextNode(' '));
divLblBt.appendChild(btNao);
janela.getDivConteudo().appendChild(divLblPergunta);
janela.getDivConteudo().appendChild(divLblBt);
};
destino.appendChild(btAlterar);
function alterar(){
btSim.disabled = true;
var parametros = 'id=' + idVpn;
var httpReq;
var cod = '';
var car = new Carregador(janela.getDivConteudo());
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=2&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
janela.getDivConteudo().innerHTML = '';
btSim.disabled = false;
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
var divLblSenha = document.createElement('div');
divLblSenha.className = 'form_lbl';
divLblSenha.innerHTML = 'Nova senha:';
var divCmpSenha = document.createElement('div');
divCmpSenha.className = 'form_cmp';
divCmpSenha.innerHTML = dados.pw;
janela.getDivConteudo().appendChild(divLblSenha);
janela.getDivConteudo().appendChild(divCmpSenha);
divSenha.innerHTML = dados.pw;
}else if(dados.resposta == 2){
var divCmpSenha = document.createElement('div');
divCmpSenha.className = 'form_cmp';
divCmpSenha.innerHTML = 'N&atilde;o se altera senha de contas SSL!';
janela.getDivConteudo().appendChild(divCmpSenha);
}
}
};
}
}
}
function BannerCliente(destino, idCliente){
var banner = this;
var divCorpo = document.createElement('div');
divCorpo.className = 'banner_corpo';
var divTopo = document.createElement('div');
divTopo.className = 'banner_topo';
var divData = document.createElement('div');
divData.className = 'banner_dados';
var divDados = document.createElement('div');
divDados.className = 'banner_dados';
var divBotao = document.createElement('div');
divBotao.className = 'banner_dados';
var botao = document.createElement('input');
divCorpo.appendChild(divTopo);
divCorpo.appendChild(divData);
divCorpo.appendChild(divDados);
divBotao.appendChild(botao);
divCorpo.appendChild(divBotao);
destino.appendChild(divCorpo);
function conteudo(){
var parametros = 'id=' + idCliente;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=12&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
var comando = '';
var a = document.createElement('a');
a.setAttribute('href', '?pagina=8&cliente=' + dados.dados.id_cliente + '&cod=' + document.getElementById('cod').value);
divTopo.style.backgroundColor = dados.dados.cor;
divTopo.innerHTML = 'Cadastro Recusado';
divData.innerHTML = dados.dados.data;
divData.style.borderColor = dados.dados.cor;
divDados.style.borderColor = dados.dados.cor;
a.innerHTML = dados.dados.razao;
divDados.appendChild(a);
botao.setAttribute('type', 'button');
botao.setAttribute('class', 'botao_pequeno');
botao.setAttribute('value', 'Aceitar Recusa');
}
}
};
}
}
function aceitar(){
var parametros = 'id=' + idCliente;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=13&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
banner.fechar();
}
}
};
}
}
botao.onclick = function(){
aceitar();
};
this.fechar = function(){
destino.removeChild(divCorpo);
banner = null;
};
conteudo();
}
function BannerContainer(destino){
var bannerContainer = this;
var divCorpo = document.createElement('div');
divCorpo.className = 'banner_container';
var divTopo = document.createElement('div');
divTopo.className = 'banner_container_topo';
var divBotao = document.createElement('div');
divBotao.className = 'banner_container_botao';
var divTexto = document.createElement('div');
divTexto.className = 'banner_container_texto';
var divConteudo = document.createElement('div');
var bt = document.createElement('input');
bt.setAttribute('type', 'button');
bt.className = 'botao_pequeno';
var divCorpoSenha = document.createElement('div');
var divTopoSenha = document.createElement('div');
var divDadosSenha = document.createElement('div');
var a = document.createElement('a');
divCorpo.appendChild(divTopo);
divCorpo.appendChild(divConteudo);
divTopo.appendChild(divBotao);
divTopo.appendChild(divTexto);
destino.appendChild(divCorpo);
var t  = 0;
var listaClientes = new Array();
var idsClientes = new Array();
this.conteudo = function(){
var parametros = 'enviar=enviar';
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=14&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
idsClientes.splice(0, idsClientes.length);
var dados = eval('(' + httpReq.responseText + ')');
try{
divConteudo.removeChild(divCorpoSenha);
divCorpoSenha.innerHTML = '';
}catch(e){}
if(dados.resposta == 1){
var quantCli = dados.dados.clientes.length;
var quant = quantCli;
if(dados.dados.senha > 0)
quant++;
if(quant == 0)
divTexto.innerHTML = 'Nenhum Aviso';
if(quant == 1)
divTexto.innerHTML = '1 Aviso';
if(quant > 1)
divTexto.innerHTML = quant + ' Avisos';
if(dados.dados.maximizado == 1){
bt.setAttribute('value', '-');
if(quant > 0)
divCorpo.className = 'banner_container';
else
divCorpo.className = 'banner_container_min';
for(var i = 0; i < quantCli; i++){
if(!listaClientes[dados.dados.clientes[i]]){
var b = new BannerCliente(divConteudo, dados.dados.clientes[i]);
listaClientes[dados.dados.clientes[i]] = b;
}
idsClientes[idsClientes.length] = dados.dados.clientes[i];
}
fecharBanners(listaClientes, idsClientes);
if(dados.dados.senha > 0){
divCorpoSenha.className = 'banner_corpo';
divTopoSenha.className = 'banner_topo';
divTopoSenha.style.backgroundColor = '#F60';
divDadosSenha.className = 'banner_dados';
divDadosSenha.style.borderColor = '#F60';
divCorpoSenha.appendChild(divTopoSenha);
divCorpoSenha.appendChild(divDadosSenha);
divConteudo.appendChild(divCorpoSenha);
a.setAttribute('href', '?pagina=11&usuario=' + dados.dados.id + '&cod=' + document.getElementById('cod').value);
a.innerHTML = 'Alterar Agora!';
divDadosSenha.appendChild(a);
divTopoSenha.innerHTML = 'Sua senha expira em ' + dados.dados.senha + ' dias';
}
}else{
bt.setAttribute('value', '+');
divConteudo.innerHTML = '';
listaClientes = new Array();
idsClientes = new Array();
divCorpo.className = 'banner_container_min';
}
bt.onclick = function(){
maximizar();
};
divBotao.appendChild(bt);
}
t = setTimeout(function(){bannerContainer.conteudo();}, 30000);
}
};
}
};
function maximizar(){
clearTimeout(t);
var parametros = 'enviar=enviar';
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=31&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
divConteudo.innerHTML = '';
if(dados.resposta == 1){
bannerContainer.conteudo();
}
}
};
}
}
bannerContainer.conteudo();
function fecharBanners(arraySrc, arrayValues){
var teste;
for(var i in arraySrc){
teste = false;
for(var n = 0; n < arrayValues.length; n++){
if(i == arrayValues[n]){
teste = true;
break;
}
}
if(!teste){
arraySrc[i].fechar();
arraySrc.splice(i, 1);
}
}
}
}
function Calendario(campoData, acaoClique, executar){
var divCorpo = document.createElement('div');
divCorpo.className = 'calendario';
var divSetaEsq = document.createElement('div');
divSetaEsq.onclick = function(){
mes--;
pegaDados(mes);
campoData.focus();
};
var divSetaDir = document.createElement('div');
divSetaDir.onclick = function(){
mes++;
pegaDados(mes);
campoData.focus();
};
var imgSetaEsq = document.createElement('img');
imgSetaEsq.setAttribute('src', 'imagens/detalhes/seta_esq.png');
var imgSetaDir = document.createElement('img');
imgSetaDir.setAttribute('src', 'imagens/detalhes/seta_dir.png');
divSetaEsq.appendChild(imgSetaEsq);
divSetaDir.appendChild(imgSetaDir);
var divMesAno = document.createElement('div');
divMesAno.onclick =function(){
meses();
};
var divLimpar = document.createElement('div');
divLimpar.className = 'calendario_limpar';
divLimpar.innerHTML = 'Limpar';
divLimpar.onclick = function(){
campoData.value = '';
fechar();
};
var divSetaEsqAno;
var divSetaDirAno;
var imgSetaEsqAno;
var imgSetaDirAno;
var divAno = document.createElement('div');
divAno.style.textAlign = 'center';
divAno.style.cursor = 'pointer';
divAno.onclick = function(){
divSetaEsqAno = document.createElement('div');
divSetaEsqAno.onclick = function(){
anoAtual = parseInt(anoAtual) - 9;
pegaAnos();
};
divSetaDirAno = document.createElement('div');
divSetaDirAno.onclick = function(){
anoAtual = parseInt(anoAtual) + 9;
pegaAnos();
};
imgSetaEsqAno = document.createElement('img');
imgSetaEsqAno.setAttribute('src', 'imagens/detalhes/seta_esq.png');
imgSetaDirAno = document.createElement('img');
imgSetaDirAno.setAttribute('src', 'imagens/detalhes/seta_dir.png');
divSetaEsqAno.appendChild(imgSetaEsqAno);
divSetaDirAno.appendChild(imgSetaDirAno);
divMesAno.className = 'calendario_mes_ano';
divSetaEsqAno.className = 'calendario_seta';
divSetaDirAno.className = 'calendario_seta';
pegaAnos();
};
var anoBusca = 0;
var anoAtual = 0;
var mesAtual = 0;
var mes = 0;
var calendario = this;
janela = new Janela(false, 263, 280);
var destino = janela.getDivConteudo();
var data = '';
var hora = '';
function pegaDados(){
var parametros = 'mes=' + mesAtual + '&ano=' + anoBusca + '&inc=' + mes;
var httpReq;
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=10&cod=' + $('#cod').val(), true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
divCorpo.innerHTML = '';
var dados = eval('(' + httpReq.responseText + ')');
divCorpo.style.padding = '10px';
divSetaEsq.className = 'calendario_seta';
divSetaDir.className = 'calendario_seta';
divMesAno.className = 'calendario_mes_ano';
divMesAno.innerHTML = dados.mes_ano;
divAno.innerHTML = dados.ano;
anoAtual = dados.ano;
divCorpo.appendChild(divLimpar);
divCorpo.appendChild(divAno);
divCorpo.appendChild(divSetaEsq);
divCorpo.appendChild(divMesAno);
divCorpo.appendChild(divSetaDir);
diasSemana();
for(var i = 0; i < dados.dias_mes_anterior.length; i++){
var dia = document.createElement('div');
dia.innerHTML = dados.dias_mes_anterior[i].dia;
new acao(dia, dados.dias_mes_anterior[i].data);
if(dados.dias_mes_anterior[i].situacao == 1){
dia.className = 'calendario_dia_ativo';
}else if(dados.dias_mes_anterior[i].situacao == 2){
dia.className = 'calendario_dia_hoje';
}else{
dia.className = 'calendario_dia_inativo';
}
divCorpo.appendChild(dia);
}
for(var i = 0; i < dados.dias_mes_atual.length; i++){
var dia = document.createElement('div');
dia.innerHTML = dados.dias_mes_atual[i].dia;
new acao(dia, dados.dias_mes_atual[i].data);
if(dados.dias_mes_atual[i].situacao == 1){
dia.className = 'calendario_dia_ativo';
}else if(dados.dias_mes_atual[i].situacao == 2){
dia.className = 'calendario_dia_hoje';
}else{
dia.className = 'calendario_dia_inativo';
}
divCorpo.appendChild(dia);
}
for(var i = 0; i < dados.dias_mes_proximo.length; i++){
var dia = document.createElement('div');
dia.innerHTML = dados.dias_mes_proximo[i].dia;
new acao(dia, dados.dias_mes_proximo[i].data);
if(dados.dias_mes_proximo[i].situacao == 1){
dia.className = 'calendario_dia_ativo';
}else if(dados.dias_mes_proximo[i].situacao == 2){
dia.className = 'calendario_dia_hoje';
}else{
dia.className = 'calendario_dia_inativo';
}
divCorpo.appendChild(dia);
}
}
};
}
}
function pegaAnos(){
var parametros = 'ano=' + anoAtual;
var httpReq;
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=11&cod=' + $('#cod').val(), true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
divCorpo.innerHTML = '';
var dados = eval('(' + httpReq.responseText + ')');
divSetaEsq.className = 'calendario_seta';
divCorpo.style.paddingTop = '20px';
divSetaDir.className = 'calendario_seta';
divMesAno.className = 'calendario_mes_ano';
divMesAno.innerHTML = '-';
divCorpo.appendChild(divLimpar);
divCorpo.appendChild(divSetaEsqAno);
divCorpo.appendChild(divMesAno);
divCorpo.appendChild(divSetaDirAno);
for(var i = 0; i < dados.anos.length; i++){
var ano = document.createElement('div');
ano.innerHTML = dados.anos[i];
new acaoAno(ano, {ano : dados.anos[i]});
ano.className = 'calendario_ano_ativo';
divCorpo.appendChild(ano);
}
}
};
}
}
function acao(elemento, data_){
if(executar){
if(document.addEventListener){
elemento.addEventListener('mousedown', eval('(' + acaoClique + ')'), true);
}else if(document.attachEvent){
elemento.attachEvent('onmousedown', eval('(' + acaoClique + ')'), true);
}
}else{
if(document.addEventListener){
elemento.addEventListener('mousedown', function(){campoData.value = data_; fechar();}, true);
}else if(document.attachEvent){
elemento.attachEvent('onmousedown', function(){campoData.value = data_; fechar();}, true);
}
}
}
function acaoAno(elemento, dados){
if(document.addEventListener){
elemento.addEventListener('click', function(){
anoBusca = dados.ano;
divAno.innerHTML = dados.ano;
meses();
}, true);
}else if(document.attachEvent){
elemento.attachEvent('onclick', function(){
anoBusca = dados.ano;
divAno.innerHTML = dados.ano;
meses();
}, true);
}
}
function acaoMes(elemento, dados){
if(document.addEventListener){
elemento.addEventListener('click', function(){
mesAtual = dados.mes;
pegaDados();
}, true);
}else if(document.attachEvent){
elemento.attachEvent('onclick', function(){
mesAtual = dados.mes;
pegaDados();
}, true);
}
}
function meses(){
divCorpo.innerHTML = '';
divCorpo.style.padding = '10px';
divCorpo.appendChild(divLimpar);
divCorpo.appendChild(divAno);
var arrMeses = new Array('Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez');
for(var i = 0; i < 12; i++){
var divMes = document.createElement('div');
divMes.className = 'calendario_ano_ativo';
divMes.innerHTML = arrMeses[i];
new acaoMes(divMes, {mes : i + 1});
divCorpo.appendChild(divMes);
}
}
function diasSemana(){
var dias = 'DSTQQSS';
for(var i = 0; i < 7; i++){
var ds = document.createElement('div');
ds.innerHTML = dias.substr(i, 1);
ds.className = 'calendario_dias_semana';
divCorpo.appendChild(ds);
}
}
function fechar(){
campoData.focus();
destino.removeChild(divCorpo);
janela.fechar();
delete calendario;
}
pegaDados(mes);
destino.appendChild(divCorpo);
}
function CampoIP(destino){
var divCorpo = document.createElement('div');
var ponto = document.createTextNode('.');
var campo = document.createElement('input');
campo.setAttribute('type', 'text');
campo.setAttribute('maxlength', '3');
campo.className = 'campo';
campo.style.width = '30px';
campo.style.padding = '0';
var cmp1 = campo.cloneNode(true);
var cmp2 = campo.cloneNode(true);
var cmp3 = campo.cloneNode(true);
var cmp4 = campo.cloneNode(true);
cmp1.onkeyup = function(event){
mascaraNumero('###', cmp1, event);
if(cmp1.value.length == 3)
cmp2.focus();
};
cmp1.onblur = function(){
valida(cmp1);
};
cmp2.onkeyup = function(event){
mascaraNumero('###', cmp2, event);
if(cmp2.value.length == 3)
cmp3.focus();
};
cmp2.onblur = function(){
valida(cmp2);
};
cmp3.onkeyup = function(event){
mascaraNumero('###', cmp3, event);
if(cmp3.value.length == 3)
cmp4.focus();
};
cmp3.onblur = function(){
valida(cmp3);
};
cmp4.onkeyup = function(event){
mascaraNumero('###', cmp4, event);
};
cmp4.onblur = function(){
valida(cmp4);
};
divCorpo.appendChild(cmp1);
divCorpo.appendChild(ponto.cloneNode(true));
divCorpo.appendChild(cmp2);
divCorpo.appendChild(ponto.cloneNode(true));
divCorpo.appendChild(cmp3);
divCorpo.appendChild(ponto.cloneNode(true));
divCorpo.appendChild(cmp4);
destino.appendChild(divCorpo);
this.getValor = function(){
return cmp1.value + '.' + cmp2.value + '.' + cmp3.value + '.' + cmp4.value;
};
this.setValor = function(valor){
var exp = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/g;
if(valor.match(exp) != null){
var ip = valor.split('.');
cmp1.value = ip[0];
cmp2.value = ip[1];
cmp3.value = ip[2];
cmp4.value = ip[3];
}
};
this.verifica = function(){
if(cmp1.value != '' && cmp2.value != '' && cmp3.value != '' && cmp4.value != '')
return true;
return false;
};
function valida(campo){
if(campo.value != ''){
if(campo.value >= 0 && campo.value <= 255)
return true;
else{
alert('O valor deste campo deve ser entre 0 e 255!');
campo.value = '';
}
}
return false;
}
this.setClass = function(classe){
cmp1.className = classe;
cmp2.className = classe;
cmp3.className = classe;
cmp4.className = classe;
};
this.setNome = function(nome){
cmp1.name = nome + '[]';
cmp2.name = nome + '[]';
cmp3.name = nome + '[]';
cmp4.name = nome + '[]';
};
}
function Carregador(destino){
var localImagens = "";
var corpo = document.createElement('div');
corpo.style.marginTop = '-12px';
corpo.style.marginLeft = '-12px';
corpo.style.position = 'absolute';
corpo.style.top = '50%';
corpo.style.left = '50%';
corpo.style.zIndex = '100';
var c = new Array();
var carregador = this;
var tm = 0;
var t = 1;
this.setLocalImagens = function(local){
localImagens = local;
}
this.anima = function(){
if(t > 8) t = 1;
corpo.innerHTML = '';
corpo.appendChild(c[t]);
t++;
tm = setTimeout(function(){carregador.anima();}, 80);
}
this.fim = function(){
clearTimeout(tm);
destino.removeChild(corpo);
}
this.inicio = function(){
for(var i = 1; i <= 8; i++){
c[i] = document.createElement('img');
c[i].src = localImagens + "/carregador/c" + i + ".png";
}
destino.appendChild(corpo);
carregador.anima();
}
}
function ChamadoVisualizacao(idChamado){
var divCorpo = document.createElement('div');
divCorpo.className = 'visualizando_chamado';
document.body.appendChild(divCorpo);
visualizar();
function visualizar(){
var parametros = 'id=' + idChamado;
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=46&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
var dados = eval('(' + httpReq.responseText + ')');
divCorpo.innerHTML = '';
if(dados.resposta == 1){
var pessoas = 'Visualizando este chamado:';
for(var i = 0; i < dados.pessoas.length; i++){
pessoas += '<br/>' + dados.pessoas[i].nome;
}
divCorpo.innerHTML = pessoas;
}
setTimeout(function(){visualizar();}, 2000);
}
}
}
}
}
function ContatoVisualizacao(idContato, lista){
var divCorpo = document.createElement('div');
divCorpo.className = 'visualizando_chamado';
var ids = new Array();
for(var i = 0; i < idContato.length; i++){
ids[i] = new Array();
ids[i][0] = idContato[i];
ids[i][1] = 0;
}
visualizar();
function visualizar(){
$.post('ajax/s=45&cod=' + $('#cod').val(), {'ids':ids}, function(data, textStatus, jqXHR){
divCorpo.innerHTML = '';
if(data.resposta == 1){
if(!lista){
document.body.appendChild(divCorpo);
var pessoas = 'Visualizando este contato:';
for(var j = 0; j < ids.length; j++){
if(ids[j][0] == data.ids[0].id){
ids[j][1] = data.ids[0].time;
}
}
for(var i = 0; i < data.ids[0].nomes.length; i++){
pessoas += '<br/>' + data.ids[0].nomes[i];
}
divCorpo.innerHTML = pessoas;
}else{
for(var i = 0; i < data.ids.length; i++){
$('#td' + data.ids[i].id).remove();
for(var j = 0; j < ids.length; j++){
if(ids[j][0] == data.ids[i].id){
ids[j][1] = data.ids[i].time;
}
}
if(data.ids[i].nomes.length > 0){
var td = '<td class="form_cmp" style="color:#09F;" width="200" id="td' + data.ids[i].id + '">' + data.ids[i].nomes[0] + '</td>';
$('#' + data.ids[i].id + ' a').css({'color':'#09F'});
$('#' + data.ids[i].id + ' tr').append(td);
}else{
$('#' + data.ids[i].id + ' a').css({'color':'#666'});
}
}
}
}
setTimeout(function(){visualizar();}, 1000);
}, 'json');
}
}
function ControleGrafico(destino, imagem, valor){
var divCorpo = document.createElement('div');
divCorpo.className = 'controle_grafico';
var divSetaEsq = document.createElement('div');
divSetaEsq.className = 'controle_grafico_seta';
var divSetaDir = document.createElement('div');
divSetaDir.className = 'controle_grafico_seta';
var divMsg = document.createElement('div');
var imgEsq = document.createElement('img');
imgEsq.setAttribute('src', 'imagens/detalhes/seta_esq.png');
var imgDir = document.createElement('img');
imgDir.setAttribute('src', 'imagens/detalhes/seta_dir.png');
divSetaEsq.onclick = function(){
diminui();
}
divSetaDir.onclick = function(){
if(valor < 0)
aumenta();
}
divSetaEsq.appendChild(imgEsq);
divSetaDir.appendChild(imgDir);
divCorpo.appendChild(divSetaEsq);
divCorpo.appendChild(divSetaDir);
destino.appendChild(divMsg);
destino.appendChild(divCorpo);
imagem.onload = function(){
divCorpo.style.display = 'block';
}
var valorInicio = valor;
var srcInicio = imagem.src;
function diminui(){
divMsg.innerHTML = '';
divSetaEsq.onclick = function(){};
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
valor--;
imagem.setAttribute('src', srcInicio + '&diferenca=' + valor);
imagem.onload = function(){
car.fim();
divSetaEsq.onclick = function(){
diminui();
}
}
imagem.onerror = function(){
car.fim();
divSetaEsq.onclick = function(){
diminui();
}
divMsg.innerHTML = 'Nenhum dado para este per&iacute;odo!';
}
}
function aumenta(){
divMsg.innerHTML = '';
divSetaDir.onclick = function(){};
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
valor++;
imagem.setAttribute('src', srcInicio + '&diferenca=' + valor);
imagem.onload = function(){
car.fim();
divSetaDir.onclick = function(){
if(valor < 0)
aumenta();
}
}
imagem.onerror = function(){
car.fim();
divSetaDir.onclick = function(){
if(valor < 0)
aumenta();
}
divMsg.innerHTML = 'Nenhum dado para este per&iacute;odo!';
}
}
}
function HistoricoVpn(destino, idVpn){
var historicoVpn = this;
var idHistorico = 0;
var divHistorico = document.createElement('div');
divHistorico.className = 'historico_parcela_cima';
var divNovoComentario = document.createElement('div');
divNovoComentario.className = 'historico_parcela_baixo';
var divLblComentario = document.createElement('div');
divLblComentario.className = 'form_lbl';
divLblComentario.innerHTML = 'Novo coment&aacute;rio';
var divCampo = document.createElement('div');
var divBotao = document.createElement('div');
divBotao.style.textAlign = 'right';
var btEnviar = document.createElement('input');
btEnviar.setAttribute('type', 'button');
btEnviar.setAttribute('value', 'Enviar');
btEnviar.className = 'botao_pequeno';
btEnviar.onclick = function(){
salvar();
};
var txtComentario = document.createElement('textarea');
txtComentario.className = 'campo';
txtComentario.style.width = '478px';
txtComentario.style.height = '70px';
var janela = new Janela(destino, 500, 425, 'Hist&oacute;rico da VPN');
janela.getDivConteudo().appendChild(divHistorico);
janela.getDivConteudo().appendChild(divNovoComentario);
divCampo.appendChild(txtComentario);
divBotao.appendChild(btEnviar);
divNovoComentario.appendChild(divLblComentario);
divNovoComentario.appendChild(divCampo);
divNovoComentario.appendChild(divBotao);
conteudo();
function conteudo(){
var parametros = 'id=' + idVpn;
var httpReq;
var cod = '';
var car = new Carregador(divHistorico);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=21&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
divHistorico.innerHTML = '';
for(var i = 0; i < dados.historico.length; i++){
var divItem = document.createElement('div');
divItem.style.padding = '5px';
if(i % 2 == 1)
divItem.style.backgroundColor = '#EEF';
var divData = document.createElement('div');
divData.className = 'chamado_andamento_data';
var divAutor = document.createElement('div');
divAutor.className = 'chamado_andamento_nome';
var divDescricao = document.createElement('div');
divDescricao.className = 'chamado_andamento_descricao';
divItem.appendChild(divData);
divItem.appendChild(divAutor);
divItem.appendChild(divDescricao);
idHistorico = dados.historico[i].id;
divHistorico.appendChild(divItem);
divData.innerHTML = dados.historico[i].data;
divAutor.innerHTML = dados.historico[i].autor;
divDescricao.innerHTML = dados.historico[i].descricao;
}
}
}
};
}
}
function salvar(){
btEnviar.disabled = true;
var parametros = 'id=' + idVpn + '&msg=' + txtComentario.value;
var httpReq;
var cod = '';
var car = new Carregador(divHistorico);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=40&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
btEnviar.disabled = false;
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
txtComentario.value = '';
conteudo();
}
}
};
}
}
}
function Janela(destino, largura, altura, titulo){
var janela = this;
if(!destino)
var destino = document.body;
if(!largura)
var largura = 300;
if(!altura)
var altura = 300;
if(!titulo)
var titulo = document.title;
var divFundo = document.createElement('div');
divFundo.className = 'janela_fundo';
var divBorda = document.createElement('div');
divBorda.className = 'janela_borda';
divBorda.style.width = (largura + 18) + 'px';
divBorda.style.height = (altura + 18) + 'px';
divBorda.style.marginLeft = '-' + (largura / 2 + 8) + 'px';
divBorda.style.marginTop = '-' + (altura / 2 + 8) + 'px';
var divCorpo = document.createElement('div');
divCorpo.className = 'janela_corpo';
divCorpo.style.width = largura + 'px';
divCorpo.style.height = altura + 'px';
var divTopo = document.createElement('div');
divTopo.className = 'janela_topo';
divTopo.style.width = (largura - 26) + 'px';
divTopo.innerHTML = titulo;
var divIcone = document.createElement('div');
divIcone.className = 'janela_icone';
var imgIcone = document.createElement('img');
imgIcone.setAttribute('src', 'favicon.ico');
var divConteudo = document.createElement('div');
divConteudo.className = 'janela_conteudo';
divConteudo.style.width = (largura - 10) + 'px';
divConteudo.style.height = (altura - 35) + 'px';
var divBotao = document.createElement('div');
divBotao.className = 'janela_botao';
var btFechar = document.createElement('div');
btFechar.className = 'janela_bt';
btFechar.onclick = function(){
janela.fechar();
};
divBotao.appendChild(btFechar);
divTopo.appendChild(divBotao);
divTopo.appendChild(divIcone);
divIcone.appendChild(imgIcone);
divCorpo.appendChild(divTopo);
divCorpo.appendChild(divConteudo);
divBorda.appendChild(divCorpo);
divFundo.appendChild(divBorda);
destino.appendChild(divFundo);
divFundo.style.display = 'none';
$(divFundo).fadeIn('fast', function(){
$(divBorda).show('fast', function(){
var inputs = $('input', janela.getDivConteudo());
if(inputs.length > 0)
inputs.get(0).focus();
});
});
this.fechar = function(){
$(divFundo).hide('fast', function(){
destino.removeChild(divFundo);
delete janela;
});
};
this.getDivConteudo = function(){
return divConteudo;
};
}
function JanelaEndereco(destino, mapa, idTerminal, botao){
var janelaEndereco = this;
var divCel1 = document.createElement('div');
divCel1.className = 'form_cel';
var divCel2 = document.createElement('div');
divCel2.className = 'form_cel';
var divCel3 = document.createElement('div');
divCel3.className = 'form_cel';
var divCel4 = document.createElement('div');
divCel4.className = 'form_cel';
var divCelBotao = document.createElement('div');
divCelBotao.className = 'form_cel';
var divCelUf = document.createElement('div');
divCelUf.className = 'form_cel';
divCelUf.style.width = '80px';
var divCelCidade = document.createElement('div');
divCelCidade.className = 'form_cel';
divCelCidade.style.width = '270px';
var divCelRua = document.createElement('div');
divCelRua.className = 'form_cel';
divCelRua.style.width = '250px';
var divCelNumero = document.createElement('div');
divCelNumero.className = 'form_cel';
divCelNumero.style.width = '100px';
var divCelAbsegsex = document.createElement('div');
divCelAbsegsex.className = 'form_cel';
divCelAbsegsex.style.width = '116px';
var divCelFesegsex = document.createElement('div');
divCelFesegsex.className = 'form_cel';
divCelFesegsex.style.width = '116px';
var divCelAbsab = document.createElement('div');
divCelAbsab.className = 'form_cel';
divCelAbsab.style.width = '116px';
var divCelFesab = document.createElement('div');
divCelFesab.className = 'form_cel';
divCelFesab.style.width = '116px';
var divCelAbdom = document.createElement('div');
divCelAbdom.className = 'form_cel';
divCelAbdom.style.width = '116px';
var divCelFedom = document.createElement('div');
divCelFedom.className = 'form_cel';
divCelFedom.style.width = '116px';
var divLblUf = document.createElement('div');
divLblUf.className = 'form_lbl';
divLblUf.innerHTML = 'UF';
var divLblCidade = document.createElement('div');
divLblCidade.className = 'form_lbl';
divLblCidade.innerHTML = 'Cidade';
var divLblRua = document.createElement('div');
divLblRua.className = 'form_lbl';
divLblRua.innerHTML = 'Logradouro';
var divLblNumero = document.createElement('div');
divLblNumero.className = 'form_lbl';
divLblNumero.innerHTML = 'N&uacute;mero';
var divLblAbsegsex = document.createElement('div');
divLblAbsegsex.className = 'form_lbl';
divLblAbsegsex.innerHTML = 'Abre (seg - sex)';
var divLblFesegsex = document.createElement('div');
divLblFesegsex.className = 'form_lbl';
divLblFesegsex.innerHTML = 'Fecha (seg - sex)';
var divLblAbsab = document.createElement('div');
divLblAbsab.className = 'form_lbl';
divLblAbsab.innerHTML = 'Abre (s&aacute;bado)';
var divLblFesab = document.createElement('div');
divLblFesab.className = 'form_lbl';
divLblFesab.innerHTML = 'Fecha (s&aacute;bado)';
var divLblAbdom = document.createElement('div');
divLblAbdom.className = 'form_lbl';
divLblAbdom.innerHTML = 'Abre (domingo)';
var divLblFedom = document.createElement('div');
divLblFedom.className = 'form_lbl';
divLblFedom.innerHTML = 'Fecha (domingo)';
var divCmpUf = document.createElement('div');
divCmpUf.className = 'form_cmp';
var divCmpCidade = document.createElement('div');
divCmpCidade.className = 'form_cmp';
var divCmpRua = document.createElement('div');
divCmpRua.className = 'form_cmp';
var divCmpNumero = document.createElement('div');
divCmpNumero.className = 'form_cmp';
var divCmpAbsegsex = document.createElement('div');
divCmpAbsegsex.className = 'form_cmp';
var divCmpFesegsex = document.createElement('div');
divCmpFesegsex.className = 'form_cmp';
var divCmpAbsab = document.createElement('div');
divCmpAbsab.className = 'form_cmp';
var divCmpFesab = document.createElement('div');
divCmpFesab.className = 'form_cmp';
var divCmpAbdom = document.createElement('div');
divCmpAbdom.className = 'form_cmp';
var divCmpFedom = document.createElement('div');
divCmpFedom.className = 'form_cmp';
var divLblBotao = document.createElement('div');
divLblBotao.className = 'form_lbl';
divLblBotao.style.textAlign = 'right';
var sel = document.createElement('select');
sel.className = 'campo select *';
sel.style.width = '80px';
var divLblTit1 = document.createElement('div');
divLblTit1.className = 'form_cel';
divLblTit1.innerHTML = 'Preencha os dados do cliente!';
var divLblTit2 = document.createElement('div');
divLblTit2.className = 'form_cel';
divLblTit2.style.paddingTop = '10px';
divLblTit2.innerHTML = 'Hor&aacuterios de funcionamento:';
var selAbsegsex = sel.cloneNode(true);
var selFesegsex = sel.cloneNode(true);
var selAbsab = sel.cloneNode(true);
var selFesab = sel.cloneNode(true);
var selAbdom = sel.cloneNode(true);
var selFedom = sel.cloneNode(true);
var slcUf = document.createElement('select');
slcUf.className = 'campo select *';
slcUf.style.width = '70px';
slcUf.onchange = function(){
opcoes(slcUf, slcCidade, 22);
};
var slcCidade = document.createElement('select');
slcCidade.className = 'campo select *';
slcCidade.style.width = '260px';
var txtRua = document.createElement('input');
txtRua.setAttribute('type', 'text');
txtRua.className = 'campo *';
txtRua.style.width = '230px';
var txtNumero = document.createElement('input');
txtNumero.setAttribute('type', 'text');
txtNumero.className = 'campo *';
txtNumero.style.width = '80px';
var btSalvar = document.createElement('input');
btSalvar.setAttribute('type', 'button');
btSalvar.className = 'botao_pequeno';
btSalvar.setAttribute('value', 'Salvar');
btSalvar.onclick = function(){
salvar();
};
divCel1.appendChild(divCelUf);
divCel1.appendChild(divCelCidade);
divCel2.appendChild(divCelRua);
divCel2.appendChild(divCelNumero);
divCel3.appendChild(divCelAbsegsex);
divCel3.appendChild(divCelFesegsex);
divCel3.appendChild(divCelAbsab);
divCel4.appendChild(divCelFesab);
divCel4.appendChild(divCelAbdom);
divCel4.appendChild(divCelFedom);
divCelBotao.appendChild(divLblBotao);
divCelUf.appendChild(divLblUf);
divCelUf.appendChild(divCmpUf);
divCelCidade.appendChild(divLblCidade);
divCelCidade.appendChild(divCmpCidade);
divCelRua.appendChild(divLblRua);
divCelRua.appendChild(divCmpRua);
divCelNumero.appendChild(divLblNumero);
divCelNumero.appendChild(divCmpNumero);
divCelAbsegsex.appendChild(divLblAbsegsex);
divCelAbsegsex.appendChild(divCmpAbsegsex);
divCelFesegsex.appendChild(divLblFesegsex);
divCelFesegsex.appendChild(divCmpFesegsex);
divCelAbsab.appendChild(divLblAbsab);
divCelAbsab.appendChild(divCmpAbsab);
divCelFesab.appendChild(divLblFesab);
divCelFesab.appendChild(divCmpFesab);
divCelAbdom.appendChild(divLblAbdom);
divCelAbdom.appendChild(divCmpAbdom);
divCelFedom.appendChild(divLblFedom);
divCelFedom.appendChild(divCmpFedom);
divLblBotao.appendChild(btSalvar);
divCmpUf.appendChild(slcUf);
divCmpCidade.appendChild(slcCidade);
divCmpRua.appendChild(txtRua);
divCmpNumero.appendChild(txtNumero);
divCmpAbsegsex.appendChild(selAbsegsex);
divCmpFesegsex.appendChild(selFesegsex);
divCmpAbsab.appendChild(selAbsab);
divCmpFesab.appendChild(selFesab);
divCmpAbdom.appendChild(selAbdom);
divCmpFedom.appendChild(selFedom);
var janela = new Janela(destino, 360, 340);
janela.getDivConteudo().appendChild(divLblTit1);
janela.getDivConteudo().appendChild(divCel1);
janela.getDivConteudo().appendChild(divCel2);
janela.getDivConteudo().appendChild(divLblTit2);
janela.getDivConteudo().appendChild(divCel3);
janela.getDivConteudo().appendChild(divCel4);
janela.getDivConteudo().appendChild(divCelBotao);
estados();
function estados(){
var parametros = 'enviar=enviar';
var car = new Carregador(divCmpUf);
car.setLocalImagens('imagens');
car.inicio();
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=23' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
slcUf.innerHTML = '';
for(var i = 0; i < dados.estados.length; i++){
var op = document.createElement('option');
op.setAttribute('value', dados.estados[i].id);
var txt = document.createTextNode(dados.estados[i].uf);
op.appendChild(txt);
slcUf.appendChild(op);
}
}
}
};
}
}
function salvar(){
if(window.validaFormulario(janela.getDivConteudo())){
var parametros = 'id=' + idTerminal + '&cidade=' + slcCidade.value + '&rua=' + txtRua.value + '&numero=' + txtNumero.value
+ '&absegsex=' + selAbsegsex.value + '&fesegsex=' + selFesegsex.value + '&absab=' + selAbsab.value + '&fesab=' + selFesab.value + '&abdom=' + selAbdom.value + '&fedom=' + selFedom.value;
var car = new Carregador(divCmpUf);
car.setLocalImagens('imagens');
car.inicio();
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=36&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
mapa.codeAddress(idTerminal, slcCidade.options[slcCidade.selectedIndex].text, slcUf.options[slcUf.selectedIndex].text, txtRua.value, txtNumero.value, true);
fechar();
}
}
};
}
}
}
function conteudo(){
var parametros = 'id=' + idTerminal;
var car = new Carregador(divCmpUf);
car.setLocalImagens('imagens');
car.inicio();
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=15&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
slcUf.innerHTML = '';
slcCidade.innerHTML = '';
for(var i = 0; i < dados.dados.estados.length; i++){
var op = document.createElement('option');
op.value = dados.dados.estados[i].id;
op.innerHTML = dados.dados.estados[i].uf;
op.selected = (dados.dados.estados[i].sel == 1);
slcUf.appendChild(op);
}
for(var i = 0; i < dados.dados.cidades.length; i++){
var op = document.createElement('option');
op.value = dados.dados.cidades[i].id;
op.innerHTML = dados.dados.cidades[i].nome;
op.selected = (dados.dados.cidades[i].sel == 1);
slcCidade.appendChild(op);
}
txtRua.value = dados.dados.rua;
txtNumero.value = dados.dados.num;
opcoesHora(dados.dados.horas.absegsex, selAbsegsex);
opcoesHora(dados.dados.horas.fesegsex, selFesegsex);
opcoesHora(dados.dados.horas.absab, selAbsab);
opcoesHora(dados.dados.horas.fesab, selFesab);
opcoesHora(dados.dados.horas.abdom, selAbdom);
opcoesHora(dados.dados.horas.fedom, selFedom);
}
}
};
}
}
function fechar(){
janela.fechar();
delete janelaEndereco;
}
function opcoesHora(selecionada, docHora){
var m = '00';
var h = 0;
var op = document.createElement('option');
op.value = '0';
docHora.appendChild(op);
for(var i = 1; i <= 48; i++){
if(h + ':' + m == selecionada)
var sel = true;
else
var sel = false;
var op = document.createElement('option');
op.value = h + ':' + m;
op.innerHTML = h + ':' + m;
op.selected = sel;
docHora.appendChild(op);
m = (m == '00') ? '30' : '00';
h = (i % 2 == 0) ? h + 1 : h;
}
}
conteudo();
}
function ListaClientes(destino, idParceiro, botao){
destino.innerHTML = '';
botao.setAttribute('value', 'Esconder');
botao.onclick = function(){
fechar();
}
var divCorpo = document.createElement('div');
divCorpo.style.overflow = 'hidden';
destino.appendChild(divCorpo);
var pagina = 1;
var lista = this;
conteudo();
function conteudo(){
var parametros = 'id=' + idParceiro + '&pagina=' + pagina;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=8&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
divCorpo.innerHTML = '';
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
var divItem = document.createElement('div');
divItem.style.overflow = 'hidden';
divItem.style.height = '30px';
var divCel2 = document.createElement('div');
divCel2.className = 'form_cel';
var divRazaoCel = document.createElement('div');
divRazaoCel.className = 'form_cel';
var divCnpjCel = document.createElement('div');
divCnpjCel.className = 'form_cel';
divCnpjCel.style.width = '150px';
var divEstadoCel = document.createElement('div');
divEstadoCel.className = 'form_cel';
divEstadoCel.style.width = '100px';
var divTerminaisCel = document.createElement('div');
divTerminaisCel.className = 'form_cel';
divTerminaisCel.style.width = '100px';
var divRazao = document.createElement('div');
divRazao.innerHTML = 'Raz&atilde;o Social';
divRazao.className = 'form_lbl';
var divCnpj = document.createElement('div');
divCnpj.innerHTML = 'CNPJ';
divCnpj.className = 'form_lbl';
var divEstado = document.createElement('div');
divEstado.innerHTML = 'Estado';
divEstado.className = 'form_lbl';
var divTerminais = document.createElement('div');
divTerminais.innerHTML = 'Terminais';
divTerminais.className = 'form_lbl';
divCel2.appendChild(divCnpjCel);
divCel2.appendChild(divEstadoCel);
divCel2.appendChild(divTerminaisCel);
divRazaoCel.appendChild(divRazao);
divCnpjCel.appendChild(divCnpj);
divEstadoCel.appendChild(divEstado);
divTerminaisCel.appendChild(divTerminais);
divItem.appendChild(divRazaoCel);
divItem.appendChild(divCel2);
divCorpo.appendChild(divItem);
for(var i = 0; i < dados.clientes.length; i++){
var a = document.createElement('a');
a.setAttribute('href', '?pagina=8&cliente=' + dados.clientes[i].id + '&cod=' + document.getElementById('cod').value);
var divItem = document.createElement('div');
if(i % 2 == 0)
divItem.className = 'lista_fundo';
else
divItem.className = 'lista';
var divCel2 = document.createElement('div');
divCel2.className = 'form_cel';
var divRazaoCel = document.createElement('div');
divRazaoCel.className = 'form_cel';
var divCnpjCel = document.createElement('div');
divCnpjCel.className = 'form_cel';
divCnpjCel.style.width = '150px';
var divEstadoCel = document.createElement('div');
divEstadoCel.className = 'form_cel';
divEstadoCel.style.width = '100px';
var divTerminaisCel = document.createElement('div');
divTerminaisCel.className = 'form_cel';
divTerminaisCel.style.width = '100px';
var divRazao = document.createElement('div');
divRazao.innerHTML = dados.clientes[i].razao;
divRazao.className = 'form_cmp';
var divCnpj = document.createElement('div');
divCnpj.innerHTML = dados.clientes[i].cnpj;
divCnpj.className = 'form_cmp';
var divEstado = document.createElement('div');
divEstado.innerHTML = dados.clientes[i].estado;
divEstado.className = 'form_cmp';
var divTerminais = document.createElement('div');
divTerminais.innerHTML = dados.clientes[i].terminais;
divTerminais.className = 'form_cmp';
divCel2.appendChild(divCnpjCel);
divCel2.appendChild(divEstadoCel);
divCel2.appendChild(divTerminaisCel);
divRazaoCel.appendChild(divRazao);
divCnpjCel.appendChild(divCnpj);
divEstadoCel.appendChild(divEstado);
divTerminaisCel.appendChild(divTerminais);
a.appendChild(divRazaoCel);
a.appendChild(divCel2);
divItem.appendChild(a);
divCorpo.appendChild(divItem);
}
var divPaginacao = document.createElement('div');
divPaginacao.className = 'paginacao';
var ulPaginacao = document.createElement('ul');
for(var i = 0; i < dados.paginas.length; i++){
var liPaginacao = document.createElement('li');
var a = document.createElement('a');
a.innerHTML = dados.paginas[i].lbl;
if(pagina != dados.paginas[i].vlr)
new paginacao(a, dados.paginas[i].vlr);
else
a.style.borderColor = '#09F';
liPaginacao.appendChild(a);
ulPaginacao.appendChild(liPaginacao);
}
divPaginacao.appendChild(ulPaginacao);
divCorpo.appendChild(divPaginacao);
}
}
}
}
}
function paginacao(botao, pagina_){
if(document.addEventListener){
botao.addEventListener('click', function(){pagina = pagina_; conteudo();}, true);
}else if(document.attachEvent){
botao.attachEvent('onclick', function(){pagina = pagina_; conteudo();}, true);
}
}
function fechar(){
botao.setAttribute('value', 'Listar');
botao.onclick = function(){
new ListaClientes(destino, idParceiro, botao);
}
destino.innerHTML = '';
lista = null;
}
}
function Mapa(divMapaContainer, mostrar, botao, idTerminal){
var geocoder;
var mapa = this;
var map;
var t = 0;
var janelaAberta = 0;
var divBotoes = document.createElement('div');
var imgPontos = new Array('ponto_vermelho.png', 'ponto_laranja.png', 'ponto_amarelo.png', 'ponto_lime.png', 'ponto_verde.png');
var pontos = new Array();
var infowindow = new Array();
var divCarregador = document.createElement('div');
divCarregador.className = 'mapa_carregador';
divMapaContainer.parentNode.appendChild(divCarregador);
var car;
this.initialize = function() {
navigator.geolocation.getCurrentPosition(posicaoUsuario);
var latlng = new google.maps.LatLng(-15, -55);
var myOptions = {
zoom: 4,
center: latlng,
mapTypeId: google.maps.MapTypeId.ROADMAP,
mapTypeControl: false,
streetViewControl: false,
scrollwheel: false,
panControl: true,
panControlOptions: {
position: google.maps.ControlPosition.RIGHT
},
zoomControl: true,
zoomControlOptions: {
style: google.maps.ZoomControlStyle.SMALL,
position: google.maps.ControlPosition.RIGHT
},
scaleControl: false
};
map = new google.maps.Map(divMapaContainer, myOptions);
map.controls[google.maps.ControlPosition.TOP_RIGHT].push(divBotoes);
pontos = new Array();
};
function posicaoUsuario(position){
var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
map.setCenter(latlng);
map.setZoom(10);
if(car)
car.fim();
}
this.codeAddress = function(idTerminal, cidade, estado, rua, numero, salvar) {
geocoder = new window.google.maps.Geocoder();
var dados = rua + ', ' + numero + ', ' + cidade + ', ' + estado + ', Brasil';
if (geocoder) {
var car = new Carregador(divCarregador);
car.setLocalImagens('imagens');
car.inicio();
geocoder.geocode( {address: dados}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
salvaLatitude(idTerminal, results[0].geometry.location, car, salvar);
} else {
alert("Geocode was not successful for the following reason: " + status);
return 0;
}
});
}
};
function geocodeParceiro(dados) {
geocoder = new window.google.maps.Geocoder();
if (geocoder) {
var car = new Carregador(divCarregador);
car.setLocalImagens('imagens');
car.inicio();
geocoder.geocode( {address: dados}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
latitudeParceiro(car, true, results[0].geometry.location);
} else {
alert("Geocode was not successful for the following reason: " + status);
return 0;
}
});
}
}
this.addBotao = function(botao){
divBotoes.appendChild(botao);
};
this.removeBotao = function(botao){
divBotoes.removeChild(botao);
};
this.addMarker = function(latitude, longitude, title, id, zIndex, icone){
var latlng = new google.maps.LatLng(latitude, longitude);
if(!icone)
var dados = {map: map, position: latlng, title: title, zIndex: zIndex, draggable: true, id: id};
else
var dados = {map: map, position: latlng, title: title, icon: icone, zIndex: zIndex, draggable: true, id: id};
var marker = new google.maps.Marker(dados);
google.maps.event.addListener(marker, 'dragend', function(){
if(confirm('Deseja salvar a nova posicao deste terminal?')){
var car = new Carregador(divCarregador);
car.setLocalImagens('imagens');
car.inicio();
salvaLatitude(marker.id, marker.getPosition(), car, true);
}else{
mapa.atualizaMonitoramento();
}
});
google.maps.event.addListener(marker, 'drag', function(){pause();});
pontos[id] = marker;
};
this.atualizaMonitoramento = function(){
clearTimeout(t);
var parametros = 'enviar=enviar&mapa=1&aberta=' + janelaAberta;
var httpReq;
var cod = '';
var car = new Carregador(divCarregador);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=5&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
for(var i in pontos){
try{
pontos[i].setMap(null);
}catch(e){}
}
pontos = new Array();
for(var i = 0; i < dados.pontos.length; i++){
var id = dados.pontos[i].id;
var objId = {id:dados.pontos[i].id};
if(dados.pontos[i].st >= 0 && dados.pontos[i].lat != '' && dados.pontos[i].lng != ''){
mapa.addMarker(dados.pontos[i].lat, dados.pontos[i].lng, dados.pontos[i].razao, dados.pontos[i].id, dados.pontos[i].seq, 'imagens/detalhes/' + imgPontos[dados.pontos[i].st]);
if(dados.pontos[i].st > 0)
var sit = 'On line';
else
var sit = 'Off line';
infowindow[id] = new google.maps.InfoWindow({
content: conteudoBalao(dados.pontos[i].razao, sit)
});
google.maps.event.addListener(infowindow[id], 'closeclick', function() {
janelaAberta = 0;
});
new abrirJanela(objId);
}
if(dados.pontos[i].st == -2 && dados.pontos[i].lat != '' && dados.pontos[i].lng != ''){
mapa.addMarker(dados.pontos[i].lat, dados.pontos[i].lng, dados.pontos[i].razao, dados.pontos[i].id, dados.pontos[i].seq, 'imagens/detalhes/ponto_cinza.png');
infowindow[id] = new google.maps.InfoWindow({
content: conteudoBalao(dados.pontos[i].razao, 'Fora do hor&aacute;rio de funcionamento.')
});
google.maps.event.addListener(infowindow[id], 'closeclick', function() {
janelaAberta = 0;
});
new abrirJanela(objId);
}
if(dados.pontos[i].st == -1 && dados.pontos[i].lat != '' && dados.pontos[i].lng != ''){
mapa.addMarker(dados.pontos[i].lat, dados.pontos[i].lng, dados.pontos[i].razao, dados.pontos[i].id, dados.pontos[i].seq, 'imagens/detalhes/ponto_azul.png');
infowindow[id] = new google.maps.InfoWindow({
content: conteudoBalao(dados.pontos[i].razao, 'N&atilde;o monitorado.')
});
google.maps.event.addListener(infowindow[id], 'closeclick', function() {
janelaAberta = 0;
});
new abrirJanela(objId);
}
}
if(dados.aberta > 0)
mapa.abreJanela(dados.aberta);
}
t = setTimeout(function(){mapa.atualizaMonitoramento();}, 15000);
}
};
}
};
function conteudoBalao(razao, situacao){
var str = '<div class="form_lbl">Raz&atilde;o Social</div>';
str += '<div class="form_cmp">' + razao + '</div>';
str += '<div class="form_lbl">Situa&ccedil;&atilde;o</div>';
str += '<div class="form_cmp">' + situacao + '</div>';
return str;
}
function salvaLatitude(idTerminal, latlng, carregador, salvar){
var parametros = 'id=' + idTerminal + '&latlng=' + latlng + '&monit=1';
if(salvar)
parametros += '&salvar=1';
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=37&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
carregador.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
if(mostrar){
alert('OK!\nA nova localizacao do terminal foi salva com sucesso!');
}else{
alert('OK!\nO terminal ja esta sendo monitorado!');
if(botao){
botao.setAttribute('value', 'OK! Monitorando!');
botao.onclick = function(){
};
}
}
}
if(mostrar){
mapa.atualizaMonitoramento();
}
}
};
}
}
function latitudeParceiro(carregador, salvar, latlng){
var parametros = 'enviar=enviar';
if(salvar)
parametros += '&salvar=1&latlng=' + latlng;
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=38&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
if(carregador)
carregador.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
var latlng = new google.maps.LatLng(dados.lat, dados.lng);
map.setCenter(latlng);
}else{
geocodeParceiro(dados.dados);
}
}
};
}
}
this.setCentro = function(latlng){
var latlng = new google.maps.LatLng(latlng.lat, latlng.lng);
map.setCenter(latlng);
map.setZoom(10);
};
this.abreJanela = function(id){
infowindow[id].open(map, pontos[id]);
janelaAberta = id;
};
function pause(){
clearTimeout(t);
}
function abrirJanela(valor){
google.maps.event.addListener(pontos[valor.id], 'click', function() {
mapa.fecharJanelas();
infowindow[valor.id].open(map, pontos[valor.id]);
janelaAberta = valor.id;
});
}
this.fecharJanelas = function(){
janelaAberta = 0;
for(var i in infowindow){
infowindow[i].close();
}
};
}
function MapaSWH(divMapaContainer, mostrar, botao, idTerminal){
var geocoder;
var mapa = this;
var map;
var t = 0;
var janelaAberta = 0;
var divBotoes = document.createElement('div');
var imgPontos = new Array('ponto_vermelho.png', 'ponto_laranja.png', 'ponto_amarelo.png', 'ponto_lime.png', 'ponto_verde.png');
var pontos = new Array();
var infowindow = new Array();
var divCarregador = document.createElement('div');
divCarregador.className = 'mapa_carregador';
divMapaContainer.parentNode.appendChild(divCarregador);
var car;
this.initialize = function() {
navigator.geolocation.getCurrentPosition(posicaoUsuario);
var latlng = new google.maps.LatLng(-15, -55);
var myOptions = {
zoom: 4,
center: latlng,
mapTypeId: google.maps.MapTypeId.ROADMAP,
mapTypeControl: false,
streetViewControl: false,
scrollwheel: false,
panControl: true,
panControlOptions: {
position: google.maps.ControlPosition.RIGHT
},
zoomControl: true,
zoomControlOptions: {
style: google.maps.ZoomControlStyle.SMALL,
position: google.maps.ControlPosition.RIGHT
},
scaleControl: false
};
map = new google.maps.Map(divMapaContainer, myOptions);
map.controls[google.maps.ControlPosition.TOP_RIGHT].push(divBotoes);
pontos = new Array();
};
function posicaoUsuario(position){
var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
map.setCenter(latlng);
if(car)
car.fim();
}
this.codeAddress = function(idTerminal, cidade, estado, rua, numero, salvar) {
geocoder = new window.google.maps.Geocoder();
var dados = rua + ', ' + numero + ', ' + cidade + ', ' + estado + ', Brasil';
if (geocoder) {
var car = new Carregador(divCarregador);
car.setLocalImagens('imagens');
car.inicio();
geocoder.geocode( {address: dados}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
salvaLatitude(idTerminal, results[0].geometry.location, car, salvar);
} else {
alert("Geocode was not successful for the following reason: " + status);
return 0;
}
});
}
};
function geocodeParceiro(dados) {
geocoder = new window.google.maps.Geocoder();
if (geocoder) {
var car = new Carregador(divCarregador);
car.setLocalImagens('imagens');
car.inicio();
geocoder.geocode( {address: dados}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
latitudeParceiro(car, true, results[0].geometry.location);
} else {
alert("Geocode was not successful for the following reason: " + status);
return 0;
}
});
}
}
this.addBotao = function(botao){
divBotoes.appendChild(botao);
};
this.removeBotao = function(botao){
divBotoes.removeChild(botao);
};
this.addMarker = function(latitude, longitude, title, id, zIndex, icone){
var latlng = new google.maps.LatLng(latitude, longitude);
if(!icone)
var dados = {map: map, position: latlng, title: title, zIndex: zIndex, draggable: true, id: id};
else
var dados = {map: map, position: latlng, title: title, icon: icone, zIndex: zIndex, draggable: true, id: id};
var marker = new google.maps.Marker(dados);
google.maps.event.addListener(marker, 'dragend', function(){
if(confirm('Deseja salvar a nova posicao deste terminal?')){
var car = new Carregador(divCarregador);
car.setLocalImagens('imagens');
car.inicio();
salvaLatitude(marker.id, marker.getPosition(), car, true);
}else{
mapa.atualizaMonitoramento();
}
});
google.maps.event.addListener(marker, 'drag', function(){pause();});
pontos[pontos.length] = {'ponto' : marker, 'id' : id};
};
this.atualizaMonitoramento = function(idParceiro, centralizar){
clearTimeout(t);
var parametros = 'enviar=enviar&mapa=1&aberta=' + janelaAberta + '&id_parceiro=' + idParceiro;
var httpReq;
var cod = '';
var car = new Carregador(divCarregador);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=6&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
for(var i in pontos){
try{
pontos[i].ponto.setMap(null);
}catch(e){}
}
pontos = new Array();
var latH = 0;
var latL = 0;
var lngH = 0;
var lngL = 0;
if(centralizar){
if(dados.pontos.length > 0){
latH = parseFloat(dados.pontos[0].lat);
latL = parseFloat(dados.pontos[0].lat);
lngH = parseFloat(dados.pontos[0].lng);
lngL = parseFloat(dados.pontos[0].lng);
}
}
for(var i = 0; i < dados.pontos.length; i++){
var id = dados.pontos[i].id;
var objId = {id:dados.pontos[i].id};
if(dados.pontos[i].st >= 0 && dados.pontos[i].lat != '' && dados.pontos[i].lng != ''){
mapa.addMarker(dados.pontos[i].lat, dados.pontos[i].lng, dados.pontos[i].razao, dados.pontos[i].id, dados.pontos[i].seq, 'imagens/detalhes/' + imgPontos[dados.pontos[i].st]);
if(dados.pontos[i].st > 0)
var sit = 'On line';
else
var sit = 'Off line';
infowindow[infowindow.length] = {'info' : new google.maps.InfoWindow({
content: conteudoBalao(dados.pontos[i].razao, sit)
}), 'id' : id};
google.maps.event.addListener(pegaInfo(id), 'closeclick', function() {
janelaAberta = 0;
});
new abrirJanela(objId);
}
if(dados.pontos[i].st == -2 && dados.pontos[i].lat != '' && dados.pontos[i].lng != ''){
mapa.addMarker(dados.pontos[i].lat, dados.pontos[i].lng, dados.pontos[i].razao, dados.pontos[i].id, dados.pontos[i].seq, 'imagens/detalhes/ponto_cinza.png');
infowindow[infowindow.length] = {'info' : new google.maps.InfoWindow({
content: conteudoBalao(dados.pontos[i].razao, 'Fora do hor&aacute;rio de funcionamento.')
}), 'id' : id};
google.maps.event.addListener(pegaInfo(id), 'closeclick', function() {
janelaAberta = 0;
});
new abrirJanela(objId);
}
if(dados.pontos[i].st == -1 && dados.pontos[i].lat != '' && dados.pontos[i].lng != ''){
mapa.addMarker(dados.pontos[i].lat, dados.pontos[i].lng, dados.pontos[i].razao, dados.pontos[i].id, dados.pontos[i].seq, 'imagens/detalhes/ponto_azul.png');
infowindow[infowindow.length] = {'info' : new google.maps.InfoWindow({
content: conteudoBalao(dados.pontos[i].razao, 'N&atilde;o monitorado.')
}), 'id' : id};
google.maps.event.addListener(pegaInfo(id), 'closeclick', function() {
janelaAberta = 0;
});
new abrirJanela(objId);
}
if(centralizar){
var lat = parseFloat(dados.pontos[i].lat);
var lng = parseFloat(dados.pontos[i].lng);
latH = lat > latH ? lat : latH;
latL = lat < latL ? lat : latL;
lngH = lng > lngH ? lng : lngH;
lngL = lng < lngL ? lng : lngL;
}
}
if(centralizar){
var ne = new google.maps.LatLng(latH, lngH);
var sw = new google.maps.LatLng(latL, lngL);
var bd = new google.maps.LatLngBounds(sw, ne);
map.panToBounds(bd);
}
if(dados.aberta > 0)
mapa.abreJanela(dados.aberta);
}
t = setTimeout(function(){mapa.atualizaMonitoramento(idParceiro, false);}, 15000);
}
};
}
};
function conteudoBalao(razao, situacao){
var str = '<div class="form_lbl">Raz&atilde;o Social</div>';
str += '<div class="form_cmp">' + razao + '</div>';
str += '<div class="form_lbl">Situa&ccedil;&atilde;o</div>';
str += '<div class="form_cmp">' + situacao + '</div>';
return str;
}
function salvaLatitude(idTerminal, latlng, carregador, salvar){
var parametros = 'id=' + idTerminal + '&latlng=' + latlng + '&monit=1';
if(salvar)
parametros += '&salvar=1';
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=37&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
carregador.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
if(mostrar){
alert('OK!\nA nova localizacao do terminal foi salva com sucesso!');
}else{
alert('OK!\nO terminal ja esta sendo monitorado!');
if(botao){
botao.setAttribute('value', 'OK! Monitorando!');
botao.onclick = function(){
};
}
}
}
if(mostrar){
mapa.atualizaMonitoramento();
}
}
};
}
}
function latitudeParceiro(carregador, salvar, latlng){
var parametros = 'enviar=enviar';
if(salvar)
parametros += '&salvar=1&latlng=' + latlng;
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=38&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
if(carregador)
carregador.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
var latlng = new google.maps.LatLng(dados.lat, dados.lng);
map.setCenter(latlng);
}else{
geocodeParceiro(dados.dados);
}
}
};
}
}
this.setCentro = function(latlng){
var latlng = new google.maps.LatLng(latlng.lat, latlng.lng);
map.setCenter(latlng);
};
this.abreJanela = function(id){
pegaInfo(id).open(map, pontos[id]);
janelaAberta = id;
};
function pause(){
clearTimeout(t);
}
function pegaPonto(id){
for(var i in pontos){
if(pontos[i].id == id)
return pontos[i].ponto;
}
return null;
}
function pegaInfo(id){
for(var i in infowindow){
if(infowindow[i].id == id)
return infowindow[i].info;
}
return null;
}
function abrirJanela(valor){
google.maps.event.addListener(pegaPonto(valor.id), 'click', function() {
mapa.fecharJanelas();
pegaInfo(valor.id).open(map, pegaPonto(valor.id));
janelaAberta = valor.id;
});
}
this.fecharJanelas = function(){
janelaAberta = 0;
for(var i = 0; i < infowindow.length; i++){
infowindow[i].info.close();
}
};
}
function Monitoramento(base1, base2, base1Queda, base2Queda, tituloAt, tituloQd){
var monitoramento = this;
var cores = new Array('#CC0000', '#FF5500', '#FFCC00', '#99CC00', '#009900');
var divCabecalho = document.createElement('div');
divCabecalho.className = 'form_cel';
divCabecalho.style.width = '370px';
divCabecalho.style.background = 'url(imagens/fundos/fundo_degrade_cinza_lista.png) repeat-y left';
divCabecalho.style.borderBottom = '2px solid #FFF';
divCabecalho.style.borderTop = '2px solid #FFF';
divCabecalho.style.padding = '3px 0 3px 0';
var divCelCabCli = document.createElement('div');
divCelCabCli.className = 'form_cel';
divCelCabCli.style.width = '220px';
var divCelCabTer = document.createElement('div');
divCelCabTer.className = 'form_cel';
divCelCabTer.style.width = '150px';
var divCabLblCli = document.createElement('div');
divCabLblCli.className = 'form_cmp';
divCabLblCli.innerHTML = 'Cliente';
var divCabLblTer = document.createElement('div');
divCabLblTer.className = 'form_cmp';
divCabLblTer.innerHTML = 'Status da Conex&atilde;o';
divCabecalho.appendChild(divCelCabCli);
divCabecalho.appendChild(divCelCabTer);
divCelCabCli.appendChild(divCabLblCli);
divCelCabTer.appendChild(divCabLblTer);
this.atualizaMonitoramento = function(){
var parametros = 'enviar=enviar';
var httpReq;
var cod = '';
var car = new Carregador(base1);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=5&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
base1.innerHTML = '';
base2.innerHTML = '';
base1Queda.innerHTML = '';
base2Queda.innerHTML = '';
base1.appendChild(divCabecalho.cloneNode(true));
base2.appendChild(divCabecalho.cloneNode(true));
base1Queda.appendChild(divCabecalho.cloneNode(true));
base2Queda.appendChild(divCabecalho.cloneNode(true));
if(dados.resposta == 1){
var contAt = 1;
var contQd = 1;
var totalAt = 0;
var totalQd = 0;
for(var j = 0; j < dados.pontos.length; j++){
if(dados.pontos[j].st > 0)
totalAt++;
else if(dados.pontos[j].st == 0)
totalQd++;
}
tituloAt.innerHTML = 'Em Atividade ';
tituloQd.innerHTML = '&Uacute;ltimas Quedas ';
var spnQuantQd = document.createElement('span');
spnQuantQd.className = 'subtitulo_total';
spnQuantQd.innerHTML = totalQd + ' contas';
var spnQuantAt = document.createElement('span');
spnQuantAt.className = 'subtitulo_total';
spnQuantAt.innerHTML = totalAt + ' contas';
tituloAt.appendChild(spnQuantAt);
tituloQd.appendChild(spnQuantQd);
for(var i = 0; i < dados.pontos.length; i++){
if(dados.pontos[i].st >= 0){
var divPonto = document.createElement('div');
divPonto.className = 'form_cel';
divPonto.style.width = '370px';
divPonto.style.height ='20px';
var divCelCliente = document.createElement('div');
divCelCliente.className = 'form_cel';
divCelCliente.style.width = '220px';
var divCelTerminal = document.createElement('div');
divCelTerminal.className = 'form_cel';
divCelTerminal.style.width = '150px';
var divCmpCliente = document.createElement('div');
divCmpCliente.style.fontSize = '12px';
var divCmpTerminal = document.createElement('div');
divCmpTerminal.style.borderBottom = '1px solid #FFF';
divCmpTerminal.style.fontSize = '12px';
divPonto.appendChild(divCelCliente);
divPonto.appendChild(divCelTerminal);
divCelCliente.appendChild(divCmpCliente);
divCelTerminal.appendChild(divCmpTerminal);
divCmpCliente.innerHTML = dados.pontos[i].razao;
divCmpCliente.style.padding = '2px 0 2px 0';
divCmpTerminal.innerHTML = dados.pontos[i].terminal;
divCmpTerminal.style.backgroundColor = cores[dados.pontos[i].st];
divCmpTerminal.style.color = '#FFF';
divCmpTerminal.style.padding = '2px';
if(dados.pontos[i].st > 0){
if(contAt > Math.ceil(totalAt / 2)){
base2.appendChild(divPonto);
contAt++;
}else{
base1.appendChild(divPonto);
contAt++;
}
if(contAt % 2 == 1)
divPonto.style.background = 'url(imagens/fundos/fundo_degrade_cinza_lista.png) repeat-y left';
}else{
if(contQd > Math.ceil(totalQd / 2)){
base2Queda.appendChild(divPonto);
contQd++;
}else{
base1Queda.appendChild(divPonto);
contQd++;
}
}
}
}
}
t = setTimeout(function(){monitoramento.atualizaMonitoramento();}, 15000);
}
}
}
}
}
function Monitoramento(base1, base2, base1Queda, base2Queda, tituloAt, tituloQd){
var monitoramento = this;
var cores = new Array('#CC0000', '#FF5500', '#FFCC00', '#99CC00', '#009900');
var divCabecalho = document.createElement('div');
divCabecalho.className = 'form_cel';
divCabecalho.style.width = '370px';
divCabecalho.style.background = 'url(imagens/fundos/fundo_degrade_cinza_lista.png) repeat-y left';
divCabecalho.style.borderBottom = '2px solid #FFF';
divCabecalho.style.borderTop = '2px solid #FFF';
divCabecalho.style.padding = '3px 0 3px 0';
var divCelCabCli = document.createElement('div');
divCelCabCli.className = 'form_cel';
divCelCabCli.style.width = '220px';
var divCelCabTer = document.createElement('div');
divCelCabTer.className = 'form_cel';
divCelCabTer.style.width = '150px';
var divCabLblCli = document.createElement('div');
divCabLblCli.className = 'form_cmp';
divCabLblCli.innerHTML = 'Cliente';
var divCabLblTer = document.createElement('div');
divCabLblTer.className = 'form_cmp';
divCabLblTer.innerHTML = 'Status da Conex&atilde;o';
divCabecalho.appendChild(divCelCabCli);
divCabecalho.appendChild(divCelCabTer);
divCelCabCli.appendChild(divCabLblCli);
divCelCabTer.appendChild(divCabLblTer);
this.atualizaMonitoramento = function(){
var parametros = 'enviar=enviar';
var httpReq;
var cod = '';
var car = new Carregador(base1);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=6&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
base1.innerHTML = '';
base2.innerHTML = '';
base1Queda.innerHTML = '';
base2Queda.innerHTML = '';
base1.appendChild(divCabecalho.cloneNode(true));
base2.appendChild(divCabecalho.cloneNode(true));
base1Queda.appendChild(divCabecalho.cloneNode(true));
base2Queda.appendChild(divCabecalho.cloneNode(true));
if(dados.resposta == 1){
var contAt = 1;
var contQd = 1;
var totalAt = 0;
var totalQd = 0;
for(var j = 0; j < dados.pontos.length; j++){
if(dados.pontos[j].st > 0)
totalAt++;
else if(dados.pontos[j].st == 0)
totalQd++;
}
tituloAt.innerHTML = 'Em Atividade ';
tituloQd.innerHTML = '&Uacute;ltimas Quedas ';
var spnQuantQd = document.createElement('span');
spnQuantQd.className = 'subtitulo_total';
spnQuantQd.innerHTML = totalQd + ' contas';
var spnQuantAt = document.createElement('span');
spnQuantAt.className = 'subtitulo_total';
spnQuantAt.innerHTML = totalAt + ' contas';
tituloAt.appendChild(spnQuantAt);
tituloQd.appendChild(spnQuantQd);
for(var i = 0; i < dados.pontos.length; i++){
if(dados.pontos[i].st >= 0){
var divPonto = document.createElement('div');
divPonto.className = 'form_cel';
divPonto.style.width = '370px';
divPonto.style.height ='20px';
var divCelCliente = document.createElement('div');
divCelCliente.className = 'form_cel';
divCelCliente.style.width = '220px';
var divCelTerminal = document.createElement('div');
divCelTerminal.className = 'form_cel';
divCelTerminal.style.width = '150px';
var divCmpCliente = document.createElement('div');
divCmpCliente.className = 'form_cmp';
var divCmpTerminal = document.createElement('div');
divCmpTerminal.style.borderBottom = '1px solid #FFF';
divCmpTerminal.style.fontSize = '12px';
divPonto.appendChild(divCelCliente);
divPonto.appendChild(divCelTerminal);
divCelCliente.appendChild(divCmpCliente);
divCelTerminal.appendChild(divCmpTerminal);
divCmpCliente.innerHTML = dados.pontos[i].razao;
divCmpCliente.style.padding = '2px 0 2px 0';
divCmpTerminal.innerHTML = dados.pontos[i].terminal;
divCmpTerminal.style.backgroundColor = cores[dados.pontos[i].st];
divCmpTerminal.style.color = '#FFF';
divCmpTerminal.style.padding = '2px';
if(dados.pontos[i].st > 0){
if(contAt > Math.ceil(totalAt / 2)){
base2.appendChild(divPonto);
contAt++;
}else{
base1.appendChild(divPonto);
contAt++;
}
if(contAt % 2 == 1)
divPonto.style.background = 'url(imagens/fundos/fundo_degrade_cinza_lista.png) repeat-y left';
}else{
if(contQd > Math.ceil(totalQd / 2)){
base2Queda.appendChild(divPonto);
contQd++;
}else{
base1Queda.appendChild(divPonto);
contQd++;
}
}
}
}
}
t = setTimeout(function(){monitoramento.atualizaMonitoramento();}, 15000);
}
}
}
}
}
function PesquisaMapa(destino, mapa){
var aberto = false;
var divCorpo = document.createElement('div');
divCorpo.className = 'pesquisa_mapa_corpo';
var divCampo = document.createElement('div');
divCampo.className = 'pesquisa_mapa_campo';
var divResult = document.createElement('div');
divResult.className = 'pesquisa_mapa_result';
var divBotao = document.createElement('div');
var divControle = document.createElement('div');
divControle.style.overflow = 'hidden';
var imgBt = document.createElement('img');
imgBt.setAttribute('src', 'imagens/icones/search_xp.png');
var bt = document.createElement('div');
bt.className = 'pesquisa_mapa_bt';
bt.onclick = function(){
if(aberto){
divCampo.style.display = 'none';
aberto = false;
imgBt.setAttribute('src', 'imagens/icones/search_xp.png');
try{
divCorpo.removeChild(divResult);
}catch(e){}
divResult.innerHTML = '';
campo.value = '';
}else{
divCampo.style.display = 'block';
aberto = true;
campo.focus();
imgBt.setAttribute('src', 'imagens/icones/delete_xp.png');
}
};
bt.appendChild(imgBt);
var tm = 0;
var campo = document.createElement('input');
campo.setAttribute('type', 'text');
campo.className = 'campo';
campo.style.width = '200px';
campo.style.padding = '2px 5px';
campo.onkeypress = function(){
clearTimeout(tm);
tm = setInterval(function(){buscar();}, 200);
};
divCampo.appendChild(campo);
divControle.appendChild(bt);
divControle.appendChild(divCampo);
divCorpo.appendChild(divControle);
destino.appendChild(divCorpo);
function buscar(){
clearTimeout(tm);
var parametros = 'buscar=' + campo.value;
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=9&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
divCorpo.appendChild(divResult);
divCorpo.removeChild(divResult);
divResult.innerHTML = '';
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
var ul = document.createElement('ul');
if(dados.dados.length > 1){
for(var i = 0; i < dados.dados.length; i++){
var li = document.createElement('li');
li.innerHTML = dados.dados[i].razao;
var latlng = {lat:dados.dados[i].lat, lng:dados.dados[i].lng, ids:dados.dados[i].ids};
new centralizar(li, latlng);
ul.appendChild(li);
}
}else if(dados.dados.length == 1){
var li = document.createElement('li');
li.innerHTML = dados.dados[0].razao;
var latlng = {lat:dados.dados[0].lat, lng:dados.dados[0].lng, ids:dados.dados[0].ids};
mapa.setCentro(latlng);
new centralizar(li, latlng);
ul.appendChild(li);
mapa.fecharJanelas();
janelas(latlng);
}
divResult.appendChild(ul);
divCorpo.appendChild(divResult);
}
}
};
}
}
function centralizar(elemento, valor){
addEvent('click', elemento, function(){mapa.setCentro(valor); mapa.fecharJanelas(); janelas(valor);});
}
function addEvent(evento, elemento, funcao){
if(document.addEventListener)
elemento.addEventListener(evento, funcao, true);
else if(document.attachEvent)
elemento.attachEvent('on' + evento, funcao, true);
}
function janelas(valor){
for(var i = 0; i < valor.ids.length; i++){
try{
mapa.abreJanela(valor.ids[i]);
}catch(e){}
}
}
}
function PoliticaParceiro(destino, botao, idParceiro, idPolitica, nivel){
var politicaParceiro = this;
botao.disabled = true;
var divCorpo = document.createElement('div');
divCorpo.className = 'form_cel';
divCorpo.style.border = '1px solid #DDE';
divCorpo.style.marginTop = '5px';
var divCmpBotoes = document.createElement('div');
divCmpBotoes.className = 'form_lbl';
destino.appendChild(divCorpo);
var divTopo;
var divLblSubplanos;
var divSubplanos;
var divLblPolitica;
var divLblSubplano;
var divCmpPolitica;
var divCmpSubplano;
var slcPolitica;
var slcSubplano = document.createElement('select');
slcSubplano.className = 'campo select';
slcSubplano.style.width = '300px';
slcSubplano.onchange = function(){
if(slcSubplano.value == 0){
divCmpBotoes.removeChild(btSalvar);
}else{
divCmpBotoes.appendChild(btSalvar);
}
}
var btSalvar = document.createElement('input');
btSalvar.setAttribute('type', 'button');
btSalvar.className = 'botao_pequeno';
btSalvar.setAttribute('value', 'Salvar');
btSalvar.onclick = function(){
salvar();
}
var btCancelar = document.createElement('input');
btCancelar.setAttribute('type', 'button');
btCancelar.className = 'botao_pequeno';
btCancelar.setAttribute('value', 'Cancelar');
btCancelar.onclick = function(){
destino.removeChild(divCorpo);
politicaParceiro = null;
botao.disabled = false;
}
var btCancelarSub = document.createElement('input');
btCancelarSub.setAttribute('type', 'button');
btCancelarSub.className = 'botao_pequeno';
btCancelarSub.setAttribute('value', 'Cancelar');
btCancelarSub.onclick = function(){
divCorpo.removeChild(divLblSubplano);
divCorpo.removeChild(divCmpSubplano);
divCmpBotoes.innerHTML = '';
divCmpBotoes.appendChild(btAdicionar);
}
var btAdicionar = document.createElement('input');
btAdicionar.setAttribute('type', 'button');
btAdicionar.className = 'botao_pequeno';
btAdicionar.setAttribute('value', 'Adicionar');
btAdicionar.onclick = function(){
divLblSubplano = document.createElement('div');
divLblSubplano.className = 'form_lbl';
divLblSubplano.innerHTML = 'Selecione o Sub-plano';
divCmpSubplano = document.createElement('div');
divCmpSubplano.className = 'form_cmp';
divCmpSubplano.appendChild(slcSubplano);
divCmpBotoes.innerHTML = '';
divCmpBotoes.appendChild(btCancelarSub);
opcoesSubplanos();
}
function inicio(){
divCorpo.innerHTML = '';
if(idPolitica && idPolitica > 0){
divTopo = document.createElement('div');
divTopo.className = 'politica_parceiro_topo';
divLblSubplanos = document.createElement('div');
divLblSubplanos.className = 'form_lbl';
divLblSubplanos.innerHTML = 'Sub-planos';
divSubplanos = document.createElement('div');
slcPolitica = document.createElement('input');
slcPolitica.setAttribute('type', 'hidden');
slcPolitica.setAttribute('value', idPolitica);
divCorpo.appendChild(divTopo);
divCorpo.appendChild(divLblSubplanos);
divCorpo.appendChild(divSubplanos);
divCorpo.appendChild(slcPolitica);
}else{
divLblPolitica = document.createElement('div');
divLblPolitica.className = 'form_lbl';
divLblPolitica.innerHTML = 'Pol&iacute;tica';
divLblSubplano = document.createElement('div');
divLblSubplano.className = 'form_lbl';
divLblSubplano.innerHTML = 'Selecione o Sub-plano';
divCmpPolitica = document.createElement('div');
divCmpPolitica.className = 'form_cmp';
divCmpSubplano = document.createElement('div');
divCmpSubplano.className = 'form_cmp';
slcPolitica = document.createElement('select');
slcPolitica.className = 'campo select';
slcPolitica.style.width = '300px';
slcPolitica.onchange = function(){
opcoesSubplanos();
divCmpBotoes.innerHTML = '';
divCmpBotoes.appendChild(btCancelar);
}
divCorpo.appendChild(divLblPolitica);
divCorpo.appendChild(divCmpPolitica);
divCorpo.appendChild(divCmpBotoes);
divCmpPolitica.appendChild(slcPolitica);
divCmpBotoes.appendChild(btCancelar);
divCmpSubplano.appendChild(slcSubplano);
opcoesPoliticas();
}
}
function opcoesPoliticas(){
var parametros = 'id=' + idParceiro;
var httpReq;
var cod = '';
var car = new Carregador(divCmpPolitica);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
slcPolitica.disabled = true;
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=25&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
slcPolitica.disabled = false;
if(dados.resposta == 1){
var op = document.createElement('option');
op.value = 0;
var txt = document.createTextNode('Selecione');
op.appendChild(txt);
slcPolitica.appendChild(op);
for(var i = 0; i < dados.politicas.length; i++){
var op = document.createElement('option');
op.value = dados.politicas[i].id;
var txt = document.createTextNode(dados.politicas[i].nome);
op.appendChild(txt);
slcPolitica.appendChild(op);
}
}
}
}
}
}
function opcoesSubplanos(){
if(slcPolitica.value > 0){
var parametros = 'id=' + slcPolitica.value + '&parceiro=' + idParceiro;
var httpReq;
var cod = '';
var car = new Carregador(divCmpSubplano);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
slcSubplano.disabled = true;
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=30&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
slcSubplano.disabled = false;
divCorpo.removeChild(divCmpBotoes);
divCorpo.appendChild(divLblSubplano);
divCorpo.appendChild(divCmpSubplano);
divCorpo.appendChild(divCmpBotoes);
if(dados.resposta == 1){
slcSubplano.innerHTML = '';
for(var i = 0; i < dados.dados.length; i++){
var op = document.createElement('option');
op.value = dados.dados[i].id;
var txt = document.createTextNode(dados.dados[i].valor);
op.appendChild(txt);
slcSubplano.appendChild(op);
}
}
}
}
}
}else{
slcSubplano.innerHTML = '';
var op = document.createElement('option');
op.value = 0;
var txt = document.createTextNode('Selecione a Polï¿½tica');
op.appendChild(txt);
slcSubplano.appendChild(op);
}
}
function salvar(){
if(slcSubplano.value > 0){
btSalvar.disabled = true;
var parametros = 'id=' + slcSubplano.value + '&parceiro=' + idParceiro;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=3&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
btSalvar.disabled = false;
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
idPolitica = dados.dados.id_politica;
conteudo();
}
}
}
}
}else{
alert("Selecione o Sub-plano!");
}
}
function retirarPolitica(id){
if(confirm('Deseja realmente retirar este sub-plano do parceiro?\nIsso ira impedi-lo de cadastrar novos clientes com este sub-plano.')){
var parametros = 'id=' + id + '&parceiro=' + idParceiro;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=35&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
conteudo();
}
}
}
}
}
}
function conteudo(){
var parametros = 'id=' + idPolitica + '&parceiro=' + idParceiro;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=16&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
inicio();
if(dados.resposta == 1){
divTopo.innerHTML = dados.dados.produto + ' - ' + dados.dados.nome;
for(var i = 0; i < dados.dados.subplanos.length; i++){
var divSub = document.createElement('div');
divSub.className = 'politica_parceiro_subplano';
var divSubTxt = document.createElement('div');
divSubTxt.className = 'politica_parceiro_subplano_txt';
divSubTxt.innerHTML = dados.dados.subplanos[i].nome;
divSubplanos.appendChild(divSub);
divSub.appendChild(divSubTxt);
var divSubBt = document.createElement('div');
divSubBt.className = 'politica_parceiro_subplano_bt';
divSub.appendChild(divSubBt);
if(nivel && nivel == 10){
var btExcluir = document.createElement('input');
btExcluir.setAttribute('type', 'button');
btExcluir.className = 'botao_pequeno';
btExcluir.setAttribute('value', 'X');
new excluir(btExcluir, dados.dados.subplanos[i].id);
divSubBt.appendChild(btExcluir);
}
if(dados.adicionar == 1){
divCmpBotoes.innerHTML = '';
divCmpBotoes.appendChild(btAdicionar);
divCorpo.appendChild(divCmpBotoes);
}
if(dados.bt_adicionar == 1){
botao.disabled = false;
botao.style.display = 'block';
}else{
botao.disabled = true;
botao.style.display = 'none';
}
}
}else{
botao.disabled = false;
botao.style.display = 'block';
destino.removeChild(divCorpo);
politicaParceiro = null;
}
}
}
}
}
function excluir(botao, id){
if(document.addEventListener) botao.addEventListener('click', function(){retirarPolitica(id);}, true);
else if(document.attachEvent) botao.attachEvent('onclick', function(){retirarPolitica(id);}, true);
}
inicio();
if(idPolitica && idPolitica > 0)
conteudo();
}
function Subplano(destino, idPoliticaComercial, idSubplano){
var subplano = this;
var t = new Date().getTime();
var divCorpo = document.createElement('div');
divCorpo.style.borderBottom = '1px #CDE4E9 dotted';
divCorpo.style.overflow = 'hidden';
divCorpo.style.paddingBottom = '5px';
divCorpo.style.position = 'relative';
var divCel1 = document.createElement('div');
divCel1.className = 'form_cel';
var divCel2 = document.createElement('div');
divCel2.className = 'form_cel';
var divCelNome = document.createElement('div');
divCelNome.className = 'form_cel';
divCelNome.style.width = '175px';
var divCelPolitica = document.createElement('div');
divCelPolitica.className = 'form_cel';
divCelPolitica.style.width = '175px';
var divCelHw = document.createElement('div');
divCelHw.className = 'form_cel';
divCelHw.style.width = '120px';
var divCelPadrao = document.createElement('div');
divCelPadrao.className = 'form_cel';
divCelPadrao.style.width = '80px';
var divCelBotao = document.createElement('div');
divCelBotao.className = 'form_cel';
divCelBotao.style.width = '150px';
var divLblNome = document.createElement('div');
divLblNome.className = 'form_lbl';
divLblNome.innerHTML = 'Nome';
var divCmpNome = document.createElement('div');
divCmpNome.className = 'form_cmp';
var divLblPolitica = document.createElement('div');
divLblPolitica.className = 'form_lbl';
divLblPolitica.innerHTML = 'Pol&iacute;tica de Seguran&ccedil;a';
var divCmpPolitica = document.createElement('div');
divCmpPolitica.className = 'form_cmp';
var divLblHw = document.createElement('div');
divLblHw.className = 'form_lbl';
divLblHw.innerHTML = 'HW';
var divCmpHw = document.createElement('div');
divCmpHw.className = 'form_cmp';
var divLblPadrao = document.createElement('div');
divLblPadrao.className = 'form_lbl';
divLblPadrao.innerHTML = 'Padr&atilde;o';
var divCmpPadrao = document.createElement('div');
divCmpPadrao.className = 'form_cmp';
var divLblBotao = document.createElement('div');
divLblBotao.className = 'form_lbl';
divLblBotao.innerHTML = '&nbsp;';
var divCmpBotao = document.createElement('div');
divCmpBotao.className = 'form_cmp';
divCmpBotao.style.textAlign = 'right';
var txtNome = document.createElement('input');
txtNome.setAttribute('type', 'text');
txtNome.className = 'campo';
var slcPolitica = document.createElement('select');
slcPolitica.className = 'campo select';
slcPolitica.style.width = '150px';
var radHwSim = document.createElement('input');
radHwSim.setAttribute('type', 'radio');
radHwSim.setAttribute('name', 'hw' + t);
var tHwSim = document.createTextNode('Sim ');
var radHwNao = document.createElement('input');
radHwNao.setAttribute('type', 'radio');
radHwNao.setAttribute('name', 'hw' + t);
radHwNao.checked = true;
var tHwNao = document.createTextNode('Nao');
var radPadrao = document.createElement('input');
radPadrao.setAttribute('type', 'radio');
radPadrao.setAttribute('name', 'padrao');
var btSalvar = document.createElement('input');
btSalvar.setAttribute('type', 'button');
btSalvar.className = 'botao_pequeno';
btSalvar.setAttribute('value', 'Salvar');
btSalvar.onclick = function(){
salvar();
}
var btAtualizar = document.createElement('input');
btAtualizar.setAttribute('type', 'button');
btAtualizar.className = 'botao_pequeno';
btAtualizar.setAttribute('value', 'Salvar');
btAtualizar.onclick = function(){
atualizar();
}
var btCancelar = document.createElement('input');
btCancelar.setAttribute('type', 'button');
btCancelar.className = 'botao_pequeno';
btCancelar.setAttribute('value', 'Cancelar');
btCancelar.onclick = function(){
destino.removeChild(divCorpo);
subplano = null;
}
divCorpo.appendChild(divCel1);
divCorpo.appendChild(divCel2);
divCel1.appendChild(divCelNome);
divCel1.appendChild(divCelPolitica);
divCel2.appendChild(divCelHw);
divCel2.appendChild(divCelPadrao);
divCel2.appendChild(divCelBotao);
divCelNome.appendChild(divLblNome);
divCelNome.appendChild(divCmpNome);
divCelPolitica.appendChild(divLblPolitica);
divCelPolitica.appendChild(divCmpPolitica);
divCelHw.appendChild(divLblHw);
divCelHw.appendChild(divCmpHw);
divCelPadrao.appendChild(divLblPadrao);
divCelPadrao.appendChild(divCmpPadrao);
divCelBotao.appendChild(divLblBotao);
divCelBotao.appendChild(divCmpBotao);
divCmpNome.appendChild(txtNome);
divCmpPolitica.appendChild(slcPolitica);
divCmpHw.appendChild(radHwSim);
divCmpHw.appendChild(tHwSim);
divCmpHw.appendChild(radHwNao);
divCmpHw.appendChild(tHwNao);
divCmpPadrao.appendChild(radPadrao);
if(idSubplano && idSubplano > 0){
conteudo();
divCmpBotao.appendChild(btAtualizar);
}else{
divCmpBotao.appendChild(btCancelar);
divCmpBotao.appendChild(btSalvar);
opcoesPoliticas();
}
destino.appendChild(divCorpo);
function opcoesPoliticas(selecionado){
var sel = false;
var parametros = 'enviar=enviar';
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
slcPolitica.disabled = true;
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=26&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
slcPolitica.innerHTML = '';
slcPolitica.disabled = false;
slcPolitica.focus();
if(dados.resposta == 1){
for(var i = 0; i < dados.dados.length; i++){
if(selecionado){
if(selecionado == dados.dados[i].id)
sel = true;
else
sel = false;
}
var op = document.createElement('option');
op.selected = sel;
op.value = dados.dados[i].id;
var txt = document.createTextNode(dados.dados[i].valor);
op.appendChild(txt);
slcPolitica.appendChild(op);
}
}
}
}
}
}
function conteudo(){
var sel = false;
var parametros = 'id=' + idSubplano;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=17&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
txtNome.setAttribute('value', dados.dados.nome);
opcoesPoliticas(dados.dados.id_politica_seguranca);
if(dados.dados.hw == 1)
radHwSim.checked = true;
else
radHwNao.checked = true;
if(dados.dados.padrao == 1)
radPadrao.checked = true;
}
}
}
}
}
function atualizar(){
var sel = false;
var hw = 0;
var padrao = 0;
if(radHwSim.checked)
hw = 1;
if(radPadrao.checked)
padrao = 1;
var parametros = 'id=' + idSubplano + '&nome=' + txtNome.value + '&politica=' + slcPolitica.value + '&hw=' + hw + '&padrao=' + padrao;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/&s=0&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
alert('ok');
}else{
alert('erro');
}
}
}
}
}
function salvar(){
var sel = false;
var hw = 0;
var padrao = 0;
if(radHwSim.checked)
hw = 1;
if(radPadrao.checked)
padrao = 1;
var parametros = 'nome=' + txtNome.value + '&politica=' + slcPolitica.value + '&hw=' + hw + '&padrao=' + padrao + '&politica_comercial=' + idPoliticaComercial;
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=41&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
idSubplano = dados.dados.id;
conteudo();
divCmpBotao.innerHTML = '';
divCmpBotao.appendChild(btAtualizar);
alert('ok');
}else{
alert('erro');
}
}
}
}
}
}
function Vpn(destino, idCliente, idVpn, nivel, chamado){
var hw = false;
var ipSit = false;
var situacao = 0;
var divInfo = document.createElement('div');
divInfo.style.overflow = 'hidden';
var divCorpo = document.createElement('div');
divCorpo.style.borderBottom = '1px #CDE4E9 dotted';
divCorpo.style.overflow = 'hidden';
divCorpo.style.padding = '10px 0 10px 0';
divCorpo.style.paddingBottom = '5px';
divCorpo.style.position = 'relative';
var divCel1 = document.createElement('div');
divCel1.className = 'form_cel';
var divCel2 = document.createElement('div');
divCel2.className = 'form_cel';
var divCelBotao = document.createElement('div');
divCelBotao.className = 'form_cel';
divCelBotao.style.width = '150px';
var divLblBotao = document.createElement('div');
divLblBotao.className = 'form_lbl';
divLblBotao.innerHTML = '&nbsp;';
var divCmpBotao = document.createElement('div');
divCmpBotao.className = 'form_cmp';
var divSituacao = document.createElement('div');
divSituacao.className = 'terminal_situacao';
var divBotaoChamado = document.createElement('div');
divBotaoChamado.className = 'terminal_botao_chamado';
if(chamado){
var btChamado = document.createElement('input');
btChamado.setAttribute('type', 'button');
btChamado.className = 'botao_pequeno';
btChamado.setAttribute('value', 'Abrir Chamado');
}
var btHist = document.createElement('input');
btHist.setAttribute('type', 'button');
btHist.className = 'botao_pequeno';
btHist.setAttribute('value', 'Historico');
btHist.onclick = function(){
new HistoricoVpn(document.body, idVpn);
};
var divCelUsuario = document.createElement('div');
divCelUsuario.className = 'form_cel';
divCelUsuario.style.width = '160px';
var divCelSenha = document.createElement('div');
divCelSenha.className = 'form_cel';
divCelSenha.style.width = '70px';
var divCelProduto = document.createElement('div');
divCelProduto.className = 'form_cel';
divCelProduto.style.width = '120px';
var divCelPolitica = document.createElement('div');
divCelPolitica.className = 'form_cel';
divCelPolitica.style.width = '230px';
if(nivel && nivel == 14){
var divCelSituacao = document.createElement('div');
divCelSituacao.className = 'form_cel';
divCelSituacao.style.width = '120px';
}
var divLblUsuario = document.createElement('div');
divLblUsuario.className = 'form_lbl';
divLblUsuario.innerHTML = 'Terminal';
var divCmpUsuario = document.createElement('div');
divCmpUsuario.className = 'form_cmp';
var divLblSenha = document.createElement('div');
divLblSenha.className = 'form_lbl';
divLblSenha.innerHTML = 'Senha';
var divCmpSenha = document.createElement('div');
divCmpSenha.className = 'form_cmp';
var divLblSituacao = document.createElement('div');
divLblSituacao.className = 'form_lbl';
divLblSituacao.innerHTML = 'Solicita&ccedil;&otilde;es';
if(nivel && nivel == 14){
var divCmpSituacao = document.createElement('div');
divCmpSituacao.className = 'form_cmp';
}
var divLblPolitica = document.createElement('div');
divLblPolitica.className = 'form_lbl';
divLblPolitica.innerHTML = 'Pol&iacute;tica';
var divCmpPolitica = document.createElement('div');
divCmpPolitica.className = 'form_cmp';
if(nivel && nivel == 14){
var slcSituacao = document.createElement('select');
slcSituacao.className = 'campo select';
slcSituacao.style.width = '110px';
slcSituacao.onchange = function(){
if(slcSituacao.value == 1 && situacao == 8){
var janela = new Janela(document.body, 300, 150, 'ATEN&Ccedil;&Atilde;O!');
var divMensagem = document.createElement('div');
divMensagem.innerHTML = 'O faturamento desta conta come&ccedil;a no momento em que ela for ativada!<br/><br/>Deseja continuar?';
var btSim = document.createElement('input');
btSim.setAttribute('type', 'button');
btSim.setAttribute('value', 'Sim');
btSim.className = 'botao verde';
btSim.onclick = function(){
solicitar();
janela.fechar();
};
var btNao = document.createElement('input');
btNao.setAttribute('type', 'button');
btNao.setAttribute('value', 'NÃ£o');
btNao.className = 'botao vermelho';
btNao.onclick = function(){
slcSituacao.value = 0;
janela.fechar();
};
var divBtSimNao = document.createElement('div');
divBtSimNao.className = 'form_lbl';
divBtSimNao.appendChild(btSim);
divBtSimNao.appendChild(document.createTextNode(' '));
divBtSimNao.appendChild(btNao);
janela.getDivConteudo().appendChild(divMensagem);
janela.getDivConteudo().appendChild(divBtSimNao);
}else{
solicitar();
}
};
}
var divLblProduto = document.createElement('div');
divLblProduto.className = 'form_lbl';
divLblProduto.innerHTML = 'Produto';
var divCmpProduto = document.createElement('div');
divCmpProduto.className = 'form_cmp';
var divCelPolitica = document.createElement('div');
divCelPolitica.className = 'form_cel';
divCelPolitica.style.width = '230px';
var divCelSubplano = document.createElement('div');
divCelSubplano.className = 'form_cel';
divCelSubplano.style.width = '175px';
var divLblPolitica = document.createElement('div');
divLblPolitica.className = 'form_lbl';
divLblPolitica.innerHTML = 'Pol&iacute;tica';
var divCmpPolitica = document.createElement('div');
divCmpPolitica.className = 'form_cmp';
divCmpPolitica.style.whiteSpace = 'normal';
var divLblSubplano = document.createElement('div');
divLblSubplano.className = 'form_lbl';
divLblSubplano.innerHTML = 'Sub-plano';
var divCmpSubplano = document.createElement('div');
divCmpSubplano.className = 'form_cmp';
var slcPolitica = document.createElement('select');
slcPolitica.className = 'campo select';
slcPolitica.style.width = '150px';
slcPolitica.onchange = function(){
opcoesSubplanos();
hw = false;
try{
divCorpo.removeChild(divIps);
}catch(e){}
};
var slcSubplano = document.createElement('select');
slcSubplano.className = 'campo select';
slcSubplano.style.width = '150px';
slcSubplano.onchange = function(){
isHW();
};
var btSalvar = document.createElement('input');
btSalvar.setAttribute('type', 'button');
btSalvar.className = 'botao_pequeno';
btSalvar.setAttribute('value', 'Salvar');
btSalvar.onclick = function(){
salvar();
};
var btCancelar = document.createElement('input');
btCancelar.setAttribute('type', 'button');
btCancelar.className = 'botao_pequeno';
btCancelar.setAttribute('value', 'Cancelar');
btCancelar.onclick = function(){
destino.removeChild(divCorpo);
subplano = null;
};
if(nivel && nivel == 14){
var btMsg = document.createElement('input');
btMsg.setAttribute('type', 'button');
btMsg.className = 'botao_pequeno';
btMsg.setAttribute('value', 'Mensagem Bloqueio');
btMsg.onclick = function(){
msgBloqueio();
};
var btRemMsg = document.createElement('input');
btRemMsg.setAttribute('type', 'button');
btRemMsg.className = 'botao_pequeno';
btRemMsg.setAttribute('value', 'Remover Mensagem');
btRemMsg.onclick = function(){
removeMsgBloqueio();
};
}
var btRelatorio = document.createElement('input');
btRelatorio.setAttribute('type', 'button');
btRelatorio.className = 'botao_pequeno';
btRelatorio.setAttribute('value', 'RelatÃ³rio');
btRelatorio.onclick = function(){
window.open("?pagina=29&terminal=" + idVpn + "&listar=Listar&concentrador=1&conexao=1&desconexao=1&duracao=1&tx=1&rx=1&motivo=1&ip_ext=1&isp=1&ip_int=1&cod=" + document.getElementById('cod').value, '_blank');
};
var divCelIp, divCelMask, divCelGat, divCelIpSitef, divLblIp, divLblMask, divLblGat, divLblIpSitef, divCmpIp, divCmpGat, divCmpMask, divCmpIpSitef, ip, mask, gateway, ipSitef, divIps;
function inicio(){
divCorpo.innerHTML = '';
divCel1.innerHTML = '';
divCel2.innerHTML = '';
divCorpo.appendChild(divSituacao);
divInfo.appendChild(divCel1);
divInfo.appendChild(divCel2);
divCorpo.appendChild(divInfo);
destino.appendChild(divCorpo);
if(idVpn && idVpn > 0){
divCel1.appendChild(divCelUsuario);
divCel1.appendChild(divCelSenha);
divCel1.appendChild(divCelProduto);
divCelPolitica.style.width = '230px';
divCel2.appendChild(divCelPolitica);
if(nivel && nivel == 14)
divCel2.appendChild(divCelSituacao);
divCelUsuario.appendChild(divLblUsuario);
divCelUsuario.appendChild(divCmpUsuario);
divCelSenha.appendChild(divLblSenha);
divCelSenha.appendChild(divCmpSenha);
if(nivel && nivel == 14){
divCelSituacao.appendChild(divLblSituacao);
divCelSituacao.appendChild(divCmpSituacao);
}
divCelPolitica.appendChild(divLblPolitica);
divCelPolitica.appendChild(divCmpPolitica);
divCelProduto.appendChild(divLblProduto);
divCelProduto.appendChild(divCmpProduto);
if(chamado){
btChamado.onclick = function(){
window.location = "?pagina=15&terminal=" + idVpn + "&cod=" + document.getElementById('cod').value;
};
}
conteudo();
}else{
divCelBotao.appendChild(divLblBotao);
divCelBotao.appendChild(divCmpBotao);
divCelPolitica.style.width = '175px';
divCel1.appendChild(divCelPolitica);
divCel1.appendChild(divCelSubplano);
divCel2.appendChild(divCelBotao);
divCelPolitica.appendChild(divLblPolitica);
divCelPolitica.appendChild(divCmpPolitica);
divCelSubplano.appendChild(divLblSubplano);
divCelSubplano.appendChild(divCmpSubplano);
divCmpPolitica.appendChild(slcPolitica);
divCmpSubplano.appendChild(slcSubplano);
divCmpBotao.appendChild(btCancelar);
divCmpBotao.appendChild(btSalvar);
opcoesPoliticas(false);
}
}
function conteudo(){
var parametros = 'id=' + idVpn;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=18&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
try{
divCorpo.removeChild(divIps);
}catch(e){}
if(nivel && nivel == 14)
slcSituacao.innerHTML = '';
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
if(nivel && nivel == 14){
if(dados.dados.msg_bloq == 1){
if(dados.dados.aviso == '')
divBotaoChamado.appendChild(btMsg);
else
divBotaoChamado.appendChild(btRemMsg);
}
}
situacao = dados.dados.sit;
divSituacao.innerHTML = dados.dados.situacao + (dados.dados.data_at != '' ? ' - Ativa&ccedil;&atilde;o: ' + dados.dados.data_at : '');
divSituacao.appendChild(divBotaoChamado);
if(dados.dados.rel == 1)
divBotaoChamado.appendChild(btRelatorio);
divBotaoChamado.appendChild(btHist);
if(chamado)
divBotaoChamado.appendChild(btChamado);
divCmpPolitica.innerHTML = dados.dados.politica;
if(dados.dados.senha != ''){
divCmpSenha.innerHTML = dados.dados.senha;
}else{
if(nivel && nivel == 14){
var btSenha = document.createElement('input');
btSenha.setAttribute('type', 'button');
btSenha.setAttribute('value', 'Gerar');
btSenha.className = 'botao_pequeno';
btSenha.onclick = function(){
alterarSenha();
};
divCmpSenha.appendChild(btSenha);
}
}
divSituacao.style.backgroundColor = dados.dados.cor;
divCmpUsuario.innerHTML = dados.dados.terminal;
divCmpProduto.innerHTML = dados.dados.produto;
if(nivel && nivel == 14){
if(dados.dados.situacoes.length > 0){
divCmpSituacao.appendChild(slcSituacao);
var op = document.createElement('option');
op.value = '0';
var txt = document.createTextNode('Selecione');
op.appendChild(txt);
slcSituacao.appendChild(op);
for(var i = 0; i < dados.dados.situacoes.length; i++){
var op = document.createElement('option');
op.value = dados.dados.situacoes[i].valor;
var txt = document.createTextNode(dados.dados.situacoes[i].texto);
op.appendChild(txt);
slcSituacao.appendChild(op);
}
}else{
divLblSituacao.innerHTML = '';
divCmpSituacao.innerHTML = '';
}
}
if(dados.dados.hw == 1){
hw = true;
mostraIps();
ip.setValor(dados.dados.ip);
mask.setValor(dados.dados.mask);
gateway.setValor(dados.dados.gate);
ipSitef.setValor(dados.dados.ip_sit);
var divCelBt = document.createElement('div');
divCelBt.className = 'form_cel';
divCelBt.style.width = '60px';
var divLblBt = document.createElement('div');
divLblBt.className = 'form_lbl';
divLblBt.innerHTML = '&nbsp';
divLblBt.style.paddingTop = '5px';
var divCmpBt = document.createElement('div');
divCmpBt.className = 'form_cmp';
var imgBt = document.createElement('img');
imgBt.setAttribute('src', 'imagens/icones/save.png');
imgBt.style.cursor = 'pointer';
imgBt.onclick = function(){
atualizarIps();
};
divIps.appendChild(divCelBt);
divCelBt.appendChild(divLblBt);
divCelBt.appendChild(divCmpBt);
divCmpBt.appendChild(imgBt);
}else if(dados.dados.hw == 2){
ipSit = true;
mostraIpSit();
ipSitef.setValor(dados.dados.ip_sit);
var divCelBt = document.createElement('div');
divCelBt.className = 'form_cel';
divCelBt.style.width = '60px';
var divLblBt = document.createElement('div');
divLblBt.className = 'form_lbl';
divLblBt.innerHTML = '&nbsp';
divLblBt.style.paddingTop = '5px';
var divCmpBt = document.createElement('div');
divCmpBt.className = 'form_cmp';
var imgBt = document.createElement('img');
imgBt.setAttribute('src', 'imagens/icones/save.png');
imgBt.style.cursor = 'pointer';
imgBt.onclick = function(){
atualizarIps();
};
divIps.appendChild(divCelBt);
divCelBt.appendChild(divLblBt);
divCelBt.appendChild(divCmpBt);
divCmpBt.appendChild(imgBt);
}
}
}
};
}
}
function msgBloqueio(){
var parametros = 'id_vpn=' + idVpn;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=32&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
alert('OK\nMensagem de bloqueio ativada com sucesso!');
divBotaoChamado.removeChild(btMsg);
$(btHist).before(btRemMsg);
}
if(dados.resposta == 2){
alert('Sem permissao para fazer isso!');
}
}
};
}
}
function removeMsgBloqueio(){
var parametros = 'id_vpn=' + idVpn;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=34&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
alert('OK\nMensagem de bloqueio removida com sucesso!');
divBotaoChamado.removeChild(btRemMsg);
$(btHist).before(btMsg);
}
if(dados.resposta == 2){
alert('Sem permissao para fazer isso!');
}
}
};
}
}
function solicitar(){
if(slcSituacao.value > 0){
if(confirm('Deseja realmente ' + slcSituacao.options[slcSituacao.selectedIndex].text + ' este terminal?')){
var parametros = 'id=' + slcSituacao.value + '&id_vpn=' + idVpn;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=7&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
conteudo();
}
}
};
}
}else{
slcSituacao.value = 0;
}
}
}
function salvar(){
if(slcSubplano.value > 0){
var parametros = 'subplano=' + slcSubplano.value + '&cliente=' + idCliente;
if(hw){
var msg = '';
parametros += '&ip=' + ip.getValor() + '&mask=' + mask.getValor() + '&gate=' + gateway.getValor() + '&ip_sit=' + ipSitef.getValor();
if(!ip.verifica())
msg += 'Preencha o IP do roteador corretamente!\n';
if(!mask.verifica())
msg += 'Preencha Mascara de rede corretamente!\n';
if(!gateway.verifica())
msg += 'Preencha o gateway corretamente!\n';
if(!ipSitef.verifica())
msg += 'Preencha o IP do Servidor TEF corretamente!';
if(msg != ''){
alert(msg);
return false;
}
}
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
btSalvar.disabled = true;
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=39&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
btSalvar.disabled = false;
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
idVpn = dados.dados.id;
inicio();
conteudo();
}
}
};
}
}else{
alert("Selecione o Sub-plano!");
}
}
function opcoesPoliticas(){
var parametros = 'enviar=enviar&cliente=' + idCliente;
var httpReq;
var cod = '';
var car = new Carregador(divCmpPolitica);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
slcPolitica.disabled = true;
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=24&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
slcPolitica.disabled = false;
if(dados.resposta == 1){
var op = document.createElement('option');
op.value = 0;
var txt = document.createTextNode('Selecione');
op.appendChild(txt);
slcPolitica.appendChild(op);
for(var i = 0; i < dados.politicas.length; i++){
var op = document.createElement('option');
op.value = dados.politicas[i].id;
var txt = document.createTextNode(dados.politicas[i].nome);
op.appendChild(txt);
slcPolitica.appendChild(op);
}
opcoesSubplanos();
}
}
};
}
}
function opcoesSubplanos(){
if(slcPolitica.value > 0){
var parametros = 'id=' + slcPolitica.value + '&cliente=' + idCliente;
var httpReq;
var cod = '';
var car = new Carregador(divCmpSubplano);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
slcSubplano.disabled = true;
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=29&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
slcSubplano.disabled = false;
if(dados.resposta == 1){
slcSubplano.innerHTML = '';
for(var i = 0; i < dados.dados.length; i++){
var op = document.createElement('option');
op.value = dados.dados[i].id;
if(dados.dados[i].sel == 1)
op.selected = true;
var txt = document.createTextNode(dados.dados[i].valor);
op.appendChild(txt);
slcSubplano.appendChild(op);
}
}
}
};
}
}else{
slcSubplano.innerHTML = '';
var op = document.createElement('option');
op.value = 0;
var txt = document.createTextNode('Selecione a Politica');
op.appendChild(txt);
slcSubplano.appendChild(op);
}
}
function atualizarIps(){
var parametros = 'id_vpn=' + idVpn;
if(hw){
var msg = '';
parametros += '&ip=' + ip.getValor() + '&mask=' + mask.getValor() + '&gate=' + gateway.getValor() + '&ip_sit=' + ipSitef.getValor();
if(!ip.verifica())
msg += 'Preencha o IP do roteador corretamente!\n';
if(!mask.verifica())
msg += 'Preencha Mascara de rede corretamente!\n';
if(!gateway.verifica())
msg += 'Preencha o gateway corretamente!\n';
if(!ipSitef.verifica())
msg += 'Preencha o IP do Servidor TEF corretamente!';
if(msg != ''){
alert(msg);
return false;
}
}
if(ipSit){
var msg = '';
parametros += '&ip_sit=' + ipSitef.getValor();
if(!ipSitef.verifica())
msg += 'Preencha o IP do Servidor TEF corretamente!';
if(msg != ''){
alert(msg);
return false;
}
}
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=7&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
conteudo();
}
}
};
}
}
function isHW(){
if(slcSubplano.value > 0){
btSalvar.disabled = true;
var parametros = 'id=' + slcSubplano.value;
var httpReq;
var cod = '';
var car = new Carregador(divCorpo);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=44&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
btSalvar.disabled = false;
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 2){
ipSit = true;
mostraIpSit();
}else if(dados.resposta == 1){
hw = true;
mostraIps();
}else{
ipSit = false;
hw = false;
divIps.innerHTML = '';
}
}
};
}
}
}
function mostraIps(){
divCelIp = document.createElement('div');
divCelIp.className = 'form_cel';
divCelIp.style.width = '160px';
divCelMask = divCelIp.cloneNode(true);
divCelGat = divCelIp.cloneNode(true);
divCelIpSitef = divCelIp.cloneNode(true);
divLblIp = document.createElement('div');
divLblIp.className = 'form_lbl';
divLblMask = divLblIp.cloneNode(true);
divLblGat = divLblIp.cloneNode(true);
divLblIpSitef = divLblIp.cloneNode(true);
divLblIp.innerHTML = 'IP do roteador';
divLblMask.innerHTML = 'M&aacute;scara de rede';
divLblGat.innerHTML = 'Gateway';
divLblIpSitef.innerHTML = 'IP Servidor TEF';
divCmpIp = document.createElement('div');
divCmpIp.className = 'form_cmp';
divCmpMask = divCmpIp.cloneNode(true);
divCmpGat = divCmpIp.cloneNode(true);
divCmpIpSitef = divCmpIp.cloneNode(true);
ip = new CampoIP(divCmpIp);
mask = new CampoIP(divCmpMask);
gateway = new CampoIP(divCmpGat);
ipSitef = new CampoIP(divCmpIpSitef);
divIps = document.createElement('div');
divIps.style.width = '700px';
divIps.style.display = 'block';
divIps.appendChild(divCelIp);
divIps.appendChild(divCelMask);
divIps.appendChild(divCelGat);
divIps.appendChild(divCelIpSitef);
divCelIp.appendChild(divLblIp);
divCelIp.appendChild(divCmpIp);
divCelMask.appendChild(divLblMask);
divCelMask.appendChild(divCmpMask);
divCelGat.appendChild(divLblGat);
divCelGat.appendChild(divCmpGat);
divCelIpSitef.appendChild(divLblIpSitef);
divCelIpSitef.appendChild(divCmpIpSitef);
divCorpo.appendChild(divIps);
}
function mostraIpSit(){
divCelIp = document.createElement('div');
divCelIp.className = 'form_cel';
divCelIp.style.width = '160px';
divLblIp = document.createElement('div');
divLblIp.className = 'form_lbl';
divLblIp.innerHTML = 'IP Servidor TEF';
divCmpIp = document.createElement('div');
divCmpIp.className = 'form_cmp';
ipSitef = new CampoIP(divCmpIp);
divIps = document.createElement('div');
divIps.style.width = '700px';
divIps.style.display = 'block';
divIps.appendChild(divCelIp);
divCelIp.appendChild(divLblIp);
divCelIp.appendChild(divCmpIp);
divCorpo.appendChild(divIps);
}
function alterarSenha(){
var parametros = 'id=' + idVpn;
var httpReq;
var cod = '';
var car = new Carregador(divCmpSenha);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=2&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
divCmpSenha.innerHTML = dados.pw;
}
}
};
}
}
inicio();
}
function Ajax(){
var httpReq;
if(window.XMLHttpRequest){
return new XMLHttpRequest();
}else if(window.ActiveXObject){
httpReq = new ActiveXObject("Microsoft.XMLHTTP");
if(httpReq){
return httpReq;
}else{
return false;
}
}
}
function pronto(httpReq){
if(httpReq.readyState == 4 && httpReq.status == 200){
return true;
}else{
return false;
}
}
function opcoes(doc, docDestino, arquivo, selecionado, foco, onPronto){
var sel = false;
var parametros = 'id=' + doc.value;
var httpReq;
var cod = '';
var car = new Carregador(docDestino.parentNode);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=' + arquivo + '&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
docDestino.innerHTML = '';
if(foco)
docDestino.focus();
if(dados.resposta == 1){
for(var i = 0; i < dados.dados.length; i++){
if(selecionado || selecionado == 0){
if(selecionado > 0)
docDestino.className = 'campo select *';
docDestino.blur();
if(selecionado == dados.dados[i].id)
sel = true;
else
sel = false;
}else{
if(dados.dados[i].sel && dados.dados[i].sel == 1)
sel = true;
else
sel = false;
}
var op = document.createElement('option');
op.selected = sel;
op.value = dados.dados[i].id;
var txt = document.createTextNode(dados.dados[i].valor);
op.appendChild(txt);
docDestino.appendChild(op);
}
}
eval(onPronto);
}
};
}
}
function validaEmail(doc){
var parametros = 'email=' + doc.value;
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=42&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
}else{
alert('Por favor, digite um e-mail valido!');
}
}
};
}
}
function verificaCnpjCliente(doc){
var parametros = 'cnpj=' + doc.value;
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=43&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
alert('Voce ja possui um cliente cadastrado com este CNPJ!');
doc.value = '';
}
}
};
}
}
function alteraCategoria(doc, id){
var parametros = 'id=' + id + '&cat=' + doc.value;
var httpReq;
var cod = '';
var car = new Carregador(doc.parentNode);
car.setLocalImagens('imagens');
car.inicio();
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=1&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
car.fim();
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 0){
alert('Erro!\nNao foi possivel alterar a categoria do cliente!');
}
}
};
}
}
function pararMonitoramento(idTerminal, botao){
var parametros = 'id=' + idTerminal + '&latlng=&monit=0';
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=37&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
alert('OK!\nO terminal deixou de ser monitorado!');
botao.setAttribute('value', 'NÃ£o Monitorado!');
botao.onclick = function(){
};
}
}
};
}
}
function verificaHw(doc){
var parametros = 'id=' + doc.value;
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=44&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
var dados = eval('(' + httpReq.responseText + ')');
if(dados.resposta == 1){
mostraIps();
}else if(dados.resposta == 2){
mostraIpSit();
}else{
document.getElementById('ips').innerHTML = '';
}
}
};
}
}
function atualizaLegendaGrafico(id){
var parametros = 'id=' + id;
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=19&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
var dados = httpReq.responseText;
document.getElementById('legenda').innerHTML = dados;
}
};
}
}
function atualizaLegendaGraficoTotal(id){
var parametros = 'id=' + id;
var httpReq;
var cod = '';
if(document.getElementById('cod')){
cod = 'cod=' + document.getElementById('cod').value;
}
if(httpReq = window.Ajax()){
httpReq.open('POST', 'ajax/?s=20&' + cod, true);
httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpReq.setRequestHeader("Content-length", parametros.length);
httpReq.setRequestHeader("Connection", "close");
httpReq.send(parametros);
httpReq.onreadystatechange = function(){
if(window.pronto(httpReq)){
var dados = eval('(' + httpReq.responseText + ')');
document.getElementById('total').innerHTML = 'Total: '+ dados.total + ' contas ativas.';
}
};
}
}
function mostraIps(){
var divCelIp = document.createElement('div');
divCelIp.className = 'form_cel';
divCelIp.style.width = '160px';
var divCelMask = divCelIp.cloneNode(true);
var divCelGat = divCelIp.cloneNode(true);
var divCelIpSitef = divCelIp.cloneNode(true);
var divLblIp = document.createElement('div');
divLblIp.className = 'form_lbl';
var divLblMask = divLblIp.cloneNode(true);
var divLblGat = divLblIp.cloneNode(true);
var divLblIpSitef = divLblIp.cloneNode(true);
divLblIp.innerHTML = 'IP do roteador';
divLblMask.innerHTML = 'M&aacute;scara de rede';
divLblGat.innerHTML = 'Gateway';
divLblIpSitef.innerHTML = 'IP Sitef';
var divCmpIp = document.createElement('div');
divCmpIp.className = 'form_cmp';
var divCmpMask = divCmpIp.cloneNode(true);
var divCmpGat = divCmpIp.cloneNode(true);
var divCmpIpSitef = divCmpIp.cloneNode(true);
var ip = new CampoIP(divCmpIp);
ip.setClass('campo *');
var mask = new CampoIP(divCmpMask);
mask.setClass('campo *');
var gateway = new CampoIP(divCmpGat);
gateway.setClass('campo *');
var ipSitef = new CampoIP(divCmpIpSitef);
ipSitef.setClass('campo *');
ip.setNome('ip');
mask.setNome('netmask');
gateway.setNome('gateway');
ipSitef.setNome('ip_sitef');
var divIps = document.getElementById('ips');
divIps.appendChild(divCelIp);
divIps.appendChild(divCelMask);
divIps.appendChild(divCelGat);
divIps.appendChild(divCelIpSitef);
divCelIp.appendChild(divLblIp);
divCelIp.appendChild(divCmpIp);
divCelMask.appendChild(divLblMask);
divCelMask.appendChild(divCmpMask);
divCelGat.appendChild(divLblGat);
divCelGat.appendChild(divCmpGat);
divCelIpSitef.appendChild(divLblIpSitef);
divCelIpSitef.appendChild(divCmpIpSitef);
}
function mostraIpSit(){
var divCelIp = document.createElement('div');
divCelIp.className = 'form_cel';
divCelIp.style.width = '160px';
var divLblIp = document.createElement('div');
divLblIp.className = 'form_lbl';
divLblIp.innerHTML = 'IP Sitef';
var divCmpIp = document.createElement('div');
divCmpIp.className = 'form_cmp';
var ip = new CampoIP(divCmpIp);
ip.setClass('campo *');
ip.setNome('ip_sitef');
var divIps = document.getElementById('ips');
divIps.appendChild(divCelIp);
divCelIp.appendChild(divLblIp);
divCelIp.appendChild(divCmpIp);
}
function visualizacaoListaContato(){
var cont = 0;
var ids = new Array();
$('div[class*="lista"]').each(function(){
ids[cont] = $(this).attr('id');
cont++;
});
cont = 0;
for(var i = 0; i < ids.length; i++){
$.post('ajax/?s=47&cod=' + document.getElementById('cod').value, {'id' : ids[i]}, function(data, textStatus, jqXHR){
if(data.resposta == 1){
$('#td' + ids[cont]).remove();
if(data.pessoas.length > 0){
var td = '<td class="form_cmp" style="color:#09F;" width="100" id="td' + ids[cont] + '">' + data.pessoas[0].nome + '</td>';
$('#' + ids[cont] + ' a').css({'color':'#09F'});
$('#' + ids[cont] + ' tr').append(td);
}else{
$('#' + ids[cont] + ' a').css({'color':'#666'});
}
cont++;
if(cont >= ids.length)
setTimeout(function(){visualizacaoListaContato();}, 5000);
}
}, 'json');
}
}
function janelaMotivoRejeicao(idContato){
$.post('ajax/?s=33&cod=' + $('#cod').val(), {'enviar' : 1}, function(data){
if(data.resposta == 1){
var janela = new Janela(document.body, 500, 300, 'Motivo da Rejei&ccedil;&atilde;o');
var titulo = $('<div class="subtitulo">Selecione o motivo da rejei&ccedil;&atilde;o:</div>');
var form = $('<form method="post"></form>');
titulo.appendTo(janela.getDivConteudo());
form.appendTo(janela.getDivConteudo());
janela.getDivConteudo().style.overflow = 'auto';
var bt = $('<input type="submit" name="rejeitar" value="Rejeitar" class="botao" />');
bt.css('display', 'none');
bt.click(function(){
validaMotivo();
});
for(var i = 0; i < data.motivos.length; i++){
var divCel = $('<div class="form_cel" style="width:450px;"></div>');
var divLbl = $('<div class="form_lbl"></div>');
var radio = $('<input type="radio" name="motivo" value="' + data.motivos[i].id + '"/>');
radio.click(function(){
bt.css('display', 'block');
});
divLbl.append(radio);
divLbl.append(' ' + data.motivos[i].desc);
divCel.append(divLbl);
form.append(divCel);
}
var divCel = $('<div class="form_cel"></div>');
var divLbl = $('<div class="form_lbl"></div>');
divCel.append(divLbl);
divLbl.append(bt);
form.append(divCel);
}
}, 'json');
}
function pegaArquivos(obj, idPasta){
$.post('ajax/?s=49&cod=' + $('#cod').val(), {'id' : idPasta}, function(data){
var res = $(data);
var a = $(obj);
var li = a.parent();
li.html('');
li.append(a);
li.append(res);
}, 'html');
}
function mesmoEndereco(){
$('#logradouro_cob').val($('#logradouro').val());
$('#numero_cob').val($('#numero').val());
$('#bairro_cob').val($('#bairro').val());
$('#complemento_cob').val($('#complemento').val());
$('#uf_cob').val($('#uf').val());
$('#cidade_cob').html($('#cidade').html()).val($('#cidade').val());
$('#cep_cob').val($('#cep').val());
}
function seleciona(doc, valor){
doc.value = valor;
}
function isNumero(event){
var tecla = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
if((tecla > 47 && tecla < 58) || (tecla > 95 && tecla < 106)) return true;
else{
if(tecla != 8) return false;
else return true;
}
}
function isBackSpace(event){
var tecla = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
if(tecla != 8) return false;
else return true;
}
function mascaraNumero(mascara, doc, e){
if(!isBackSpace(e)){
var saida = '';
for(var i = 0; i < doc.value.length; i++){
var t = parseInt(doc.value.substr(i, 1));
if(t || t == 0){
saida += doc.value.substr(i, 1);
}
}
var pos = new Array();
var p = 0;
for(var i = 0; i < mascara.length; i++){
if(mascara.substr(i, 1) != '#'){
pos[p] = i;
p++;
}
}
if(saida.length > 0){
var s = 0;
var saida2 = '';
p = 0;
for(var i = 0; i < mascara.length; i++){
if(s <= saida.length){
if(pos[p] == i){
saida2 += mascara.substr(i, 1);
p++;
}else{
saida2 += saida.substr(s, 1);
s++;
}
}
}
doc.value = saida2;
}else{
doc.value = saida;
}
}
}
function validaCnpj(doc){
var numeros, digitos, soma, i, resultado, pos, tamanho, res, digitos_iguais;
var valor = removeSeparador(doc.value);
digitos_iguais = 1;
if (valor.length < 14) {
alert('CNPJ digitado nao esta correto!');
doc.value = '';
return false;
}
for (i = 0; i < valor.length - 1; i++)
if (valor.charAt(i) != valor.charAt(i + 1)){
digitos_iguais = 0;
break;
}
if(!digitos_iguais){
tamanho = valor.length - 2;
numeros = valor.substring(0,tamanho);
digitos = valor.substring(tamanho);
soma = 0;
pos = tamanho - 7;
for (i = tamanho; i >= 1; i--)
{
soma += numeros.charAt(tamanho - i) * pos--;
if (pos < 2)
pos = 9;
}
resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
if (resultado != digitos.charAt(0)) {
alert('CNPJ digitado nao esta correto!');
doc.value = '';
return false;
}
tamanho = tamanho + 1;
numeros = valor.substring(0,tamanho);
soma = 0;
pos = tamanho - 7;
for (i = tamanho; i >= 1; i--)
{
soma += numeros.charAt(tamanho - i) * pos--;
if (pos < 2)
pos = 9;
}
resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
if (resultado != digitos.charAt(1)) {
alert('CNPJ digitado nao esta correto!');
doc.value = '';
return false;
}
return true;
}else{
alert('CNPJ digitado nao esta correto!');
doc.value = '';
return false;
}
}
function validaCpf_(doc){
cpf = removeSeparador(doc.value);
if(cpf.length != 11)return false;
if(cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")return false;
var num = new Array();
var inv = new Array();
var mult = 0;
var cont = 0;
var resto = 0;
for(var i = 0; i < 9; i++)num[i] = cpf.charAt(i);
for(var i = 10; i >= 2; i--){
inv[cont] = i;
cont++;
}
for(var i = 0; i < 9; i++)mult += (num[i] * inv[i]);
resto = mult % 11;
num[9] = 0;
if(resto >= 2)num[9] = 11 - resto;
cont = 0;
for(var i = 11; i >= 2; i--){
inv[cont] = i;
cont++;
}
mult = 0;
for(var i = 0; i < 10; i++)mult += (num[i] * inv[i]);
resto = mult % 11;
num[10] = 0;
if(resto >= 2)num[10] = 11 - resto;
var cpf1 = "";
for(var i = 0; i < 11; i++)cpf1 += num[i];
if(cpf == cpf1)return true;
return false;
}
function validaCpf(doc){
if(!validaCpf_(doc)){
alert('O CPF digitado nao esta correto!');
doc.value = '';
return false;
}
return true;
}
function removeSeparador(str){
return str.replace(/[^0-9]/g, '');
}
function validaFormulario(form){
var retorna = true;
var inputs = form.getElementsByTagName('input');
var selects = form.getElementsByTagName('select');
var texts = form.getElementsByTagName('textarea');
for(var i = 0; i < inputs.length; i++){
if(inputs[i].className.search(/[*]/) >= 0){
if((inputs[i].type == 'text' || inputs[i].type == 'password') && inputs[i].value == ''){
retorna = false;
inputs[i].className = 'campo_obrig *';
}
if((inputs[i].type == 'text' || inputs[i].type == 'password') && inputs[i].value != ''){
inputs[i].className = 'campo *';
}
}
}
for(var j = 0; j < selects.length; j++){
if(selects[j].className.search(/[*]/) >= 0){
if(selects[j].value == 0 || selects[j].value == ''){
retorna = false;
selects[j].className = 'campo_obrig select *';
}else{
selects[j].className = 'campo select *';
}
}
}
for(var k = 0; k < texts.length; k++){
if(texts[k].className.search(/[*]/) >= 0){
if(texts[k].value == ''){
retorna = false;
texts[k].className = 'campo_obrig *';
}else{
texts[k].className = 'campo *';
}
}
}
if(!retorna)
alert('Por favor, preencha os campos destacados em laranja!');
return retorna;
}
function validaSenha(docSenha, docSenha2){
if(docSenha.value != docSenha2.value){
alert('Por favor, digite a mesma senha nos dois campos!');
docSenha2.value = '';
}
}
function abilitaSenha2(doc, docSenha2){
if(doc.value != ''){
docSenha2.disabled = false;
}else{
docSenha2.disabled = true;
docSenha2.value = '';
}
}
function qualidadeSenha(doc){
var senha = doc.value.substr(0, 8);
var pontos = 0;
var req = 0;
pontos += senha.length * 4;
var n = senha.match(/[A-Z]/g);
var m = senha.match(/[a-zA-Z]/g);
if(n != null){
if(m != null){
if(m.length < senha.length)
pontos += (senha.length - n.length) * 2;
}
}
n = senha.match(/[a-z]/g);
m = senha.match(/[a-zA-Z]/g);
if(n != null){
if(m != null){
if(m.length < senha.length)
pontos += (senha.length - n.length) * 2;
}
}
n =  senha.match(/[0-9]/g);
if(n != null){
if(n.length < senha.length)
pontos += n.length * 4;
}
n = senha.match(/[^a-zA-z0-9]/g);
if(n != null)
pontos += n.length * 6;
var num = 0;
for(var i = 0; i < senha.length; i++){
n = senha.substr(i, 3).match(/(.[^a-zA-Z0-9].|.[0-9].)/);
if(n != null){
num++;
}
}
pontos += num * 2;
if(senha.length >= 8)
req++;
n = senha.match(/[A-Z]/g);
if(n != null)
req++;
n = senha.match(/[a-z]/g);
if(n != null)
req++;
n = senha.match(/[0-9]/g);
if(n != null)
req++;
n = senha.match(/[^a-zA-z0-9]/);
if(n != null)
req++;
if(req > 3)
pontos += req * 2;
n = senha.match(/[a-zA-Z]/g);
if(n != null){
if(n.length == senha.length)
pontos -= senha.length;
}
n = senha.match(/[0-9]/g);
if(n != null){
if(n.length == senha.length)
pontos -= senha.length;
}
var rep = 0;
for(var i = 0; i < senha.length; i++){
for(var j = 0; j < senha.length; j++){
if(j != i && senha.substr(i, 1) == senha.substr(j, 1)){
rep++;
}
}
}
pontos -= rep * (rep - 1);
var mai = 0;
for(var i = 0; i < senha.length; i++){
n = senha.substr(i, 2).match(/[A-Z][A-Z]/);
if(n != null){
mai++;
}
}
pontos -= mai * 2;
var mai = 0;
for(var i = 0; i < senha.length; i++){
n = senha.substr(i, 2).match(/[a-z][a-z]/);
if(n != null){
mai++;
}
}
pontos -= mai * 2;
var mai = 0;
for(var i = 0; i < senha.length; i++){
n = senha.substr(i, 2).match(/[0-9][0-9]/);
if(n != null){
mai++;
}
}
pontos -= mai * 2;
var seq = 0;
for(var i = 0; i < senha.length; i++){
n = senha.substr(i, 3).match(/[a-zA-Z]{3}/);
if(n != null){
if(((n[0].charCodeAt(2) - n[0].charCodeAt(1)) == 1 && (n[0].charCodeAt(1) - n[0].charCodeAt(0)) == 1) || ((n[0].charCodeAt(2) - n[0].charCodeAt(1)) == -1 && (n[0].charCodeAt(1) - n[0].charCodeAt(0)) == -1)){
seq++;
}
}
}
pontos -= seq * 3;
seq = 0;
for(var i = 0; i < senha.length; i++){
n = senha.substr(i, 3).match(/[0-9]{3}/);
if(n != null){
if(((n[0].substr(2, 1) - n[0].substr(1, 1)) == 1 && (n[0].substr(1, 1) - n[0].substr(0, 1)) == 1) || ((n[0].substr(2, 1) - n[0].substr(1, 1)) == -1 && (n[0].substr(1, 1) - n[0].substr(0, 1)) == -1)){
seq++;
}
}
}
pontos -= seq * 3;
if(pontos >= 100)
return 100;
else if(pontos < 100 && pontos > 0)
return (pontos / 102) * 100;
else
return 0;
}
function testaSenha(doc, divResultado){
var q = qualidadeSenha(doc);
divResultado.className = 'teste_senha';
if(q >= 0 && q < 20){
divResultado.innerHTML = 'Muito Fraca';
}
if(q >= 20 && q < 40){
divResultado.innerHTML = 'Fraca';
}
if(q >= 40 && q < 60){
divResultado.innerHTML = 'Boa';
}
if(q >= 60 && q < 80){
divResultado.innerHTML = 'Forte';
}
if(q >= 80){
divResultado.innerHTML = 'Muito Forte';
}
if(doc.value.length == 0){
divResultado.innerHTML = 'Muito Curta';
}
divResultado.style.backgroundPosition = '-' + ((800 - divResultado.offsetWidth) * q / 100) + 'px';
}
function monitorar(doc, idTerminal, cidade, estado, rua, numero, salvar, botao){
var m = new Mapa(doc, false, botao);
if(cidade != '' && estado != '' && rua != '' && rua != ',' && numero != '' && numero != '0'){
m.codeAddress(idTerminal, cidade, estado, rua, numero, salvar);
}else{
new JanelaEndereco(document.body, m, idTerminal, botao);
}
}
function editaCategoria(id){
$('#cat_' + id).css({display : 'none'});
$('#ipt_cat_' + id).css({display : 'inline'});
$('#bt_cat_' + id).css({display : 'inline'});
$('#cc_cat_' + id).css({display : 'inline'});
}
function cancelaEditaCategoria(id){
$('#cat_' + id).css({display : 'inline'});
$('#ipt_cat_' + id).css({display : 'none'});
$('#bt_cat_' + id).css({display : 'none'});
$('#cc_cat_' + id).css({display : 'none'});
}
function validaFormularioUsuario(form){
if(validaSenhaCDP(document.getElementById('senha').value) || document.getElementById('senha').value == ''){
return validaFormulario(form);
}
alert('ATENCAO! A nova senha deve ter, no minimo, seis caracteres e conter letras e numeros.');
return false;
}
function numeroDecimal(casasDecimais, doc){
var valor = removeSeparador(doc.value);
var zeros = '';
while(valor.substr(0, 1) == '0'){
valor = valor.substr(1);
}
for(var i = 0; i < 3 - valor.length; i++){
zeros += '0';
}
valor = zeros + '' + valor;
doc.value = valor.substr(0, valor.length - 2) + ',' + valor.substr(valor.length - 2);
}
function validaSenhaCDP(senha){
if(senha.match(/[0-9]/g) === null)
return false;
if(senha.match(/[a-zA-Z]/g) === null)
return false;
if(senha.length < 6)
return false;
return true;
}
