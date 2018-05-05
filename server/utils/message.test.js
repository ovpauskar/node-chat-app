const expect = require("expect");

var {generateMessage} = require("./generateMessage");

describe("Generate Message",()=>{
it("should generate correct message object", ()=>{
  var from = "Om";
  var text ="hello, how are";
  var message = generateMessage(from, text);

  expect(message.createdAt).toBeA("number");
  expect(message.from);
  expect(message.text);

});
});
