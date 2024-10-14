import should from "should";
import { average } from "../lib/average.js";

describe("#average", () => {
  it("需回傳array的平均 2.5", (done) => {
    var avg = average([1, 2, 3, 4]);
    avg.should.equal(2.5);
    done();
  });
  it("如果array是空的需回傳 NaN", (done) => {
    var avg = average([]);
    isNaN(avg).should.be.true;
    done();
  });
});
