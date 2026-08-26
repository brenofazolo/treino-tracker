(function(){
'use strict';

var VARIANTS={
'Supino inclinado máquina':['Máquina inclinada','Banco inclinado + halteres','Banco inclinado + barra','Smith inclinado'],
'Supino reto halteres':['Banco reto + halteres','Máquina chest press','Barra livre','Smith reto'],
'Crucifixo máquina':['Peck deck / máquina','Polia / crossover','Halteres no banco'],
'Paralelas assistidas / mergulho máquina':['Paralelas assistidas','Mergulho na máquina','Paralelas livres'],
'Tríceps corda':['Polia alta + corda','Polia alta + barra','Máquina de tríceps'],
'Tríceps unilateral polia':['Polia alta unilateral','Polia baixa unilateral'],
'Puxada frente pegada aberta':['Polia alta pegada aberta','Máquina articulada'],
'Remada baixa triângulo':['Polia baixa + triângulo','Máquina remada sentada'],
'Remada articulada unilateral':['Máquina articulada unilateral','Polia unilateral'],
'Pulldown braço estendido':['Polia alta + barra','Polia alta + corda'],
'Rosca Scott máquina':['Máquina Scott','Banco Scott + barra W','Banco Scott + halter'],
'Rosca martelo corda':['Polia + corda','Halteres'],
'Leg Press':['Leg press 45°','Leg press horizontal','Leg press vertical'],
'Mesa flexora':['Mesa flexora deitada','Flexora sentada'],
'Cadeira extensora':['Cadeira extensora','Máquina unilateral'],
'Cadeira abdutora':['Cadeira abdutora','Polia / miniband'],
'Panturrilha sentado':['Máquina sentado','Banco + carga livre'],
'Desenvolvimento na máquina':['Máquina desenvolvimento','Banco + halteres','Smith sentado','Barra livre sentado'],
'Elevação lateral na máquina':['Máquina lateral','Halteres','Polia unilateral'],
'Remada com peito apoiado, cotovelos mais abertos':['Máquina com peito apoiado','Banco inclinado + halteres','T-bar com apoio'],
'Elevação lateral unilateral na polia':['Polia baixa unilateral','Halter unilateral'],
'Abdominal no cabo':['Polia alta','Máquina abdominal'],
'Prancha':['Solo antebraços','Solo mãos','Com carga'],
'Supino inclinado':['Banco inclinado + halteres','Banco inclinado + barra','Máquina inclinada','Smith inclinado'],
'Remada baixa':['Polia baixa','Máquina remada sentada'],
'Desenvolvimento':['Máquina desenvolvimento','Banco + halteres','Smith sentado','Barra livre sentado'],
'Rosca direta':['Barra reta','Barra W','Polia','Halteres'],
'Elevação lateral':['Halteres','Máquina lateral','Polia unilateral']
};

function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function variantsFor(name){return VARIANTS[name]||['Máquina','Polia','Halteres','Barra / Smith','Banco / peso livre'];}
function logoHtml(){return '<div class="lt-lockup"><img src="./lances-tech-logo.png" alt="LANCES TECH — Tecnologia, Processos e Estratégia"></div>'}
function installCss(){if(document.getElementById('maleEnhCss'))return;var s=document.createElement('style');s.id='maleEnhCss';s.textContent='header .top{align-items:flex-start;gap:10px}.lt-lockup{display:flex;align-items:center;gap:9px;min-width:0}.lt-lockup svg{width:46px;height:31px;flex:0 0 auto;filter:drop-shadow(0 2px 3px #0005)}.lt-words{line-height:1}.lt-lances{font-weight:900;letter-spacing:.08em;font-size:17px}.lt-tech{font-weight:900;letter-spacing:.12em;color:#e84a8a;font-size:12px}.lt-words small{display:block;margin-top:5px;font-size:6px;letter-spacing:.08em;opacity:.75;white-space:nowrap}.app-id{text-align:right;font-size:10px;opacity:.82;line-height:1.35}.variant-box{margin-top:8px;padding:8px 9px;background:#f2f4f7;border-radius:10px}.variant-box label{display:block;font-size:9px;color:#737984;margin-bottom:4px}.variant-box select{width:100%;padding:8px;border:1px solid #d8dce2;border-radius:8px;background:white;font-size:12px}.previous-variant{margin-top:4px;font-size:10px;color:#737984}.modal#timerModal{background:transparent;pointer-events:none;align-items:flex-end;padding-bottom:78px}.modal#timerModal.show{display:flex}.modal#timerModal .sheet{pointer-events:auto;width:min(460px,calc(100% - 24px));border-radius:16px;padding:10px 12px;box-shadow:0 8px 28px #0003;border:1px solid #d8dce2;display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:center}.modal#timerModal .sheet .title{font-size:12px}.modal#timerModal .clock{font-size:28px;line-height:1}.modal#timerModal .primary{width:auto;padding:8px 10px;font-size:11px}.timer-hint{font-size:9px;color:#737984}.history-variant{margin-top:4px;font-size:10px;color:#737984}';document.head.appendChild(s)}
function brandHeader(){var top=document.querySelector('header .top');if(!top||top.dataset.branded)return;top.dataset.branded='1';top.innerHTML=logoHtml()+'<div class="app-id"><b>Treino Tracker</b><br>V1.03</div>';}
function setVariant(i,v){var st=state(selectedDay,i);st.variant=v;save();}
window.setExerciseVariant=setVariant;
function previousVariant(dayName,i){var p=previous(dayName);return p&&p.ex&&p.ex[i]&&p.ex[i].variant?p.ex[i].variant:'';}
function applyVariants(){if(typeof workouts==='undefined'||typeof selectedDay==='undefined'||!workouts[selectedDay])return;var nodes=document.querySelectorAll('.exercise');nodes.forEach(function(node,i){if(node.querySelector('.variant-box'))return;var item=workouts[selectedDay].items[i];if(!item)return;var st=state(selectedDay,i),opts=variantsFor(item[0]),pv=previousVariant(selectedDay,i);var box=document.createElement('div');box.className='variant-box';var options='<option value="">Selecione a execução / equipamento</option>'+opts.map(function(v){return '<option value="'+esc(v)+'" '+(st.variant===v?'selected':'')+'>'+esc(v)+'</option>'}).join('')+'<option value="Outro" '+(st.variant==='Outro'?'selected':'')+'>Outro</option>';box.innerHTML='<label>Execução / equipamento</label><select onchange="setExerciseVariant('+i+',this.value)">'+options+'</select>'+(pv?'<div class="previous-variant">Anterior: <b>'+esc(pv)+'</b></div>':'');var hdr=node.querySelector('.exrow');if(hdr)hdr.insertAdjacentElement('afterend',box);});}
function wrapRender(){if(typeof renderWorkout!=='function'||window.__maleEnhRender)return;var orig=renderWorkout;renderWorkout=function(){orig.apply(this,arguments);setTimeout(function(){brandHeader();applyVariants();},0)};window.__maleEnhRender=true;}
function wrapHistory(){if(typeof historyDetail!=='function'||window.__maleEnhHistory)return;var orig=historyDetail;historyDetail=function(k){orig.apply(this,arguments);try{var s=data.sessions[k],cards=document.querySelectorAll('#main .card .history-item');cards.forEach(function(node,i){var v=s&&s.ex&&s.ex[i]&&s.ex[i].variant;if(v){var d=document.createElement('div');d.className='history-variant';d.innerHTML='Execução / equipamento: <b>'+esc(v)+'</b>';node.appendChild(d);}})}catch(e){}};window.__maleEnhHistory=true;}
function enhanceTimer(){var sheet=document.querySelector('#timerModal .sheet');if(sheet&&!sheet.querySelector('.timer-hint')){var h=document.createElement('div');h.className='timer-hint';h.textContent='Você pode continuar navegando enquanto o descanso roda.';var title=sheet.querySelector('.title');if(title)title.appendChild(h)}}
installCss();brandHeader();wrapRender();wrapHistory();enhanceTimer();applyVariants();
})();