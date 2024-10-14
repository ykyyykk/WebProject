import should from "should";
import { max } from "../lib/max.js";

describe("#max", () => {
  it("取得array中的最大值", (done) => {
    var maximum = max([1, 10, 100, 1000]);
    maximum.should.equal(1000);
    done();
  });
  it("當array是空的需回傳undefined", (done) => {
    const maximum = max([]);
    (maximum === undefined).should.be.true;
    done();
  });
});
