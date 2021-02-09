import { shield } from "graphql-shield";
import messRules from "./mess/rules.js";

export default shield({
    ...messRules,
});