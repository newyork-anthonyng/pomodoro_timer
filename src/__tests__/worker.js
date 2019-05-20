import "../__mocks__/workerEnvironment";
import "../worker";

it("should work", () => {
  console.log(self.addEventListener);
});
