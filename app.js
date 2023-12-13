import {
  SplitRumAgent,
  webVitals,
  routeChanges,
  tti,
} from "@splitsoftware/browser-rum-agent";

const authorizationKey = "SDK_KEY";
const userKey = "user" + Math.floor(Math.random() * 100);

var SplitFactory = require("@splitsoftware/splitio").SplitFactory;

// Instantiate the SDK
var factory = SplitFactory({
  core: {
    authorizationKey: authorizationKey,
    // key represents your internal user id, or the account id that
    // the user belongs to.
    // This could also be a cookie you generate for anonymous users
    key: userKey,
  },
});

// And get the client instance you'll use
var client = factory.client();

SplitRumAgent.setup(authorizationKey).addIdentities([
  { key: userKey, trafficType: "user" },
]);

SplitRumAgent.register(webVitals());
SplitRumAgent.register(tti());
SplitRumAgent.register(routeChanges());

console.log(userKey);

client.on(client.Event.SDK_READY, function () {
  var treatment = client.getTreatment("flag_test");
  console.log(treatment);
  if (treatment == "on") {
    document.querySelector("#app").innerHTML = `
    <h3>Welcome to My Demo Page</h3>
    <p>This is a short example of HTML.</p>
    <p>flag: ${treatment}</p>
    `;
  } else {
    document.querySelector("#app").innerHTML = `
    <h4>Welcome to My Demo Page</h4>
    <p>This is a short example of HTML.</p>
    <p>flag: ${treatment}</p>`;
  }
});
