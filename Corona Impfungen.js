// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;

/*Wähle das Bundesland
0 Baden-Würtemberg
1 Bayern
2 Brandenburg
3 Berlin
4 Bremen
5 Hamburg
6 Hessen
7 Mecklenburg-Vorpommern
8 Niedersachsen
9 NRW
10 Rheinland-Pfalz
11 Saarland
12 Sachsen-Anhalt
13 Sachsen
14 Schleswig-Holstein
15 Thüringen

*/

//Bundesland
const BL = 9

//Quelle: ZEIT ONLINE
const apiUrl = "https://interactive.zeit.de/cronjobs/2020/corona/impfzahlen.json"


const widget = await createWidget();

if (!config.runsInWidget) {
  await widget.presentSmall();
}

Script.setWidget(widget);
Script.complete();

async function createWidget() {

const data = await new Request(apiUrl).loadJSON();

const list = new ListWidget()
  
  if(Device.isUsingDarkAppearance()){
    const gradient = new LinearGradient()
    gradient.locations = [0, 1]
    gradient.colors = [
      new Color("111111"),
      new Color("222222")
    ]
    list.backgroundGradient = gradient
  }
  
  const header = list.addText("💉 Impfungen".toUpperCase())
  header.font = Font.mediumSystemFont(13)
  
  header.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();

  list.addSpacer();


  var impfGes=0;
  
  for (var i=0; i<16; i++) {
    impfGes=impfGes+data.bundeslaender[i].historical[0].value;
  }

  impfGes_dsp=impfGes.toLocaleString()
  
var impfGes_pro = impfGes/83020000*100;
  impfGes_pro=impfGes_pro.toFixed(2);
  
  label = list.addText("" + impfGes_dsp + " - " + impfGes_pro + "%");
  label.font = Font.boldSystemFont(12.5);
  label.textColor = Color.green();
  
  var label = list.addText("Impfungen Gesamt");
  label.font = Font.boldSystemFont(12);
  label.textOpacity = 0.5;
  label.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();
  
  list.addSpacer();
  
  var einwohner
  var BL_Text
  
  if (BL==0) {einwohner=11070000 ; BL_Text="BW"}
  if (BL==1) {einwohner=13080000 ; BL_Text="Bayern"}
  if (BL==2) {einwohner=2520000 ; BL_Text="BB"}
  if (BL==3) {einwohner=3769000 ; BL_Text="Berlin"}
  if (BL==4) {einwohner=681000 ; BL_Text="Bremen"}
  if (BL==5) {einwohner=1845000 ; BL_Text="Hamburg"}
  if (BL==6) {einwohner=6266000 ; BL_Text="Hessen"}
  if (BL==7) {einwohner=1610000 ; BL_Text="MV"}
  if (BL==8) {einwohner=7982000 ; BL_Text="NI"}
  if (BL==9) {einwohner=17947000 ; BL_Text="NRW"}
  if (BL==10) {einwohner=4085000 ; BL_Text="RP"}
  if (BL==11) {einwohner=987000 ; BL_Text="SL"}
  if (BL==12) {einwohner=2208000 ; BL_Text="ST"}
  if (BL==13) {einwohner=4078000 ; BL_Text="Sachsen"}
  if (BL==14) {einwohner=2890000 ; BL_Text="SH"}
  if (BL==15) {einwohner=2137000 ; BL_Text="TH"}
   
  var impfBL=data.bundeslaender[BL].historical[0].value;
  impfBL=impfBL.toLocaleString()
  var impfBL_pro=data.bundeslaender[BL].historical[0].value/einwohner*100;
  impfBL_pro=impfBL_pro.toFixed(2);
    
  label = list.addText("" + impfBL + " - " + impfBL_pro + "%");
  label.font = Font.boldSystemFont(12.5);
  label.textColor = Color.green()
  
  label = list.addText("Impfungen " + BL_Text );
  label.font = Font.boldSystemFont(12);
  label.textOpacity = 0.5;
  label.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();
  
  list.addSpacer();
  
  label = list.addText("Stand: ");
  label.font = Font.boldSystemFont(10);
  label.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();  
  
  label = list.addText("" + data.timestamp);
  label.font = Font.boldSystemFont(10);
  label.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();
  
  list.refreshAfterDate = new Date (Date.now() + 60*60*1000)
 return list;
}
