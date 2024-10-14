import should from "should"; //這是有用的 不要刪 也不要uninstall
import { min } from "../lib/min.js";

describe("#min", () => {
  it("需回傳array中的最小值", (done) => {
    var minimum = min([1, 10, 100, 1000]);
    minimum.should.equal(1);
    done();
  });
  it("當array是空的 需回傳 undefined", (done) => {
    var minimum = min([]);
    (minimum === undefined).should.be.true;
    done();
  });
});
