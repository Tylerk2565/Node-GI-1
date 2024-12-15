const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();

console.log(lngDetector.detect('Es macht gut', 2));
console.log(lngDetector.detect('Dobrá práce', 2));
console.log(lngDetector.detect('Gwaith da', 2));