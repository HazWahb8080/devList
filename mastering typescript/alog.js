import React from "react";

function alog() {
  function decodeString(str) {
    let decodedString = [];
    for (let i in str) {
      // first check if lowercase
      if (
        str[i] === str[i].toLowerCase() &&
        str.charCodeAt(i) - 96 >= 0
      ) {
        let code = 27 - (str.charCodeAt(i) - 96);
        decodedString.push(String.fromCharCode(code + 96));
      } else {
        decodedString.push(str[i]);
      }
    }
    return decodedString.toString().replaceAll(",", "");
  }
  let testString = "Yvzs! I xzm'g yvorvev Lzmxv olhg srh qly zg gsv xlolmb!!";
  console.log(decodeString(testString));








  return <></>;
}

export default alog;
