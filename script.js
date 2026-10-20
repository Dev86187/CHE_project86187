const $=s=>document.querySelector(s);
const stats=[[80,"%","of wastewater worldwide is discharged without adequate treatment (commonly cited UN estimate)"],[300,"+","toxic industrial contaminants of concern across sectors"],[99,"%","removal of many targets with MBR + advanced oxidation or RO"],[70,"%","of industrial waste dumped untreated in some developing regions (UN)"]];
$("#stats").innerHTML=stats.map((s,i)=>`<div class="stat"><b data-t="${s[0]}">0${s[1]}</b><span>${s[2]}</span></div>`).join("");
document.querySelectorAll("[data-t]").forEach(el=>{const t=+el.dataset.t,suf=el.textContent.replace("0","");let n=0;const id=setInterval(()=>{n+=Math.ceil(t/40);if(n>=t){n=t;clearInterval(id)}el.textContent=n+suf},30)});

const imp=[
{n:"Heavy metals & bioaccumulation",src:"Electroplating, tanneries, batteries, mining, chemicals",pol:["Lead","Mercury","Chromium (VI)","Cadmium","Arsenic"],eff:"Metals accumulate in sediments and tissue, then magnify up the food chain. Methylmercury in predatory fish harms neurological development in humans and wildlife. Cd and Pb damage gills, kidneys and reproduction in fish.",k:[["Fish consumption advisories","Mercury, widespread"],["Biomagnification","Up to millions-fold, Hg"],["Cr(VI) toxicity","Carcinogenic, mutagenic"]]},
{n:"Eutrophication & dead zones",src:"Food processing, fertilizer, dairy, distilleries, pulp and paper",pol:["High BOD/COD","Nitrogen","Phosphorus","Ammonia"],eff:"Nutrient and organic loads fuel algal blooms. When biomass decays, bacteria consume dissolved oxygen, causing hypoxia (below about 2 mg/L) and fish kills. Ammonia is directly toxic to fish.",k:[["Hypoxic threshold","< 2 mg/L dissolved O₂"],["Coastal dead zones","Hundreds worldwide"],["Healthy fish habitat","Typically > 5 mg/L DO"]]},
{n:"Thermal pollution",src:"Power plants, steel, refineries, cooling-water discharge",pol:["Heated effluent","Lower O₂ solubility","Biocides"],eff:"Warm water holds less oxygen while raising fish and invertebrate metabolic demand. Sudden temperature shifts cause thermal shock; sustained warming drives species shifts and favors cyanobacteria.",k:[["O₂ solubility","About 14.6 mg/L at 0 °C vs 8.3 mg/L at 25 °C"],["Typical limit","Often ≤ 3 to 5 °C rise at mixing zone edge"],["Thermal shock","Rapid change can kill fish"]]},
{n:"Persistent toxic chemicals",src:"Textile dyeing, pharma, chemicals, firefighting foams, plastics",pol:["PFAS","Azo dyes","Pharmaceuticals","Phenols","Microplastics"],eff:"Persistent compounds resist biodegradation. Dyes block light and reduce photosynthesis; endocrine-active pharmaceuticals disrupt fish reproduction; PFAS are called forever chemicals and bioaccumulate.",k:[["PFAS limit (US EPA)","4 ng/L, PFOA and PFOS"],["Textile dyeing","Large share of industrial water pollution"],["Endocrine disruption","Observed at ng/L levels"]]}];
$("#impTabs").innerHTML=imp.map((x,i)=>`<button class="tab" role="tab" aria-selected="${i==0}" data-i="${i}">${x.n}</button>`).join("");
function showImp(i){const x=imp[i];$("#impBody").innerHTML=`<p class="kv"><b>Sources:</b> ${x.src}</p><p class="kv"><b>Key pollutants:</b> ${x.pol.map(p=>`<span class="tag">${p}</span>`).join("")}</p><p class="kv"><b>Ecosystem effect:</b> ${x.eff}</p><div class="grid">${x.k.map(k=>`<div class="card"><div class="small">${k[0]}</div><b>${k[1]}</b></div>`).join("")}</div>`;document.querySelectorAll("#impTabs .tab").forEach((t,j)=>t.setAttribute("aria-selected",j==i))}
$("#impTabs").onclick=e=>{if(e.target.dataset.i!=null)showImp(+e.target.dataset.i)};showImp(0);

const hab={h:`<h3>Healthy habitat</h3><ul><li>Dissolved oxygen 6 to 9 mg/L</li><li>BOD under 3 mg/L, clear water, pH 6.5 to 8.5</li><li>Diverse macroinvertebrates, sensitive fish species present</li><li>Balanced plankton and rooted vegetation</li></ul>`,p:`<h3>Polluted habitat</h3><ul><li>Dissolved oxygen under 2 mg/L (hypoxia)</li><li>BOD above 20 mg/L, turbid or colored water</li><li>Only tolerant species such as sludge worms and midge larvae</li><li>Algal blooms, fish kills, metals in sediment</li></ul>`};
function hb(k){$("#habitat").className="habitat "+(k=="h"?"healthy":"polluted");$("#habitat").innerHTML=hab[k];$("#hBtn").setAttribute("aria-selected",k=="h");$("#pBtn").setAttribute("aria-selected",k=="p")}
$("#hBtn").onclick=()=>hb("h");$("#pBtn").onclick=()=>hb("p");hb("h");

const st=[
{n:"Stage 1: Physicochemical",mech:"Screening, equalization, coagulation (alum, ferric), flocculation with polymers, then settling or dissolved air flotation (DAF). pH adjustment and chemical precipitation for metals.",tg:["TSS","Oil & grease","Metals (precipitation)","Colloids","Phosphorus"],ef:[["TSS",85],["Oil & grease",90],["Heavy metals",90],["COD",40],["Color",50]]},
{n:"Stage 2: Biological",mech:"Microbes oxidize organics: activated sludge, MBBR (biofilm carriers), SBR, and anaerobic digestion (UASB) for high-strength streams with biogas recovery. Nitrification/denitrification removes nitrogen.",tg:["BOD","COD","Ammonia","Nitrogen","Biodegradable organics"],ef:[["BOD",95],["COD",80],["Ammonia",90],["Total N",70],["TSS",90]]},
{n:"Stage 3: Advanced / Tertiary",mech:"Ultrafiltration and MBR for solids, reverse osmosis for dissolved salts and micropollutants, AOPs (ozone, UV/H₂O₂, Fenton) for recalcitrant organics, activated carbon and ion exchange for PFAS and metals.",tg:["Recalcitrant COD","Dyes","Pharmaceuticals","TDS","PFAS"],ef:[["Dyes / color",95],["Micropollutants",95],["TDS (RO)",98],["Pathogens",99],["PFAS (GAC/IX/RO)",90]]},
{n:"Stage 4: Nature-based",mech:"Constructed wetlands, phytoremediation, waste stabilization ponds and floating treatment wetlands polish effluent at low energy and cost, and restore habitat. Need land and long residence time.",tg:["Nutrients","Trace metals","Residual organics","Pathogens"],ef:[["BOD",80],["TSS",85],["Total N",60],["Total P",50],["Metals",70]]}];
$("#stTabs").innerHTML=st.map((x,i)=>`<button class="tab" role="tab" aria-selected="${i==0}" data-i="${i}">${x.n.split(":")[0]}</button>`).join("");
function showSt(i){const x=st[i];$("#stBody").innerHTML=`<h3 style="margin-top:0">${x.n}</h3><p class="kv"><b>Mechanism:</b> ${x.mech}</p><p class="kv"><b>Target contaminants:</b> ${x.tg.map(p=>`<span class="tag">${p}</span>`).join("")}</p><b style="color:var(--teal)">Typical efficiency (%)</b>${x.ef.map(e=>`<div style="display:flex;justify-content:space-between" class="small"><span>${e[0]}</span><span>${e[1]}%</span></div><div class="bar"><i style="width:${e[1]}%"></i></div>`).join("")}<p class="small">Indicative ranges; performance depends on influent and design.</p>`;document.querySelectorAll("#stTabs .tab").forEach((t,j)=>t.setAttribute("aria-selected",j==i))}
$("#stTabs").onclick=e=>{if(e.target.dataset.i!=null)showSt(+e.target.dataset.i)};showSt(0);

const ind={
Textile:{p:"COD 800 to 3,000 mg/L, strong color, high TDS, pH 9 to 11, 80 to 200 L water per kg fabric",r:"Dyes block light; salts and surfactants stress freshwater life; some azo dyes form toxic amines",t:["Equalization","Coagulation/DAF","MBBR or SBR","Ozone/Fenton","UF + RO"]},
Petrochemical:{p:"Oil & grease, phenols, benzene, sulfides, COD 500 to 3,000 mg/L",r:"Hydrocarbons coat gills and sediments; phenols and sulfides are acutely toxic to fish",t:["API separator","DAF","Activated sludge","Activated carbon","Ozone/UV"]},
Tannery:{p:"Chromium (50 to 200 mg/L pre-treatment), sulfides, COD 2,000 to 6,000 mg/L, TDS very high",r:"Cr(VI) is toxic and carcinogenic; sulfide and ammonia deplete oxygen; salts harm freshwater species",t:["Cr recovery","Sulfide oxidation","Coagulation","Activated sludge + nitrification","RO"]},
Pharma:{p:"Active ingredients, solvents, COD 1,000 to 20,000 mg/L, antibiotic residues",r:"Endocrine disruption, antimicrobial resistance, chronic toxicity at trace levels",t:["Segregation","Anaerobic (UASB)","MBR","UV/H₂O₂ or ozone","GAC polishing"]},
"Food & Dairy":{p:"BOD 1,000 to 6,000 mg/L, fats, nitrogen, phosphorus, seasonal peaks",r:"Rapid oxygen depletion, eutrophication and fish kills",t:["Fat trap/DAF","Anaerobic digestion","Activated sludge","Nutrient removal","Constructed wetland"]},
"Metal Plating":{p:"Cr, Ni, Zn, Cu, Cd, cyanide, acidic or alkaline pH",r:"Metal bioaccumulation, gill damage, cyanide acute toxicity",t:["Cyanide destruction","Cr(VI) reduction","Hydroxide precipitation","UF","Ion exchange"]},
"Pulp & Paper":{p:"COD 1,000 to 5,000 mg/L, AOX, lignin color, resin acids, high flow",r:"Chlorinated organics bioaccumulate; color cuts light; fish reproductive effects",t:["Fiber recovery","Primary clarifier","Activated sludge","Coagulation","Tertiary polishing"]}};
$("#ind").innerHTML=Object.keys(ind).map(k=>`<option>${k}</option>`).join("");
function showInd(){const x=ind[$("#ind").value];$("#indBody").innerHTML=`<p class="kv"><b>Typical effluent:</b> ${x.p}</p><p class="kv"><b>Key aquatic risks:</b> ${x.r}</p><b style="color:var(--teal)">Recommended treatment train</b><div class="train">${x.t.map((s,i)=>(i?'<span class="arr">→</span>':'')+`<span class="step">${s}</span>`).join("")}</div><p class="small">Concentrations are typical raw-effluent ranges and vary widely by process and plant.</p>`}
$("#ind").onchange=showInd;showInd();

const mxD=[["Technology","Capital cost","Operating cost","Scalability","Sludge","Removal","Footprint"],
["Coagulation / DAF","Low","Low–Med","High","High","TSS, O&G, metals 70–95%","Small"],
["Activated sludge","Medium","Medium (aeration)","High","High","BOD 90–98%","Large"],
["MBBR","Medium","Medium","High (modular)","Medium","BOD 85–95%","Compact"],
["Anaerobic (UASB)","Medium","Low (biogas)","Medium","Low","COD 70–90% (high strength)","Medium"],
["MBR","High","Med–High","High","Low","BOD 98%+, pathogens","Compact"],
["AOP (O₃, UV/H₂O₂)","High","High (energy)","Medium","Very low","Recalcitrant organics 80–99%","Compact"],
["Reverse osmosis","High","High","High","Brine stream","TDS 95–99%","Compact"],
["Constructed wetland","Low–Med","Very low","Low (land-bound)","Minimal","Nutrients 50–80%","Very large"]];
$("#mx").innerHTML=mxD.map((r,i)=>"<tr>"+r.map(c=>i?`<td>${c}</td>`:`<th>${c}</th>`).join("")+"</tr>").join("");
const lm=[["Parameter","CPCB (mg/L)","WHO guideline","US EPA MCL","Concern"],
["pH","5.5 to 9.0","6.5 to 8.5 (aesthetic)","6.5 to 8.5 (secondary)","Acidity/alkalinity stress"],
["BOD (3 d, 27 °C)","30","n/a","n/a","Oxygen depletion"],
["COD","250","n/a","n/a","Organic load"],
["TSS","100","n/a","n/a","Turbidity, smothering"],
["Oil & grease","10","n/a","n/a","Gill coating"],
["Lead (Pb)","0.1","0.01","0.015 (action level)","Neurotoxin"],
["Mercury (Hg)","0.01","0.006","0.002","Bioaccumulation"],
["Cadmium (Cd)","2.0","0.003","0.005","Kidney, bone"],
["Chromium (Cr VI)","0.1","0.05 (total Cr)","0.1 (total Cr)","Carcinogen"],
["Arsenic (As)","0.2","0.01","0.01","Carcinogen"],
["Ammoniacal N","50","n/a","n/a","Fish toxicity"],
["Phenolic compounds","1.0","n/a","n/a","Taste, toxicity"]];
$("#lim").innerHTML=lm.map((r,i)=>"<tr>"+r.map(c=>i?`<td>${c}</td>`:`<th>${c}</th>`).join("")+"</tr>").join("");

const cs=[["Ganga, India: tannery cluster","Common effluent treatment plants and Cr recovery were pushed for tannery clusters, with zero liquid discharge mandates in some areas."],["Rhine, Europe: recovery","After the 1986 Sandoz chemical spill and decades of treatment upgrades, the Rhine regained fish species such as salmon, now a recovery benchmark."],["Singapore NEWater","Municipal and industrial reuse using MF/UF, RO and UV delivers high-grade reclaimed water, a model for advanced tertiary treatment."],["Tirupur, India: textile ZLD","Textile units in Tirupur adopted zero liquid discharge after court orders, combining biological treatment, RO and evaporation."],["Gulf of Mexico dead zone","A seasonal hypoxic zone driven largely by nutrient runoff spans thousands of km² in many years, showing eutrophication at scale."],["Minamata, Japan","Industrial methylmercury discharge caused severe human and ecosystem harm, shaping the Minamata Convention on Mercury (2013)."]];
$("#cs").innerHTML=cs.map(c=>`<div class="card"><h3 style="margin-top:0;font-size:17px">${c[0]}</h3><p class="small" style="margin:0">${c[1]}</p></div>`).join("");
$("#sub").onclick=()=>{const v=$("#em").value;$("#subMsg").textContent=/\S+@\S+\.\S+/.test(v)?"Thanks. This demo does not store emails.":"Please enter a valid email."};
