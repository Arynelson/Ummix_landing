(function(){
  /* ===== Tabela comercial Ummix (Tabelas Comerciais de Rádio e TV; pré-roll e Matéria Patrocinada definidos pelo Edy em 24/11/2026) ===== */
  var CFG={
    materia:{nome:"Matéria Patrocinada",icon:"__ICON_sinal_branco__",cpm:100,unidade:"visualizações",dur:false,test:false,praca:false,freq:null},
    preroll:{nome:"Pré-roll",icon:"__ICON_video_branco__",cpm:133.34,unidade:"exibições",dur:true,test:false,praca:false,freq:{min:1,max:10,def:3,lbl:"Exibições por pessoa (frequência)"}},
    radio:{nome:"Rádio",icon:"__ICON_radio_branco__",cpm:30,unidade:"impactos",dur:true,test:true,praca:true,freq:{min:7,max:120,def:66,lbl:"Frequência total (inserções por pessoa)"}},
    tv:{nome:"Televisão",icon:"__ICON_tv_branco__",cpm:112,unidade:"impactos",dur:true,test:true,praca:true,freq:{min:7,max:120,def:66,lbl:"Frequência total (inserções por pessoa)"}}
  };
  var DUR={7:.5,15:.7,30:1,45:1.3,60:1.5};
  var PRACAS=["Goiânia, GO","Aparecida de Goiânia, GO","Anápolis, GO","Rio Verde, GO","Jataí, GO","Quirinópolis, GO","São Paulo, SP"];
  var SN=["Sim","Não"],STN=["Sim","Talvez","Não"],AD=["Aprova","Desaprova"];
  /* Filtros: plataforma Ummix (opções reais, wizard passo 3) + Tableau (Painel de Comunicação Rádio e TV).
     Cada filtro com ao menos uma opção marcada = +10% no CPM. Opções marcadas com * vêm só do Tableau e ainda são aproximadas. */
  var GRUPOS=[
    ["Quando e onde",[
      ["ciclo","Ciclo*",["Segunda a sexta","Sábado","Domingo"]],
      ["regiao","Região da cidade*",["Centro","Norte","Sul","Leste","Oeste"]],
      ["onde","Onde consome mídia",["Carro","Casa","Trabalho","No transporte público","Outro"]],
      ["conteudo","Preferência de conteúdo",["Esportes","Religião","Jornalismo / Informação","Música","Propaganda","Outros"]]
    ]],
    ["Perfil e trabalho",[
      ["sexo","Sexo",["Masculino","Feminino"]],
      ["idade","Faixa etária",["15 a 20","21 a 24","25 a 29","30 a 34","35 a 39","40 a 44","45 a 49","50 a 54","55 a 59","Mais de 60"]],
      ["escolaridade","Escolaridade",["Analfabeto","Ensino Fundamental","Ensino Médio","Ensino Superior"]],
      ["religiao","Religião",["Católica","Evangélica","Espiritualista","Outras"]],
      ["cor","Cor/raça",["Branca","Parda","Preta","Amarela"]],
      ["renda","Renda familiar",["Até R$ 1.500","R$ 1.501 a R$ 3.000","R$ 3.001 a R$ 7.600","R$ 7.601 a R$ 10.600","R$ 10.601 a R$ 15.200","R$ 15.201 a R$ 22.800","Acima de R$ 22.801"]],
      ["ocupacao","Ocupação",["Empregado do setor privado","Autônomo ou profissional liberal","Empregador","Empregado do setor público","Aposentado e pensionista","Estudante","Do lar ou trabalhador doméstico"]],
      ["area","Área de atuação profissional",["Comércio e Serviços","Negócios e Administração","Saúde","Agro e Produtores Rurais","Educação","Segurança e Serviço Público","Tecnologia e Inovação","Engenharia e Arquitetura","Cultura, Comunicação e Entretenimento","Direito"]],
      ["receita","Receita anual da empresa",["Até R$ 81 mil (MEI)","R$ 81 mil a 360 mil (ME)","R$ 360 mil a 4,8 mi (EPP)","R$ 4,8 mi a 30 mi (média)","R$ 30 mi a 300 mi (média-grande)"]],
      ["filhos","Possui filhos?",SN],
      ["fora","Trabalha ou estuda fora da cidade?",SN],
      ["ufnasc","UF de nascimento*",["GO","SP","MG","BA","DF","Outra"]],
      ["cidnasc","Cidade de nascimento*",["Nasceu na cidade","Veio de outra cidade"]]
    ]],
    ["Política",[
      ["campo","Campo político*",["Esquerda","Centro","Direita"]],
      ["federal","Aprovação da gestão federal",AD],
      ["estadual","Aprovação da gestão estadual",AD],
      ["prefeito","Aprovação da gestão municipal*",AD],
      ["camara","Aprovação da Câmara Municipal",AD]
    ]],
    ["Seguro e saúde",[
      ["plano","Possui plano de saúde?",SN],
      ["estetica","Pretende procedimento estético",STN],
      ["atividade","Pratica atividades físicas?",SN],
      ["seguroauto","Possui seguro de automóvel?",SN],
      ["seguro","Tipo de seguro*",["Automóvel","Vida","Residencial"]]
    ]],
    ["Mercado de consumo",[
      ["pet","Possui animais de estimação?",SN],
      ["credito","Restrição de crédito*",["Nome limpo","Com restrição"]],
      ["eletronico","Pretende comprar eletrônico",STN],
      ["viajar","Pretende viajar",STN],
      ["investir","Hábito de investir",SN],
      ["doacoes","Faz doações*",SN],
      ["curso","Pretende iniciar um curso",STN],
      ["energia","Tipo de energia residencial",["Da distribuidora","Painel solar","Eólica","Outros"]]
    ]],
    ["Automóvel",[
      ["compraauto","Pretende comprar automóvel",STN],
      ["tipoauto","Tipo de automóvel*",["Carro","Moto","Caminhonete/SUV"]],
      ["valorauto","Valor do automóvel*",["Até R$ 50 mil","R$ 50 a 100 mil","R$ 100 a 200 mil","Acima de R$ 200 mil"]]
    ]],
    ["Imóvel",[
      ["compraimovel","Pretende comprar imóvel",STN],
      ["reforma","Pretende construir ou reformar",STN],
      ["tipoimovel","Tipo de imóvel*",["Casa","Apartamento","Lote","Comercial"]],
      ["valorimovel","Valor do imóvel*",["Até R$ 300 mil","R$ 300 a 600 mil","R$ 600 mil a 1 mi","Acima de R$ 1 mi"]]
    ]],
    ["Agro",[
      ["agro","Possui relação com agronegócio?",SN],
      ["modagro","Modalidade agro*",["Agricultura","Pecuária","Agroindústria","Insumos e máquinas"]]
    ]]
  ];
  var F_GENERO_EMISSORA=["Música","Notícia","Esporte","Religioso","Popular/sertanejo"];
  var F_HORARIO=["Manhã","Tarde","Noite","Madrugada"];
  var F_EDITORIA=["Economia","Agro","Esporte","Saúde","Entretenimento","Política local","Negócios","Educação"];

  var $=function(id){return document.getElementById(id)};
  var state={fmt:"radio",cities:["Goiânia, GO"]};
  var BR=null,VEIC=[];
  function brl(n,d){return n.toLocaleString("pt-BR",{style:"currency",currency:"BRL",minimumFractionDigits:d||0,maximumFractionDigits:d||0})}
  function num(n){return Math.round(n).toLocaleString("pt-BR")}
  function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}

  Object.keys(CFG).forEach(function(k){
    var d=document.createElement("div");d.className="fmt";
    d.innerHTML='<input type="radio" name="fmt" id="fmt-'+k+'" value="'+k+'"'+(k===state.fmt?" checked":"")+'><label for="fmt-'+k+'"><img src="'+CFG[k].icon+'" alt=""><span></span></label>';
    d.querySelector("span").textContent=CFG[k].nome;$("fmts").appendChild(d);
  });
  $("fmts").addEventListener("change",function(e){if(e.target.name==="fmt"){state.fmt=e.target.value;setupFormat();}});

  function renderPracas(){
    var box=$("citiesPraca");box.innerHTML="";
    PRACAS.forEach(function(c,i){
      var d=document.createElement("div");d.className="chip";
      d.innerHTML='<input type="checkbox" id="pc'+i+'"'+(state.cities.indexOf(c)>=0?" checked":"")+'><label for="pc'+i+'"></label>';
      d.querySelector("label").textContent=c+(c==="São Paulo, SP"?" (em abertura)":"");
      d.querySelector("input").addEventListener("change",function(e){
        if(e.target.checked){if(state.cities.indexOf(c)<0)state.cities.push(c)}else{state.cities=state.cities.filter(function(x){return x!==c})}calc();});
      box.appendChild(d);
    });
  }
  function renderCityChips(){
    var box=$("cityChips");box.innerHTML="";
    state.cities.forEach(function(c){
      var s=document.createElement("span");s.className="city-chip";s.textContent=c;
      var b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Remover "+c);b.textContent="×";
      b.addEventListener("click",function(){state.cities=state.cities.filter(function(x){return x!==c});renderCityChips();calc();});
      s.appendChild(b);box.appendChild(s);
    });
  }
  function norm(s){return s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()}
  var sugg=$("citySugg"),inp=$("citySearch"),active=-1,results=[];
  function showSugg(){
    var q=norm(inp.value.trim());
    if(!BR||q.length<2){sugg.hidden=true;inp.setAttribute("aria-expanded","false");return}
    results=BR.filter(function(c){return norm(c).indexOf(q)===0}).concat(BR.filter(function(c){var n=norm(c);return n.indexOf(q)>0})).slice(0,8);
    sugg.innerHTML="";active=-1;
    results.forEach(function(c,i){var li=document.createElement("li");li.setAttribute("role","option");li.id="sg"+i;li.textContent=c;li.addEventListener("mousedown",function(e){e.preventDefault();pick(c)});sugg.appendChild(li)});
    sugg.hidden=!results.length;inp.setAttribute("aria-expanded",results.length?"true":"false");
  }
  function pick(c){if(state.cities.indexOf(c)<0)state.cities.push(c);inp.value="";sugg.hidden=true;inp.setAttribute("aria-expanded","false");renderCityChips();calc();}
  inp.addEventListener("input",showSugg);
  inp.addEventListener("keydown",function(e){
    if(sugg.hidden)return;var lis=sugg.children;
    if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();active=(active+(e.key==="ArrowDown"?1:-1)+lis.length)%lis.length;
      for(var i=0;i<lis.length;i++)lis[i].setAttribute("aria-selected",i===active?"true":"false");inp.setAttribute("aria-activedescendant","sg"+active);}
    else if(e.key==="Enter"){e.preventDefault();if(results[active>=0?active:0])pick(results[active>=0?active:0]);}
    else if(e.key==="Escape"){sugg.hidden=true;}
  });
  inp.addEventListener("blur",function(){setTimeout(function(){sugg.hidden=true},120)});
  fetch("cidades.json").then(function(r){return r.json()}).then(function(d){BR=d}).catch(function(){BR=PRACAS.slice()});
  fetch("veiculos.json").then(function(r){return r.json()}).then(function(d){VEIC=d;calc()}).catch(function(){});

  function selectFld(id,label,opts){
    return '<div class="fld"><label for="f-'+id+'">'+label+'</label><select id="f-'+id+'" data-f="'+id+'">'+opts.map(function(o,i){return '<option value="'+i+'">'+o+'</option>'}).join("")+'</select></div>';
  }
  function chipGrp(id,label,opts){
    return '<div class="grp"><span>'+label+'</span><div class="chips">'+opts.map(function(o,i){return '<div class="chip"><input type="checkbox" id="c-'+id+i+'" data-c="'+id+'"><label for="c-'+id+i+'">'+o+'</label></div>'}).join("")+'</div></div>';
  }
  function multiGrp(id,label,opts,gi){
    return '<div class="grp"><span>'+label.replace("*","")+'</span><div class="chips">'+opts.map(function(o,i){return '<div class="chip"><input type="checkbox" id="m-'+id+i+'" data-m="'+id+'" data-g="'+gi+'"><label for="m-'+id+i+'">'+o+'</label></div>'}).join("")+'</div></div>';
  }
  function setupFormat(){
    var c=CFG[state.fmt],h="";
    if(c.praca){state.cities=state.cities.filter(function(x){return PRACAS.indexOf(x)>=0});if(!state.cities.length)state.cities=["Goiânia, GO"];}
    $("citiesPraca").hidden=!c.praca;$("citiesBr").hidden=c.praca;
    if(c.praca)renderPracas();else renderCityChips();
    if(state.fmt==="radio"||state.fmt==="tv"){
      h+='<div class="row2">'+selectFld("dur","Duração da peça",["7 segundos","15 segundos","30 segundos","45 segundos","60 segundos"])+'<div class="fld"><span>Formato</span><label class="check"><input type="checkbox" id="f-test"> Testemunhal (+100%)</label></div></div>';
      GRUPOS.forEach(function(g,gi){
        var fs=g[1];
        h+='<details class="fgrp"'+(gi<1?" open":"")+'><summary>'+g[0]+'<em data-g="'+gi+'"></em></summary><div class="in1">'+fs.map(function(f){return multiGrp(f[0],f[1],f[2],gi)}).join("")+'</div></details>';
      });
    }else if(state.fmt==="preroll"){
      h+='<div class="row2">'+selectFld("tipo","Formato",["Áudio (streaming das rádios)","Vídeo (streaming das TVs)"])+selectFld("dur","Duração",["15 segundos","30 segundos"])+'</div>';
      h+=chipGrp("gen","Gênero da emissora",F_GENERO_EMISSORA);
      h+=chipGrp("hor","Faixa horária",F_HORARIO);
    }else{
      h+=chipGrp("edi","Editoria / interesse",F_EDITORIA);
    }
    $("filters").innerHTML=h;
    var d=$("f-dur");if(d)d.value=state.fmt==="preroll"?"1":"2";
    var fw=$("freqWrap"),fr=$("simFreq");
    if(c.freq){fw.hidden=false;fr.min=c.freq.min;fr.max=c.freq.max;fr.value=c.freq.def;}else fw.hidden=true;
    calc();
  }
  $("filters").addEventListener("change",calc);
  $("simVerba").addEventListener("input",calc);
  $("simFreq").addEventListener("input",calc);
  $("simForm").addEventListener("submit",function(e){e.preventDefault()});

  function countFilters(){
    var n=0,keys=[],perG={};
    document.querySelectorAll("#filters select[data-f]").forEach(function(s){
      if(s.dataset.f!=="dur"&&s.dataset.f!=="tipo"&&s.value!=="0"){n++;keys.push(s.dataset.f+s.value);if(s.dataset.g)perG[s.dataset.g]=(perG[s.dataset.g]||0)+1}});
    var multi={};document.querySelectorAll("#filters input[data-m]:checked").forEach(function(i){if(!multi[i.dataset.m]){multi[i.dataset.m]=1;n++;perG[i.dataset.g]=(perG[i.dataset.g]||0)+1}keys.push(i.id)});
    var groups={};document.querySelectorAll("#filters input[data-c]:checked").forEach(function(i){groups[i.dataset.c]=1;keys.push(i.id)});
    n+=Object.keys(groups).length;
    document.querySelectorAll(".fgrp summary em").forEach(function(e){var k=perG[e.dataset.g];e.textContent=k?k+(k>1?" filtros":" filtro"):""});
    return {n:n,key:keys.join("|")};
  }

  function vehicles(c,f){
    var tipo=state.fmt==="tv"?"tv":state.fmt==="radio"?"radio":($("f-tipo")&&$("f-tipo").value==="1"?"tv":"radio");
    if(state.fmt==="materia")tipo=null;
    var pool=VEIC.filter(function(v){return !tipo||v.t===tipo});
    var out=[];
    state.cities.forEach(function(city){
      var isPraca=PRACAS.indexOf(city)>=0&&city!=="São Paulo, SP";
      var base=Math.max(2,6-Math.floor(f.n/3));
      for(var i=0;i<base;i++){
        var h=hash(city+"|"+state.fmt+"|"+f.key+"|"+i);
        if(isPraca&&pool.length){
          var v=pool[h%pool.length];
          if(out.some(function(o){return o.n===v.n}))continue;
          out.push({n:v.n,img:v.img,city:city,t:v.t,o:h});
        }else{
          var nm=state.fmt==="materia"?"Portal de notícias "+(i+1):(tipo==="tv"?"TV local "+(i+1):"Rádio local "+(i+1));
          out.push({n:nm,img:null,city:city,t:tipo||"portal",o:h});
        }
      }
    });
    out.sort(function(a,b){return a.o-b.o});
    return out;
  }

  function calc(){
    var c=CFG[state.fmt],verba=+$("simVerba").value;$("simVerbaTxt").textContent=brl(verba);
    var f=countFilters();
    var durSel=$("f-dur"),dur=30;
    if(durSel){dur=state.fmt==="preroll"?[15,30][+durSel.value]:[7,15,30,45,60][+durSel.value];}
    var fator=c.dur?DUR[dur]:1;
    var test=$("f-test")&&$("f-test").checked?2:1;
    var cpm=c.cpm*(1+.1*f.n)*fator*test;
    var imp=verba/cpm*1000;
    var freq=c.freq?+$("simFreq").value:1;
    if(c.freq)$("freqLbl").innerHTML=c.freq.lbl+': <b class="big">'+freq+'</b>';
    var pessoas=imp/freq;
    $("outFmt").textContent=c.nome;
    var cs=state.cities;
    if(!cs.length){$("outBody").innerHTML='<div class="empty">Escolha pelo menos uma cidade para ver os números.</div>';$("outNote").textContent="";return}
    var html='<div class="kpis">';
    html+='<div class="kpi hl"><span>CPM final</span><strong>'+brl(cpm,2)+'</strong></div>';
    html+='<div class="kpi"><span>'+(state.fmt==="materia"?"Visualizações":c.unidade.charAt(0).toUpperCase()+c.unidade.slice(1))+'</span><strong>'+num(imp)+'</strong></div>';
    if(state.fmt==="materia"){
      html+='<div class="kpi"><span>Custo por visualização</span><strong>'+brl(cpm/1000,2)+'</strong></div>';
      html+='<div class="kpi"><span>Leitores estimados</span><strong>'+num(imp)+'</strong></div>';
    }else{
      html+='<div class="kpi"><span>'+(state.fmt==="preroll"?"Exibições por pessoa":"Inserções estimadas")+'</span><strong>'+num(freq)+'</strong></div>';
      html+='<div class="kpi"><span>Pessoas alcançadas</span><strong>'+num(pessoas)+'</strong></div>';
    }
    html+='</div>';
    var det="CPM base "+brl(c.cpm,2)+(f.n?" + "+f.n+" filtro(s) (+"+(f.n*10)+"%)":" sem filtros")+(c.dur?" · "+dur+'" (×'+String(fator).replace(".",",")+")":"")+(test>1?" · testemunhal (×2)":"");
    html+='<p class="calc">'+det+'</p>';
    var per=verba/cs.length;
    html+='<div class="byc"><table><thead><tr><th>Cidade</th><th>Investimento</th><th>'+(state.fmt==="materia"?"Visualizações":c.unidade)+'</th><th>'+(state.fmt==="materia"?"Leitores":"Pessoas")+'</th></tr></thead><tbody>';
    cs.forEach(function(){html+='<tr><td></td><td>'+brl(per)+'</td><td>'+num(imp/cs.length)+'</td><td>'+num(pessoas/cs.length)+'</td></tr>'});
    html+='</tbody></table></div>';
    var vs=vehicles(c,f),shown=vs.slice(0,9);
    html+='<div class="veic"><h4>'+(state.fmt==="materia"?"Portais onde a matéria pode sair":"Onde a sua campanha pode entrar")+' · exemplo</h4><div class="vgrid">';
    shown.forEach(function(){html+='<div class="vt"></div>'});
    html+='</div>'+(vs.length>shown.length?'<p class="vmore">e mais '+(vs.length-shown.length)+' veículo(s) na plataforma</p>':'')+'</div>';
    $("outBody").innerHTML=html;
    $("mbCpm").textContent=brl(cpm,2);$("mbImp").textContent=num(imp);$("mbPes").textContent=state.fmt==="materia"?num(imp):num(pessoas);$("mbPesL").textContent=state.fmt==="materia"?"Leitores":"Pessoas";$("mbImpL").textContent=state.fmt==="materia"?"Visualizações":c.unidade;$("mbInv").textContent=brl(verba);
    var rows=$("outBody").querySelectorAll("tbody td:first-child");cs.forEach(function(x,i){rows[i].textContent=x+(x==="São Paulo, SP"&&c.praca?" (em abertura)":"")});
    var tiles=$("outBody").querySelectorAll(".vt");
    shown.forEach(function(v,i){
      var t=tiles[i];
      if(v.img){var im=document.createElement("img");im.src=v.img;im.alt=v.n;t.appendChild(im)}else{var p=document.createElement("div");p.className="ph";p.textContent=v.t==="tv"?"TV":v.t==="radio"?"FM":"Portal";t.appendChild(p)}
      var b=document.createElement("b");b.textContent=v.n;t.appendChild(b);
    });
    $("outNote").textContent="Simulação com a tabela comercial da Ummix e verba dividida igualmente entre as cidades. Pessoas alcançadas = impactos ÷ frequência. Os veículos são exemplos ilustrativos; o plano com os veículos e horários de cada cidade é montado pela Ummix na plataforma.";
  }
  var mb=$("mbar"),simSec=$("simulador");
  if("IntersectionObserver" in window){new IntersectionObserver(function(es){mb.classList.toggle("on",es[0].isIntersecting)},{threshold:.05}).observe(simSec)}
  setupFormat();
})();
