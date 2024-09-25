import Link from "next/link";


export default function Modal({slug} : {slug: string}) {
    return (
<Link href="/about" className="fixed inset-0 top-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="p-8 border w-5/6 h-5/6 shadow-lg  bg-black overflow-y-scroll">
      {
      slug === 'francais' ? <Francais />
      : slug === 'english' ? <English />
      : slug === 'hausa' ? <Hausa />
      : slug === 'isizulu' ? <IsiZulu />
      : slug === 'lgbo' ? <Lgbo />
      // : slug === 'sesotho' ? <Sesotho />
      : slug === 'swahili' ? <Swahili />
      : slug === 'yoruba' ? <Yoruba />
      : <English />
    }

    {/* <h1>Nipa Saison Africa2020</h1>
      <p>Àbá ìṣàkóso ohun ìṣẹ̀ǹbáyé dá lórí ìfọ̀rọ̀wánilẹ́nuwò tí ó ní àtò àgbékalẹ̀ ṣókí ajẹmáwòrán ilé gẹ́gẹ́ bí ti agbègbe àti sàkání agbára. Lẹ́yìn tí a bá ti ṣe àgbékalẹ̀ ṣókí náà nípa àǹfààní ìkọ̀kọ̀/bòńkẹ́lẹ́, tí a sì sọ wọ́n di ohun èlò ìṣẹ̀dá tó níye, tí ó ń ṣe àmúró àtò àìdọ́gba, nípa ìlàkàkà láti mú kí ìṣe ẹ̀ka-ìmọ̀ náà parẹ́ pátápátá.</p>

      <p>Ní ìlànà ìṣàkóso ohun ìṣẹ̀ǹbáyé, àwọn alájọmójútó ohun ìṣẹ̀ǹbáyé ti ilẹ̀ Áfíríkà mẹ́rin dá àbá àgbékalẹ̀ ṣókí tiwọn láàrín àgbékalẹ̀ ṣókí ti Saison Africa2020. Gẹ́gẹ́ bí èrò ti àjọ ètò owó pàṣípààrọ̀, wọ́n ṣe àgbékalẹ̀ pẹpẹ kan lórí ẹ̀rọ ayélujára gẹ́gẹ́ bí agbo ìmọ̀ àti ìṣèdá tó níye nípasẹ̀ àwọn alábápàdé tímọ́tímọ́ pẹ̀lú àwọn pàṣípààrọ̀. Ọ̀wọ́ àwọn òfin kan tí àgbékalẹ̀ ọ̀kọ̀ọ̀kan wọn jẹ́ ìpè-àti-ìfèsì ń pe àwọn ajẹ́jọ́ ní ṣísẹ̀ntẹ̀lẹ́ láti ṣe ìfọ̀rọ̀wánilẹ́nuwò kí wọ́n sì jùmọ̀ ṣe àtò àgbékalẹ̀ ṣókí ti ajẹmáwòrán ilé ní ìmọ̀ tàbí àkóónú ìpèsè òfin ìjọba nígbà tí wọ́n bá ń ṣe àmúlò oríṣiríṣi ìwọ̀n àti àwọn ọ̀nà ìní, àmúṣe àti ìṣojú.</p>

      <p>Àwọn ajẹ́jọ́ jẹ́ àwọn obìnrin ọmọ ilẹ̀ Áfíríkà aṣàtìpódọmọonílẹ̀ àti aláròjinlẹ̀ ẹ̀dá; ìtàn ìlànà ìkànìyàn àtìgbàdégbà tí a yọ kúrò nínú àmúlò ìṣẹ̀dá ìmọ̀ ṣùgbọ́n tí ìlànà àmúṣe ọ̀tọ̀ọ̀tọ̀ bí ọ̀gọ̀ọ̀rọ̀ ìrísí àti ìhùwàsí ti àdáṣe ayé/iṣẹ́ àgbàríjọṣe.</p>

      <h2>ÌṢÍNINÍYÈ</h2>
      <blockquote>
          “Àwọn àlá tí kò lè ṣẹ, èyí tí kò fi ohun tí a jẹ́ hàn, bí kò ṣe àfihan èrò ọkàn àwọn aláwọ̀ funfun lásán. Wọ́n jẹ́ abala ìmọ̀ ara ẹni àwọn aláwọ̀ funfun tí wọ́n kọ̀ sílẹ̀ èyí tí wọ́n wá ṣe àtúnfihàn sí wa, bí ẹni pé wọ́n jẹ́ àwọn ohun tí a le fi ògún rẹ̀ gbárí àti ìrísí tí kò lábàwọ́n nípa ara wa. Àmọ́ sáá o, wọn kì í ṣẹ ohun tí ó jẹ wá lógún.” ― Grada Kilomba
      </blockquote>

      <p>Ẹ̀yin ọ̀rẹ́ àti akẹgbẹ́ (wa),</p>

      <p>Nígbà tí a bá ní láti ṣe ògbufọ̀ fún àtò àgbékalẹ̀ ṣókí ti ajẹmáwòrán ilé ti Saison Africa2020, saay/yaas ní ìsípayá nípa ìlànà tí ó mọ rírì ọ̀nà ìṣàlàyé, ìfaradà àti àkoónú àtọwọ́ọ́dá àwọn Áfíríkà àti aṣàtìpódọmọonílẹ̀, nípa pípèsè àtakò tó fẹsẹ̀ rinlẹ̀ sí èrò òdì tó dá yàtọ̀ nípa Áfíríkà ní ṣíńsẹ̀tẹ̀lé “...láti ṣàlàyé fún àwọn tí ó ní àǹfàní láti má ní òye” saay/yaas ṣe àtò àfihàn “sàn-án”  láti jẹ́ abala/apá ìrísí ìfihàn tó wà lójú kan pẹ̀lú gbèdéke àti díndín àtakò. Ní ìfèsì, a ṣe ìdásílẹ̀ ìtàkùn ònídíjítà níbí.</p>

      <p>Gẹ́gẹ́ bí ọ̀rọ̀-apọ́nlé tí ṣe le “pọ́n tàbí yán ọ̀rọ̀-àpèjúwe”, “ṣísàlàyé ìbáṣepọ̀ ibi, àkókò, sábàbí, ibá, ìdí, ìpele, abbl.”, ìlò ọ̀rọ̀ yìí nínú àkọ́lé níbí, ṣe é kà gẹ́gẹ́ bí òun, níbí, bí bẹ́ẹ̀ kọ́, a lè yà bàrà sí àwọn ìbáṣepọ̀ tó ta kókó ní ìgbà àti àkókò tí ó wà nínú kíkọ́ àṣà ìyàwòrán ilé gẹ́gẹ́ bí obìnrin àti ọmọ Áfíríkà/aṣàtìpódọmọonílẹ̀ ní àwùjọ tí ó jẹ́ kìkì ọkùnrin aláwọ̀ funfun ni ó ní àǹfàní ètò ọrọ̀ ajé àti àtò ìkóra-ẹni níjánu ní ẹ̀ka ìyàwòrán ilé tí ó gùnlé ti ìhà ìwọ̀-oòrùn àgbáyé.</p>

      <p>Èyí jẹ́ alàyè àwọn èrò àtìgbàdégbà tí ó máa ń yí pàdà lóòrèkóòrè, àwọn ohun àmúwọlé tí ó níye lórí, tí ó ṣe àgbékalẹ̀ àwọn ìbéèrè tí ó rọ̀ mọ́ ọ̀gọ̀ọ̀rọ̀ òye àti àtò ṣíṣiṣẹ ayàwòrán ilé láti ìgbà wọ̀n-ọnnì wá nínú ìfọ̀rọ̀wérọ̀ ìgbà gbogbo pẹ̀lú àwọn ìbáṣepọ̀, ìrírí, ipò àti òye pàtó tí ó jẹmọ́ Áfíríkà àti àwọn aṣàtìpódọmọonílẹ̀. Ojú òpó náà ṣe àgbéyèwò bí ó ti ṣe pàtàkì láti ṣe àpéjọ ìta gbangba níbi tí ìfikùnlukùn àti àmúgbòòrò àwujọ àwọn obìnrin adúláwọ̀ níbí ó bá ṣe lè gbòòrò tó, awọn àdáṣe ayé àti ìṣe ti ohun ìní àdápinu ẹni.</p>

      <p>A pè ọ́ láti ṣe àtọwọ́dá “ṣekárími” tìrẹ nípa ṣíṣe àgbékalẹ̀ iṣẹ́, èrò, ìtọ́kasí, inú dídùn, ìbẹ̀rù, àròjinlẹ̀, ìmọ̀ràn (àfojúrí, ohùn tàbí àkọsílẹ̀), iṣẹ́ tí a ti ṣetán tàbí èyí tí a kò tí ì ṣetán tàbí èyí tí a ń gbèrò, ìbéèrè, àlàyé tàbí àtakò èrò ẹlòmíràn tí kò ní gbèdéke tàbí àyọrísí. A lè ṣe àfihàn àwọn nkàn wọ̀nyí ní gbangba tàbí ní kọ̀rọ̀ láìdárúkọ ẹni. O lè farahàn bí olùyàwòrán ilé, àjùmọ̀ṣe, ọlọ́wọ̀ọ́ tàbí aládàáṣe. Ẹ̀wẹ̀, nídàkejì, a pè ọ́ láti pe àwọn elòmíràn láàárín àjọ Áfíríkà/ aṣàtìpódọmọonílẹ̀ láti ṣe àgbékalẹ̀ tiwọn náà, nípa báyìí, kí wọ́n mú àwọn olóye rẹpẹtẹ àti àwọn alàdàáṣiṣẹ́ tí a le lò ní ọ̀nà tí ó gbòòrò jùlọ nínú àtò ajẹmọ-ìyàwòrán ilé àti àdáṣe ayé àti àmúṣe ti ohun ìní àdápinu ẹni wá sí àwùjọ.</p> */}
  <div className="modal-action">
      <Link href="/about" className="btn btn-primary">Close</Link>
    </div>
  </div>
  {/* <form method="dialog" className="modal-backdrop">
    <Link href="/about">close</Link>
  </form> */}
</Link>
    )
}


function Yoruba() {
    return (
      <div className="text">
        <h1>Nipa Saison Africa2020</h1>
        <p>Àbá ìṣàkóso ohun ìṣẹ̀ǹbáyé dá lórí ìfọ̀rọ̀wánilẹ́nuwò tí ó ní àtò àgbékalẹ̀ ṣókí ajẹmáwòrán ilé gẹ́gẹ́ bí ti agbègbe àti sàkání agbára. Lẹ́yìn tí a bá ti ṣe àgbékalẹ̀ ṣókí náà nípa àǹfààní ìkọ̀kọ̀/bòńkẹ́lẹ́, tí a sì sọ wọ́n di ohun èlò ìṣẹ̀dá tó níye, tí ó ń ṣe àmúró àtò àìdọ́gba, nípa ìlàkàkà láti mú kí ìṣe ẹ̀ka-ìmọ̀ náà parẹ́ pátápátá.</p>
  
        <p>Ní ìlànà ìṣàkóso ohun ìṣẹ̀ǹbáyé, àwọn alájọmójútó ohun ìṣẹ̀ǹbáyé ti ilẹ̀ Áfíríkà mẹ́rin dá àbá àgbékalẹ̀ ṣókí tiwọn láàrín àgbékalẹ̀ ṣókí ti Saison Africa2020. Gẹ́gẹ́ bí èrò ti àjọ ètò owó pàṣípààrọ̀, wọ́n ṣe àgbékalẹ̀ pẹpẹ kan lórí ẹ̀rọ ayélujára gẹ́gẹ́ bí agbo ìmọ̀ àti ìṣèdá tó níye nípasẹ̀ àwọn alábápàdé tímọ́tímọ́ pẹ̀lú àwọn pàṣípààrọ̀. Ọ̀wọ́ àwọn òfin kan tí àgbékalẹ̀ ọ̀kọ̀ọ̀kan wọn jẹ́ ìpè-àti-ìfèsì ń pe àwọn ajẹ́jọ́ ní ṣísẹ̀ntẹ̀lẹ́ láti ṣe ìfọ̀rọ̀wánilẹ́nuwò kí wọ́n sì jùmọ̀ ṣe àtò àgbékalẹ̀ ṣókí ti ajẹmáwòrán ilé ní ìmọ̀ tàbí àkóónú ìpèsè òfin ìjọba nígbà tí wọ́n bá ń ṣe àmúlò oríṣiríṣi ìwọ̀n àti àwọn ọ̀nà ìní, àmúṣe àti ìṣojú.</p>
  
        <p>Àwọn ajẹ́jọ́ jẹ́ àwọn obìnrin ọmọ ilẹ̀ Áfíríkà aṣàtìpódọmọonílẹ̀ àti aláròjinlẹ̀ ẹ̀dá; ìtàn ìlànà ìkànìyàn àtìgbàdégbà tí a yọ kúrò nínú àmúlò ìṣẹ̀dá ìmọ̀ ṣùgbọ́n tí ìlànà àmúṣe ọ̀tọ̀ọ̀tọ̀ bí ọ̀gọ̀ọ̀rọ̀ ìrísí àti ìhùwàsí ti àdáṣe ayé/iṣẹ́ àgbàríjọṣe.</p>
  
        <h2>ÌṢÍNINÍYÈ</h2>
        <blockquote>
            “Àwọn àlá tí kò lè ṣẹ, èyí tí kò fi ohun tí a jẹ́ hàn, bí kò ṣe àfihan èrò ọkàn àwọn aláwọ̀ funfun lásán. Wọ́n jẹ́ abala ìmọ̀ ara ẹni àwọn aláwọ̀ funfun tí wọ́n kọ̀ sílẹ̀ èyí tí wọ́n wá ṣe àtúnfihàn sí wa, bí ẹni pé wọ́n jẹ́ àwọn ohun tí a le fi ògún rẹ̀ gbárí àti ìrísí tí kò lábàwọ́n nípa ara wa. Àmọ́ sáá o, wọn kì í ṣẹ ohun tí ó jẹ wá lógún.” ― Grada Kilomba
        </blockquote>
  
        <p>Ẹ̀yin ọ̀rẹ́ àti akẹgbẹ́ (wa),</p>
  
        <p>Nígbà tí a bá ní láti ṣe ògbufọ̀ fún àtò àgbékalẹ̀ ṣókí ti ajẹmáwòrán ilé ti Saison Africa2020, saay/yaas ní ìsípayá nípa ìlànà tí ó mọ rírì ọ̀nà ìṣàlàyé, ìfaradà àti àkoónú àtọwọ́ọ́dá àwọn Áfíríkà àti aṣàtìpódọmọonílẹ̀, nípa pípèsè àtakò tó fẹsẹ̀ rinlẹ̀ sí èrò òdì tó dá yàtọ̀ nípa Áfíríkà ní ṣíńsẹ̀tẹ̀lé “...láti ṣàlàyé fún àwọn tí ó ní àǹfàní láti má ní òye” saay/yaas ṣe àtò àfihàn “sàn-án”  láti jẹ́ abala/apá ìrísí ìfihàn tó wà lójú kan pẹ̀lú gbèdéke àti díndín àtakò. Ní ìfèsì, a ṣe ìdásílẹ̀ ìtàkùn ònídíjítà níbí.</p>
  
        <p>Gẹ́gẹ́ bí ọ̀rọ̀-apọ́nlé tí ṣe le “pọ́n tàbí yán ọ̀rọ̀-àpèjúwe”, “ṣísàlàyé ìbáṣepọ̀ ibi, àkókò, sábàbí, ibá, ìdí, ìpele, abbl.”, ìlò ọ̀rọ̀ yìí nínú àkọ́lé níbí, ṣe é kà gẹ́gẹ́ bí òun, níbí, bí bẹ́ẹ̀ kọ́, a lè yà bàrà sí àwọn ìbáṣepọ̀ tó ta kókó ní ìgbà àti àkókò tí ó wà nínú kíkọ́ àṣà ìyàwòrán ilé gẹ́gẹ́ bí obìnrin àti ọmọ Áfíríkà/aṣàtìpódọmọonílẹ̀ ní àwùjọ tí ó jẹ́ kìkì ọkùnrin aláwọ̀ funfun ni ó ní àǹfàní ètò ọrọ̀ ajé àti àtò ìkóra-ẹni níjánu ní ẹ̀ka ìyàwòrán ilé tí ó gùnlé ti ìhà ìwọ̀-oòrùn àgbáyé.</p>
  
        <p>Èyí jẹ́ alàyè àwọn èrò àtìgbàdégbà tí ó máa ń yí pàdà lóòrèkóòrè, àwọn ohun àmúwọlé tí ó níye lórí, tí ó ṣe àgbékalẹ̀ àwọn ìbéèrè tí ó rọ̀ mọ́ ọ̀gọ̀ọ̀rọ̀ òye àti àtò ṣíṣiṣẹ ayàwòrán ilé láti ìgbà wọ̀n-ọnnì wá nínú ìfọ̀rọ̀wérọ̀ ìgbà gbogbo pẹ̀lú àwọn ìbáṣepọ̀, ìrírí, ipò àti òye pàtó tí ó jẹmọ́ Áfíríkà àti àwọn aṣàtìpódọmọonílẹ̀. Ojú òpó náà ṣe àgbéyèwò bí ó ti ṣe pàtàkì láti ṣe àpéjọ ìta gbangba níbi tí ìfikùnlukùn àti àmúgbòòrò àwujọ àwọn obìnrin adúláwọ̀ níbí ó bá ṣe lè gbòòrò tó, awọn àdáṣe ayé àti ìṣe ti ohun ìní àdápinu ẹni.</p>
  
        <p>A pè ọ́ láti ṣe àtọwọ́dá “ṣekárími” tìrẹ nípa ṣíṣe àgbékalẹ̀ iṣẹ́, èrò, ìtọ́kasí, inú dídùn, ìbẹ̀rù, àròjinlẹ̀, ìmọ̀ràn (àfojúrí, ohùn tàbí àkọsílẹ̀), iṣẹ́ tí a ti ṣetán tàbí èyí tí a kò tí ì ṣetán tàbí èyí tí a ń gbèrò, ìbéèrè, àlàyé tàbí àtakò èrò ẹlòmíràn tí kò ní gbèdéke tàbí àyọrísí. A lè ṣe àfihàn àwọn nkàn wọ̀nyí ní gbangba tàbí ní kọ̀rọ̀ láìdárúkọ ẹni. O lè farahàn bí olùyàwòrán ilé, àjùmọ̀ṣe, ọlọ́wọ̀ọ́ tàbí aládàáṣe. Ẹ̀wẹ̀, nídàkejì, a pè ọ́ láti pe àwọn elòmíràn láàárín àjọ Áfíríkà/ aṣàtìpódọmọonílẹ̀ láti ṣe àgbékalẹ̀ tiwọn náà, nípa báyìí, kí wọ́n mú àwọn olóye rẹpẹtẹ àti àwọn alàdàáṣiṣẹ́ tí a le lò ní ọ̀nà tí ó gbòòrò jùlọ nínú àtò ajẹmọ-ìyàwòrán ilé àti àdáṣe ayé àti àmúṣe ti ohun ìní àdápinu ẹni wá sí àwùjọ.</p>
      </div>
    )
  }
  
  function Swahili() {
    return (
      <div className="text">
        <div>
  <p><strong>KUHUSU (MADA YA…)</strong></p>
  <p>
    (Uzinduzi), (vingenevyo), wa kihusihi cha kitabia katika mfumo wa dhana ya nanga ya kuhoji usanifu wa nguvu kitovuti na kwa muktadha Muktadhari hiyo, 
    iliyoandaliwa kwa vitengo vya upendeleo, ziliundwa kama vyombo vya dhamana ambavyo vilisstawi usawa wa uzazi wa kimuundo, wakati huo huo, kuendelea 
    kufuta nidhamu ya zoezi hilo / mazaoezi hayo.
  </p>
  <p>
    Kupitia muundo wa ‘mise-en-abime’, ‘saay/yaas’ – watunzaji wenza wa kijinsia ya kiafrika – walipendekeza / walitoa harabi za kifupi katika habari au ripoti 
    fupi za ‘Saison Africa 2020. Ukianzishwa kama badaliko offisini kupitia kutungwa kwa kujkwaa la lini wa mtandao wa jamii kuhusu maarifa na uzalishaji wa 
    thamani kupitia uhusiano wa karibu na kubadilishana (maoni). Seti (uwekaji) wa vitendo, kila moja ikiundwa kama mtindo wa mwito-na-majibu, hukaribisha 
    (huita) wanaojibu mara kwa mara kujohi na uunda usanifu mfupi kwa pamoja katika uwazi wa uma yaliyomo, wakiwa katika harakati za ufanya kazi katika 
    viwango ya maeno mbali mbali ya fomu, mazoezi na hata uwakilisha(o).
  </p>
  <p>
    Wanaojibu ni wanawake wa Kiafrica kutoka nchi za ng’ambo (diaspora), watengezao anga na wanafikra, idadi ya watu ambao kihistoria wanazidi kuwachwa 
    nje ya zoezi la uundaji wa maarifa, lakini ambao mikabala yao ya mazoezi anuwai huzaa (huunda) umati mkubwa wa fomu na njia za (ya) mazoezi tunza, 
    anga na za pamoja.
  </p>
</div>

        <h1>MWALIKO</h1>
        <blockquote>
            “Ndoto, ambazo hazituwakilishi, ila firkra za watu wa kijinsia ya kizungu. Haya ndiyo mambo ya ukanusha wa kibinafsi wa kizungu ambayo yana wekwa kama makadirio kwetu sisi, kana kwamba yana mamlaka na lenga yakuonesha picha halisi yetu sisi. Walakin, hazina thamani kwetu (hazifai wasiwasi kwetu).” - Grada Kilomba
        </blockquote>
  
        <p>Marafiki na wenzangu wapendwa,</p>
        
        <p>Alipokabidhiwa kazi ya utafsiri wa muhtasari ujenzi (usanifu) wa mradi wa ‘Saison Africa 2020’, saay/yaas alihamasishwa na mikakati ambayo ilikua ya Ki-Afrika na ilitambua aina za kujieleza (uelezo), uthabiti na ubunifu ya asili hii; wakati huo huo kutoa uzito wa kukabiliana na mawazo yaliyotangulia, yaliyowekwa na yenye usawa na fikra kuhusu Afrika “…kutoa maelezo kwa wale ambao wana fursa ya kutojua”. Saay/yaas alishikilia maonyesho ya kawaida ya usanifu kuwaonyesha la tuli ya muundo mdogo na umuhimu wa uzuizi, kwa kujibu, jukwaa la digitali liliyoundwa vinginevyo (hata hivyo).</p>
        
        <p>Kama kielezi, “kinabadilisha (hubadilisha) au kufuzu (hufuzu) kivumishi, kuonyesha uhusiano wa mahali, wakati, hali, njia, sababu, kiwango, nk. (na kadhalika).” Matumizi ya neno hili hapa katika kichwa husomwa kama yeye, hapa, vinginevyo, inahusu uhusiano tata katika nafasi ya muda, asili ya uanadamu (ubinadamu) na kujenga mazoezi kama mwanamke wa Kiafrika/ughaibuni, katika nidhamu ya usanifu iliyo na uzoefu wa kiume, asili ya kizungu, walio na nguvu kiuchumi na ulio msingi wa magharibi.</p>
        
        <p>Huyu(hichi) ni kiumbe kinacho hadithi ya kuishi (kudumu), inayobadilika kila wakati ya maoni, kipokezi cha pembejeo muhimu ambazo hupanga kutungwa kwa maswali karibu na wingi wa uelewa na mazoezi ya usanifu, wakati wote katika mazungumzo ya mara kwa mara na uhusiano, uzoefu, hali na akili maalum za Kiafika na ughaibuni. Tovuti hii inashughulikia hitaji la haraka la kukusanya jamii iliyo wazi, inayoingiliana na inayopanuka ya wanawake weusi wanaohusika katika anuwai pana ya vitendo vya anga na matendo ya kujitawala.</p>
        
        <p>Tunakualika uunde njia yako mwenyewe ya kujitokeza, kwa kutoa kazi yao, mawazo, marejeleo, furaha, vitisho, fikra, maoni (ya kuona/kuonesha, sonic au maandishi), zilizokamilishwa au la, mirandi iliyootwa, maswali, taarifa au shida bila mipaka (bila vizuizi) au ubaguzi. Mawasilisho haya yanaweza kutolewa hadharani au bila kujulikana. Unaweza kuonekana kama kampuni, ushirikiano, chombo cha ukusanyaji wa watu, au kama mtu binafsi. Kwa upande mwingine, tunaweza kukuuliza pia kwa wengine wote katika ugawanyaji wakiafrika ughaibuni, kufanya maonyesho yao wenyewe, na kwa njia hii kuleta hatua kwa hatua katika jamii, anga pana ya wanafikra na watendaji wanaohusika katika anuwai pana zaidi ya zoea ya usanifu na anga katika mali ya kibinafsi.</p>
        
        <p>saay/yaas - abujapraiaparisjohannesburg</p>
    </div>
    )
  }
  
  
  function Francais() {
    return(
      <div className="text">
              <p className="py-4 text-sm">« Des fantasmes qui ne nous représentent pas, mais représentent l&apos;imaginaire blanc. Ils constituent certains aspects du moi blanc, re-projetés sur nous comme s&apos;ils étaient des images de nous-mêmes, objectives et dignes de foi. Cela dit, ils ne sont pas notre problème à nous. » — Grada Kilomba </p>
        <p className="py-4 text-sm">Chères et amies et collègues, Lorsqu&apos;on leur a demandé d&apos;interpréter le « brief » pour le projet d&apos;architecture Saison Africa 2020, les membres du collectif de commissaires et d&apos;architectes saay/ yaas ont été inspirées par des stratégies qui reconnaissaient pleinement les formes d&apos;expression, de résilience et de contenu créatif venues d&apos;Afrique ou des diasporas africaines2,tout en fournissant un contrepoids aux idées préconçues, aux perceptions figées et aux notions homogénéisantes si communes lorsqu&apos;il s&apos;agit de l&apos;Afrique… « pour expliquer à ceux qui ont le privilège de ne pas savoir »3. considérait l&apos;exposition « classique » d&apos;architecture comme un format trop statique, offrant des possibilités critiques aussi limitées que limitatives : la plateforme en ligne her(e), otherwise est née de ce constat.</p>
  
      </div>
  
    )
  }
  function English() {
    return(
  <div className="text">
      <h1>ABOUT</h1>
      <p>The <i>[i]:her(e), otherwise[/i]</i> curatorial proposition is conceptually anchored in the interrogation of the architectural brief as both a site and context of power. The briefs, having been formulated in silos of privilege, rendered them a tool of value creation that sustains the reproduction of structural inequality, while perpetuating erasure in the practice of the discipline.</p>
      <p>Through a mise-en-abîme format, saay/yaas*—four African co-curators—propose their own brief within the brief of Saison Africa2020. Conceptualized as a bureau de change, they develop an online platform as a community for knowledge and value production through intimate encounters and exchanges. A set of acts, each structured as call-and-response, invites successive responders to interrogate and jointly construct the architectural brief in a public act of knowledge/content production while operating across different scales and modes of belonging, practice, and representation.</p>
      <p>The responders are African-diaspora women spatial makers and thinkers; a demographic historically and continually excluded from the practice of knowledge creation, but whose diverse practice approaches birth a multitude of forms and modes of spatial/curatorial/collective practice.</p>
      <p><em>Sindi, Anahory, Abengowe, Yehouessi / Yehouessi, Abengowe, Anahory, Sindi.</em></p>
  
      <h2>INVITATION</h2>
      <blockquote>
          “Fantasies, which do not represent us, but the white imaginary. They are the denied aspects of the white self which are re-projected onto us, as if they were authoritative and objective pictures of ourselves. They are however not of our concern.” - Grada Kilomba
      </blockquote>
  
      <p>Dear friends and colleagues,</p>
  
      <p>When tasked with interpreting the Saison Africa2020 Architecture project brief, saay/yaas was inspired by strategies that recognized African and diasporan forms of expression, resilience, and creative content, whilst simultaneously providing a counterweight to dominant preconceived, fixed, and homogenizing notions about Africa “...to explain to those who have the privilege not to know”. saay/yaas held the “typical” architectural exhibit to be a form of static display with limited and limiting criticality, in response, the digital platform her(e), otherwise was created.</p>
  
      <p>As an adverb, otherwise, “modifies or qualifies an adjective”, “expressing a relationship of place, time, circumstance, manner, cause, degree, etc.” The use of this word in the title her(e), otherwise, read as her, here, otherwise, alludes to the complex relationships, in space and time, inherent to being and constructing a practice as a woman and African/diasporan in the predominantly male, white, economically privileged, and western-centered discipline of architecture.</p>
  
      <p>her(e)otherwise is a living, constantly mutating chronicle of ideas, a receptacle of valuable inputs that stages a framing of questions around the multiplicities of understanding and practicing architecture all the while in constant dialogue with the relationships, experiences, conditions, and intelligences specific to Africa and the diaspora. The site addresses the urgent need to gather an open, interactive, and expanding community of black women engaged in the broadest possible range of spatial practices and acts of self-determined belonging.</p>
  
      <p>We invite you to craft your own way of “showing up” by offering your work, thoughts, references, delights, horrors, musings, ideas (visual, sonic, or textual), finished, (in)complete or dreamed projects, questions, statements, or polemics with no limits or expectations. These offerings can be made publicly or anonymously. You can appear as a practice, collaboration, collective, or individual. In turn, we call on you to successively call on others within the African/diasporic body to make their own offerings, and in this way to progressively bring into the community a wide expanse of thinkers and practitioners.</p>
  
      {/* <p>1 Grada Kilomba, Plantation Memories. Episodes of Everyday Racism, (Münster, UNRAST-Verlag 2010), p. 4.<br>
      2 African Mobilities, curated by Mpho Matsipa; Reconstructions: Architecture and Blackness in America curated by Sean Anderson and Mabel Wilson, the Black Trans Archive project by Danielle Brathwaite-Shirley, among others.<br>
      3 In Gabi Ngcobo’s seminar addressing refusal as a curatorial strategy, she describes her work "We Don’t Need Another Hero” as resisting “the desire for a single heroic conclusion in favor of embracing complexity. Herein, refusal is applied as a strategy to challenge the uptake of assigned or inherited responsibilities that keep certain people in roles whereby they are expected to explain to those who have the privilege not to know”. <a href="https://contemporaryand.com/fr/exhibition/seminar-curating-strategies-of-productive-refusal-gabi-ngcobo/">https://contemporaryand.com/fr/exhibition/seminar-curating-strategies-of-productive-refusal-gabi-ngcobo/</a> accessed February 7, 2019.</p> */}
  
      <p><em>saay/yaas - abujapraiaparisjohannesburg</em></p>
  </div>
  
    )
  }
  function Hausa() {
    return(
      <div className="text">
      <h1>Bayani</h1>
      <p>Wannan shiri na [i]:her(e), an qirqiro shi ne domin tunkarar harkokin tsarin zayyanar gine-gine a matsayin dandali da kuma mataki na nuna bajinta. Waxannan bayanan, waxanda aka tsara su dalla-dalla, kuma mataki-mataki, sun zama wata hanya da ake bi wajen nuna xaukaka ga wasu koqasqantarwa; yayin da kuma ake yin amfani da shi wajen nuna qwarewa a cikin sana’ar.</p>
  
      <p>Ta hanyar tsari na musamman na saay/yaas*, wasu ’yan asalin Afrika su huxu, sun kawo tasu manhajar a qarqashin tsarin Saison Africa 2020. A qarqashin wannan tsarin, wanda aka qirqiro shi a manhajar ba-ni-in-ba-ka, sun samar da dandali a yanar sadarwa ta zamani, domin havaka ilmi da kyautata aiki, ta hanyar tuntuvar juna akai-akai da qara sanin juna.</p>
  
      <p>Mutanen da suka kawo wannan shirin mata ne masana, kuma qwararru ‘yan Afirka mazauna qasashen waje, waxanda a koyaushe akan ware su a cikin harkokin ilmi, amma kuma ayyukansu kan shafi fannoni da yanayi da halayya daban-daban.</p>
  
      <p><em>Sindi, Anthony, Abengowe, Yehouessi/Yehouessi, Abengowe, Anthony, Sindi.</em></p>
  
      <h2>GAYYATA</h2>
      <blockquote>
          “Mafarkin abubuwan da ba su wakiltar mu, sai dai abubuwan da turawa fararen fata suke hasashe game da mu. Tunanin irin abubuwan da turawan ne suka rasa, su ne ake jinginawa da mu, kamar waxannan su ne halayyarmu ta zahiri. Sai dai kuma wannan bai dame mu ba.” - Grada Kilomba.
      </blockquote>
  
      <p>Zuwa ga ‘yan’uwa da abokan aiki,</p>
  
      <p>Yayin da aka dora wa mata nauyin bayyanashirin zayyanar gine-gine na “Saison Africa 2020 Architecture”, qungiyar saay/yaas ta sami qwarin gwiwa daga irin hikimomin ’yan Afirka da na ’yan qasashen waje mazauna turai, waxanda ke nuna qwazonsu da fasaharsu; tare kuma da wargaza irin mummunar fahimta da tunanin bai xaya da ake da su game da nahiyar Afirka, “...ta hanyar bayyana wa waxanda a da ba su sami damar ganin hakan ba”. Qungiyar saay/yaas ta gudanar da baje kolin fasahar zayyane-zayyanen ne domin ya zama manuniya; daga baya ne aka samar da dandalin her(e) a kafar sadarwa ta yanar gizo.</p>
  
      <p>Wata kalmar bayani “ita ta ke bayyanar da wani bayanin kuma”, “ta hanyar nuni da dangantakar abin da wuri, lokaci, dalili, yanayi, zurfinsa, da sauran su”. Don haka amfani da kalmar “her(e) da aka yi a sunan dandalin, wanda akan karanta a matsayin “her”, watau “ita”, yana nuni da dangantaka mai sarqaqqiya ta fuskar wuri da lokaci, wadda ke akwai tsakanin kafa waje na aiki da kasancewar ta mace, ’yar Afirka mai zama a turai, a cikin abokan aikin da aka saba ganin yawancin su maza ne, fararen fata, masu hannu da shuni, kuma masu bin tsarin qasashen yamma wajen gudanar da sana’ar zayyanar gidaje.</p>
  
      <p>Baya ga wannan, her(e) rayayyen dandali ne, wanda yake cike da fasaha, mai bayyana shawarwari, wanda kuma yake shirya tambayoyi akan fahimta da fannoni daban-daban na aikin zayyanar gini. Haka nan, a kowane lokaci dandalin yana samar da bayanai dangane da dangantaka da ke akwai tsakanin qwararru, da irin ayyukansu, da yanayin sana’arsu, da kuma fasahohin da suka shafi Afirka da ’yan asalin nahiyar mazauna qasashen waje. Dandalin ya samar da dama ga mata baqaqen fata, waxanda ke ta qaruwa, domin su sadu da juna cikin aminci, su kyautata hulxarsu, tare da haxa kai wajen nema wa kansu kyakkyawar makoma.</p>
  
      <p>Don haka muna gayyatar ku domin ku bayyana kawunanku, ta hanyar kawo labarun ayyukanku, da bayyana tunaninku, da qwarewarku, tare da abubuwan da ku ke so ko jin tsoro, ko na raha (waxanda za a iya aikatawa a aikace, ko saurare, ko a rubuce). Waxannan sun haxa da ayyukan da aka kammala, ko ake shiryawa, ko tambayoyi, ko mahawarori; ba tare da gindaya wani shamaki ba. Za a iya kawo irin wannan gudummuwa a bayyane, ko kuma ba tare da ambaton sunan mai bayarwa ba. Haka kuma za ku iya bayyana a qarqashin wani kamfani ko ofishin da ku ke aiki, a matsayin qungiya ko kuma da sunanku. Muna roqon ku da ku yaxa wannan bayani ga sauran waxanda ba su sami wannan sanarwa ba daga Afrika da sauran wurare a qasashen waje, don su kawo nasu bayanan. Ta haka sannu a hankali sai a tattara dukkan masana da qwararru guri xaya daga fannoni daban-daban a cikin wannan sana’ar ta zayyanar gine-gine, domin a tafi tare.</p>
  
      {/* <p>1 Duba littafin Grada Kilomba, Plantation Memories of Everyday Racism (Munster, UNRAST-Verilog 2010), p.4<br>
      2 Duba littafin Mpho Matsipa, African Mobilities; da littafin Sean Anderson da Mabel Wilson, Reconstructions: Architecture and Blackness in America; da littafin Black Trans-Archive Project na Danielle Brathwaite-Shirley; da sauran su.<br>
      3 A cikin takardar da ta gabatar wajen taron qara wa juna ilmi Gabi Ngcobo ta kira aikinta da sunan “Ba mu Bukatar Wani Gwarzon”, don ta nuna cewar ba a “bukatar gwarzo guda xaya, a maimakon gwarzaye da yawa. Saboda haka, qiyawar mu ma wata dabara ce ta qalubalantar wasu abubuwa da ake liqawa waxansu mutane, tare da cewar lallai sai su yi bayani ga waxanda ba su gane ba”. Duba shafi a yanar gizo. <a href="https://contemporaryand.com/fr/exhibition/seminar-curator-strategies-of-productive-refusal-gabi-ngcobo">https://contemporaryand.com/fr/exhibition/seminar-curator-strategies-of-productive-refusal-gabi-ngcobo</a>, wanda muka duba a ranar 7 ga watan Fabrairu 2019.</p> */}
  </div>
  
    )
  }
  function IsiZulu() {
    return(
  <div className="text">
      <h2>MAYELANA…</h2>
      <p>I<i>:her(e), otherwise</i> ukuhlungwa kwezethulo kuncike ekuqophisaneni, kugqame imiyalelo emayelana nokumiswa kwezakhiwo njengewebhu eyindawo kanye nequkethe isimo samandla. Imiyalelo, eyakhiwe yazimela ngokwemgomo yayo, yagqamisa indlela yokwakha ukubaluleka okuzogcina ukwakhiwa kwesakhiwo esingalingani, yaqxila ekuqondiseni izigwegwe kulo mkhakha wokumiswa kwezakhiwo.</p>
  
      <p>Ngokwe mise-en-abime, saay/yaas* - abacubungili basezwenikazi lase-Afrika abane – baphakamisa eyabo imilayelo eyashiqilelwa emqulwini oka-Saison Africa2020. Lapho kundlalwe imiqondo eveza inguquko yezinto baphendula ngokusungula inkundla yokuxhumana njengesizinda (inkundla yomtapo yolwazi) nokuhlonzwa kwemikhiqizo ukuze bakwazi ukuhlanganyela nokusizana. Idlanzana elibambisene, elinye nelinye lizakhele uhlelo lwayo lokulekelelana, iheha abantu abanezindlela ezingcono zokuqoqa ulwazi kanye nokubambisana ekwakhiweni izindlela ezintsha zokumiswa kwezakhiwo nokuqoqa ulwazi esidlangalaleni. Yize kusetshenzwa ngezindlela ezahlukene kulomkhakha kanye nemigomo eyakhelwe lokho, kwenziwe futhi kwethulwe.</p>
  
      <p>Abangathumela izimpendulo makube isibhuda sasezwenikazi lase-Afrika namaphethelo, abanekhono kanye nolwazi lokucubungula, ngokomlando makube abantu ababengabandakanyiwe ekuqhakambiseni nokuthuthukisa ulwazi futhi bakwazi ukusungula izindlela ezizoguqula imikhiqizo. Kusunguleke uxhaxha lwezindlela ezintsha zokwenza izindawo/ukuhlungwa/nokusebenza ngokubambisana.</p>
  
      <h2>ISIMEMO</h2>
      <blockquote>
          “Imicabango, engameli thina, kodwa eyacatshwanga abamhlophe ngabamnyama. Kuyizinkomba ezazigqame kwabamhlophe zedluliselwa kwabamnyama, kwakheka isithombe esinamandla esagqama kwabamnyama kwaba isithombe esinamandla futhi sabanezinhloso ezithile. Yize noma kunjalo kwakungabalulekanga kithi” - Grada Kilomba.
      </blockquote>
  
      <p>Bangani kanye nesibambisene nabo kulomkhakha,</p>
  
      <p>Ngenkathi eqokelwa ukuhlaziya ngamafuphi umsebenzi weSaison Africa 2020, u-saay/yaas wavukwa ugqozi ngamasu asetshenziswa ukugqamisa ubuzwekazi baseAfrika namaphethelo kanye nezindlela okwakugqanyiswe ngazo, ubunzulu, kanye nobuchule okuqukethwe, ngenkathi ethula imicabango eyayinika izinga eliphezulu, kanalemicabango ebikade ikhona, engaguquki, kanye neqhakambisa ubuzwekazi baseAfrika, “…bakwazi ukucacisela laba abangabanga nenhlanhla yokuthola ulwazi ukuze bazi”. u-Saay/yaas babamba imiboniso yokumiswa kwezakhiwo (architecture) “ezaziwayo”, kwadaleka umgudu omile wokukhangisa obalulekile nonemikhawulo ebekelwe isilinganiso, ngenkathi ephendula, kwasungulwa indlela yokuxhumana eyaziwa nge-her(e), otherwise.</p>
  
      <p>Njengesandiso, uma kungenjalo, “siguqulwe noma sifaneleke ukuba isiphawulo”, “igqamise ubudlelwane phakathi kwendawo, isikhathi, isimo, indlela, izizathu, izinga, njalo njalo.” Ukusetshenziswa kwalegama emqulwini othi her(e), otherwise, yafundeka njengobulili besifazane, bendawo, uma kunjalo, iyinkomba yobudlelwane obuhlangahlangene, benkathi kanye nendawo, yakhelwa ukuze ibekanjalo futhi yakhe lomkhakha njengowesifazane wase-Afrika/nasezwenikazi lonke, elinomkhakha obuswa abesilisa, abamhlophe, abadla izambane likapondo futhi nababuswa impucuko yezizwe emkhakheni wokumiswa kwezakhiwo.</p>
  
      <p>her(e), otherwise yinkundla ephilayo, equkethe imibono eguquka njalo, okuyisizinda esimumethe ulwazi olubalulekile olundluliswe ngobukhulu ubuchule lobu ukuhlela izindlela zemibuzo eminingi nangezindlela zokuqonda kanye nokwenza ukumiswa kwezakhiwo ukuze kube nokuxhumana ngaso sonke isikhathi kwakheke ubudlelwane, ukucobelana ngolwazi, izimo kanye nobuhlakani obumayelana nezwekazi lase-Afrika. Le webhu izobhekisisa isidingo esibalulekile sokuqoqa nokwamukela, ukucobelana ngolwazi kanye nokukhuliswa komphakhathi kwabantu besifazane abamnyama abazibandakanya nalomkhakha ngazo zonke izindlela, kulendawo yokusebenza futhi ekubuyiseni ukuzithemba ebantwini kulomkhakha.</p>
  
      <p>Simema amaciko asungule izindlela zawo “zokukhangisa” ngokuziqambela eyabo imisebenzi, imicabango, egqamisa ubufakazi, ekhangayo Kanye nengakhangi, ethokozisa umqondo (ebonwayo, ezwakalayo noma ebhalwayo), ephothulwe, eqediwe nengaqediwe noma amaphrojekthi ayiphupho (imifanekiso mqondo), imibuzo, imicu/izitatimendi noma eqophisanayo yangabekelwa migomo namibandela elindeleke ukulandelwa. Lemikhiqizo ingathunyelwa ngokuzidalula okanye ithunyelwe ngokuzifihla ungazidaluli. Ungazethula njengendawo yokusebenza, ababambisene noma uzimele wedwa. Ukuze kube yimpumelelo, sikunxusa ukuba udlulise isimemo nakwabanye ezwenikazi lase-Afrika namaphethelo, ukuze nabo bakwazi ukwakha izikhangiso zabo bazithumele, ngaleyondlela siyophumelela ekukhuliseni lo mkhakha, amaciko akwazi ukucabanga kanye nabasebenzi bokumiswa kwezakhiwo abaxhumene ngazo zonke izindlela ekumisweni kwezakhiwo kanye nezindlela zokwenza izindawo futhi abantu bazibone bafanelekile ukuba kulomkhakha.</p>
  
      <p><em>Saay/yaas -abujapraiaparisjohannesburg</em></p>
  
      <p><em>Sindi, Anahory, Abengowe, Yehouessi / Yehouessi, Abengowe, Anahory, Sindi.</em></p>
  </div>
  
    )
  }
  function Lgbo() {
    return(
      <div className="text">
        <h2>MAKA</h2>
        <blockquote>
            “Nchepụta ịhe apụtaghị ihe, anaghị azachitere anyị, mana echiche efu. Ha bụ ịhe ndị ngọnahị onwe bụ nke ana achadoro anyị ọkụ, Ọ dịzie ka ọ bụ eserese kọwara anyị ọfụma. Ha abụghị ihe gbasara anyị.” - Grada Kilomba.
        </blockquote>
  
        <p>Ezigbo ndị enyi na ndị ọrụ ibe,</p>
  
        <p>Oge e nyere ha ọrụ ntụgharị okwu ihe nkọwa arụmarụ ụlọ Saison Africa2020, ihe kpalitere mmụọ saay/yaas bụ usoro matara udị atụmatụ ndị Africa na ndị bi ofesi gbasara ngosipụta, nkwechịrị na ịhe nka, werekwa otu ụzọ ahụ na-enye mbugharị ibu echiche kwụsị ike gbasara Afrika “…ịkọwara ndị nwere ugwu na-amaghị.” saay/yaas nwere ihe ngosi ihe owuwu ụlọ “nke a na-ahụkarị” ka ọ bụrụ ụdị ngosipụta kwụ otu ebe, nwere oke na enweghị mmachi, na nzaghachi, usoro dijitalụ ebe a, ma ọ bụghị ya, mepụtara ya.</p>
  
        <p>Dị ka nkwuwa, ma ọ bụghị ya, “na-agbanwe ma ọ bụ tozuo nkọwaaha”, “na-egosipụta mmekọrịta ebe, oge, ọnọdụ, ụzọ, ihe kpatara, ogo, dgz.” Ojiji nke mkpụrụokwu a n&apos;otutu aha ya, ma ọ bụghị, gụọ dịka ya, ebe a, ma ọ bụghị, na-atụ aka na mmekọrịta dị mgbagwoju anya, na oghere na oge, sitere na ịdị na-eme omume dị ka nwanyị na onye Afrika bi mba ofesi na ọkachasị mmụta owuwu ụlọ bụ ebe oke, ndịọcha, ndị ọgaranya akụ na ndị ala bekee juputara.</p>
  
        <p>Ebe a ma ọ bụghị ya, bụ akụkọ ndụ dị ndụ, na-agbanwe agbanwe mgbe niile, ebe ntinye nke ọnụ ahịa bara uru nke na-ebute usoro ajụjụ gburugburu ọtụtụ nghọta na ịrụ ọrụ owuwu ụlọ oge niile na mkparịta ụka kwa mgbe na mmekọrịta, ahụmịhe, ọnọdụ na ọgụgụ isi ejirimara Africa na ndị bi ofesi. Mbara a na-ekwupụta oke mkpa ọ dị ozugbo ozugbo iji kpokọta ndị nwanyị isi ojii, na-emekọrịta ihe, saa anya ma na-agbasawanye na-etinye aka na mmepụta sara mbara na omume nke ikpebiri onwe ha.</p>
  
        <p>Anyị na-akpọ gị oku ka ị rụpụta ụzọ nke &apos;igosi&apos; site na ịnye ọrụ gị, echiche gị, ntụnyere aka, ihe ụtọ, egwu, echiche, alo (ihe nkiri, ihe egwu ma ọ bụ ederede), emechara, ọrụ emechaghịị na nke zuru ezu ma ọ bụ nrọ, ajụjụ, nkwupụta ma ọ bụ okwu mkparị na-enweghị oke ma ọ bụ atụmanya. Enwere ike ịnye onyinye ndị a n&apos;ihu ọha ma ọ bụ na-enweghị aha.</p>
  
        <p>Ị nwere ike ịpụta dị ka mmepụta, imekọ ihe ọnụ, mkpokọta ma ọ bụ otu onye. N&apos;aka nke ọzọ, anyị na-akpọku gị ka ị na-akpọ ndị ọzọ nọ na mpaghara Afrịka/ obibi mba ofesi ka ha nye onyinye nke ha, wee si n&apos;ụzọ a jiri nwayọọ nwayọọ webata n&apos;ime obodo sara mbara nke ndị na-eche echiche na ndị na-arụ ọrụ na-arụ n&apos;ọndụ owuwu ụlọ sara mbara, omume gbasara ohere na mkpebi nke onwe.</p>
  
        <p><em>Saay/yaas - abujapraiaparisjohannesburg</em></p>
  
        <h2>ỌKPỤKPỌ OKU</h2>
        <p>Ịhe gbasara ihe a maọbụ okwu mwekọta na nhazi nka e wepụtara wee chedo n&apos;ajụjụ Okwu nkọwa ndị ahụ, bụ nke e mepụtara n&apos;ebe nchịkọnata ugwu na ntoru, nyere ha ngwa ọrụ nke imepụta ihe bara uru nke na-akwado mmeputa nke ahaghị nhatanha, ka na-aga n&apos;ihu na -ehichapụ mmụta gbasara ya.Site n&apos;usoro akụkọ dị n&apos;ime akụkọ, ndị ndozi na nhazi anọ wepụtara okwu nkọwa dị n&apos;ime okwu nkọwa Saison Africa 2020.</p>
  
        <p>Ebe echepụtara ya ka ụlọ mgbanwe ego, ha rụpụtara ya n&apos;ama ịntanetị ka ebe obodo mmụta na mmepụta uru site na nkata onye na onye. Nchịkọta ịhe mmepụta ka ahaziri ka akpọọ-azaa, na-akpọkụ ndị zatara ya ka ha jụọ ajụjụ ma jịkọta aka rụọ ọkwụ nkọwa arụmarụ ụlọ na mmụta ọha, wee na arụ ọrụ n&apos;ụzọ dị iche iche n&apos;usoro onwunwe, mmepụta na ngoziputa.</p>
  
        <p>Ndị zara ajụjụ a bụ ndị nwaanyị Afrịka bi na mba ofesi bụ ndị mmepụta ihe na ndị nchepụta eciche; bụ ndị otu a na-agụpụkarị n&apos;ihe gbasara omume nke mmepụta ihe ọmụmụ, mana bụrụ ndị jị ụzọ di iche iche echepụta ma arụpụta ọrụ gbasara ndozi ohere/ nhazi na mkpokota.</p>
  
        <p><em>Sindi, Anahory, Abengowe, Yehouessi / Yehouessi, Abengowe, Anahory, Sindi.</em></p>
    </div>
    )
  }
  