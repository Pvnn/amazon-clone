import { convertCurrency } from "../../scripts/util.js";

console.log("test suite: format currency");

console.log("Converts cents to dollars");

if (convertCurrency(2095) === '20.95'){   //Basic Testcase
  console.log("Passed");
}else{
  console.log("Failed");
}

console.log("Works with 0");

if (convertCurrency(0) === '0.00'){    //Edge Case
  console.log("Passed");
}else{
  console.log("Failed");
}

console.log("Rounds up to the nearest cent");

if (convertCurrency(2000.5) === '20.01'){   //Edge Case
  console.log("Passed");
}else{
  console.log("Failed");
}

console.log("Rounds down to the nearest cent");

if (convertCurrency(2000.4) === '20.00'){   //Edge Case
  console.log("Passed");
}else{
  console.log("Failed");
}