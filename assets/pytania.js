/* Lista zagadnień: jedno źródło dla index.html i nav.js (menu skokowe na stronach). */
/* ══════════════════════════════════════════════════════════════════════
   3. KATEGORIE NAUKI — kolejność opracowywania i powtarzania
   Kolejność wynika z trzech reguł (szczegóły w notatce `kolejnosc-opracowan`):
   ten sam obiekt kolejnymi metodami uczy więcej niż nowy obiekt przy każdej
   metodzie; bliźniaki robi się razem; synteza idzie po składnikach.
   p: klucz przedmiotu (stąd wykładowcy i semestr), file: gotowe opracowanie.
   ══════════════════════════════════════════════════════════════════════ */
const KATEGORIE = [
 {name:"Modelowanie i identyfikacja", items:[
   {n:1, p:"mid", t:"Technologie modelowania oparte o wiedzę i oparte o dane – podaj charakterystykę, wskaż związki, przedstaw kroki budowy modeli.", file:"pytanie_01_technologie_modelowania.html"},
   {n:2, p:"mid", t:"Metoda najmniejszych kwadratów w identyfikacji parametrów modeli analitycznych – odmiany, algorytmy znajdowania estymat parametrów.", file:"pytanie_02_metoda_najmniejszych_kwadratow.html"},
   {n:3, p:"mid", t:"Modele rozmyte lingwistyczne – struktury, uproszczone wnioskowanie Mamdaniego, rozmywanie, wyostrzenie.", file:"pytanie_03_modele_rozmyte_lingwistyczne.html"},
   {n:4, p:"mid", t:"Modele neuronowe jednokierunkowe i rekurencyjne – struktury, uczenie relacji wejście–wyjście.", file:"pytanie_04_modele_neuronowe.html"},
 ]},

 {name:"Sterowanie w przestrzeni stanu", items:[
   {n:5, p:"ts", t:"Sterowalność, obserwowalność – badanie, znaczenie w metodzie alokacji biegunów i konstrukcji obserwatorów.", file:"pytanie_05_sterowalnosc_obserwowalnosc.html"},
   {n:6, p:"ts", t:"Sterowanie ze sprzężeniem od stanu – metoda alokacji biegunów i wykorzystanie macierzy kompensacji wzmocnień, metody projektowania.", file:"pytanie_06_sprzezenie_od_stanu.html"},
   {n:7, p:"ts", t:"Sterowanie ze sprzężeniem od stanu – metoda alokacji biegunów i wykorzystanie działań całkujących, metody projektowania.", file:"pytanie_07_dzialanie_calkujace.html"},
   {n:8, p:"ts", t:"Obserwatory – funkcja, rodzaje, metody projektowania.", file:"pytanie_08_obserwatory.html"},
 ]},

 {name:"Optymalizacja", items:[
   {n:9, p:"opt", t:"Klasyfikacja i charakterystyka algorytmów optymalizacji nieliniowej bez ograniczeń i z ograniczeniami.", file:"pytanie_09_optymalizacja.html"},
   {n:10, p:"opt", t:"Przedstaw zastosowanie metody funkcji kary w zagadnieniach optymalizacyjnych.", file:"pytanie_10_funkcja_kary.html"},
   {n:13, p:"msi", t:"Schemat i parametry działania algorytmu genetycznego.", file:"pytanie_13_ag_schemat_parametry.html"},
   {n:14, p:"msi", t:"Kodowanie i operatory genetyczne w algorytmach genetycznych.", file:"pytanie_14_kodowanie_operatory.html"},
   {n:11, p:"msi", t:"Charakterystyka wykorzystania algorytmu genetycznego w zagadnieniach optymalizacji z ograniczeniami.", file:"pytanie_11_ag_ograniczenia.html"},
   {n:12, p:"opt", t:"Sformułowanie zadania optymalizacji wielokryterialnej i metody poszukiwania zbioru rozwiązań Pareto optymalnych.", file:"pytanie_12_wielokryterialna.html"},
 ]},

 {name:"Sztuczna inteligencja", items:[
   {n:15, p:"msi", t:"Struktury i mechanizmy wnioskowania systemów rozmytych.", file:"pytanie_15_systemy_rozmyte.html"},
   {n:16, p:"msi", t:"Struktury i metody uczenia sieci neuronowych.", file:"pytanie_16_sieci_neuronowe.html"},
   {n:30, p:"msi", t:"Wymień i opisz podstawowe mechanizmy samoorganizacji sieci neuronowych samoorganizujących.", file:"pytanie_30_samoorganizacja.html"},
 ]},

 {name:"Filtry i sygnały cyfrowe", items:[
   {n:17, p:"cps", t:"Filtry cyfrowe – opis, właściwości i zastosowania.", file:"pytanie_17_filtry_cyfrowe.html"},
   {n:19, p:"cps", t:"Zalety technologii cyfrowego przetwarzania sygnałów.", file:"pytanie_19_zalety_cyfrowego.html"},
   {n:20, p:"cps", t:"Rozszerzony filtr Kalmana a filtr Kalmana – podobieństwa, różnice, zastosowania.", file:"pytanie_20_ekf.html"},
 ]},

 {name:"Sterowanie zaawansowane", items:[
   {n:18, p:"sas", t:"Przedstaw metody sterowania obiektami z opóźnieniami i dokonaj wzajemnego porównania tych metod.", file:"pytanie_18_opoznienia.html"},
   {n:40, p:"sas", t:"Przedstaw filtr Kalmana i opisz jego zastosowanie w strukturach sterowania.", file:"pytanie_40_filtr_kalmana.html"},
   {n:23, p:"sas", t:"Przedstaw podstawowe elementy technologii sterowania predykcyjnego.", file:"pytanie_23_sterowanie_predykcyjne.html"},
   {n:34, p:"kss", t:"Przedstaw jeden z możliwych sposobów realizacji regulatora predykcyjnego w komputerowym systemie sterowania.", file:"pytanie_34_realizacja_mpc.html"},
   {n:39, p:"sas", t:"Przedstaw obszary zastosowania i opisz technologię sterowania w oparciu o linearyzację przez sprzężenie zwrotne dla obiektów deterministycznych oraz z niepewnością.", file:"pytanie_39_linearyzacja.html"},
   {n:37, p:"sas", t:"Przedstaw obszary zastosowania i opisz technologię sterowania ślizgowego.", file:"pytanie_37_sterowanie_slizgowe.html"},
   {n:38, p:"sas", t:"Opisz technologię i przedstaw obszary zastosowania pośredniego sterowania adaptacyjnego z modelem identyfikowanym on-line.", file:"pytanie_38_posrednie_sterowanie_adaptacyjne.html"},
   {n:41, p:"sas", t:"Przedstaw sterowanie inteligentne z wykorzystaniem dynamicznych sieci neuronowych oraz systemów rozmytych Takagi-Sugeno.", file:"pytanie_41_sterowanie_inteligentne.html"},
 ]},

 {name:"Diagnostyka i uszkodzenia", items:[
   {n:27, p:"mid2", t:"Wymień i opisz kroki algorytmu budowy modelu PCA, a następnie wyjaśnij sposób jego wykorzystania do diagnostyki procesów.", file:"pytanie_27_model_pca_diagnostyka.html"},
   {n:31, p:"mid2", t:"Wymień i opisz kroki algorytmu budowy modelu Kernel PCA. Porównaj metodę Kernel PCA z metodą PCA.", file:"pytanie_31_kernel_pca.html"},
   {n:28, p:"mid2", t:"Opisz metodę SVM (maszyny wektorów podtrzymujących) i przedstaw jej zastosowanie do rozwiązywania zagadnień klasyfikacji.", file:"pytanie_28_svm.html"},
   {n:29, p:"mid2", t:"Przedstaw ideę sterowania tolerującego uszkodzenia (FTC – Fault Tolerant Control).", file:"pytanie_29_ftc.html"},
 ]},

 {name:"Architektura systemów", items:[
   {n:32, p:"kss", t:"Przedstaw hierarchiczny warstwowy model komputerowego systemu sterowania, scharakteryzuj poszczególne warstwy i zaproponuj jego realizację sprzętowo-programową.", file:"pytanie_32_model_warstwowy.html"},
   {n:22, p:"kss", t:"Struktura funkcjonalna i sprzętowa systemów automatyki przemysłowej.", file:"pytanie_22_struktura_automatyki.html"},
   {n:21, p:"kss", t:"Systemy komunikacji w rozproszonych systemach sterowania.", file:"pytanie_21_komunikacja.html"},
   {n:24, p:"kss", t:"Przedstaw rozproszone i wieloagentowe struktury sterowania.", file:"pytanie_24_wieloagentowe.html"},
   {n:33, p:"kss", t:"Przedstaw proces budowy zdecentralizowanego rozproszonego komputerowego systemu sterowania automatycznego.", file:"pytanie_33_budowa_systemu.html"},
 ]},

 {name:"Wspomaganie decyzji", items:[
   {n:42, p:"sswd", t:"Proces decyzyjny – czym jest i jakie są jego niezbędne elementy; system wspomagania decyzji – funkcje, idee działania, możliwe elementy architektury.", file:"pytanie_42_proces_decyzyjny.html"},
   {n:35, p:"sswd", t:"Przedstaw zadania systemu wspomagania decyzji i możliwy model jego współpracy z komputerowym systemem sterowania automatycznego.", file:"pytanie_35_swd_i_kss.html"},
   {n:43, p:"sswd", t:"Wieloatrybutowe zagadnienia decyzyjne – charakterystyka i wybrana metoda rozwiązywania.", file:"pytanie_43_wieloatrybutowe.html"},
   {n:45, p:"sswd", t:"Wielocelowe zagadnienia decyzyjne – algorytmy rozwiązywania z uwzględnieniem przyjętego porządku Pareto.", file:"pytanie_45_pareto.html"},
   {n:46, p:"sswd", t:"Wielocelowe zagadnienia decyzyjne – algorytmy rozwiązywania z uwzględnieniem przyjętego porządku leksykograficznego.", file:"pytanie_46_leksykograficzny.html"},
   {n:44, p:"sswd", t:"Analizy wrażliwości w zagadnieniach decyzyjnych na przykładzie zagadnień liniowych – cele, przykłady możliwości realizacji.", file:"pytanie_44_wrazliwosc.html"},
   {n:36, p:"sswd", t:"Przedstaw realizację algorytmu Dantziga–Wolfe’a w hierarchicznym systemie wspomagania decyzji.", file:"pytanie_36_dantzig_wolfe.html"},
 ]},

 {name:"Inżynieria wiedzy", items:[
   {n:47, p:"siw", t:"Wyjaśnij pojęcia i podaj przykłady zastosowania predykatu, reguły produkcji, reguły decyzyjnej oraz klauzuli.", file:"pytanie_47_predykat_reguly_klauzule.html"},
   {n:48, p:"siw", t:"Wymień i opisz podstawowe metody wnioskowania dedukcyjnego na podstawie faktów oraz na podstawie celów.", file:"pytanie_48_wnioskowanie.html"},
   {n:49, p:"siw", t:"Przedstaw i opisz podstawową strukturę systemu ekspertowego."},
   {n:50, p:"siw", t:"Opisz działanie i przedstaw cechy algorytmu A*."},
 ]},

 {name:"Zarządzanie projektem i jakością", items:[
   {n:25, p:"app", t:"Przedstaw typowe procesy w zarządzaniu projektem."},
   {n:26, p:"app", t:"Struktura i zawartość dokumentów w typowym systemie zarządzania jakością w zakładzie produkcyjnym."},
 ]},

];
