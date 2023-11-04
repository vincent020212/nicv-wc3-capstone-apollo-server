import depthLimit from "graphql-depth-limit";
import queryComplexity, { simpleEstimator } from "graphql-query-complexity";

const MAX_QUERY_DEPTH = 3;
const MAX_QUERY_COMPLEXITY = 30;

const depthLimitValidator = () => depthLimit(MAX_QUERY_DEPTH);

const queryComplexityValidator = () => {
  queryComplexity({
    maximumComplexity: MAX_QUERY_COMPLEXITY,

    estimators: [
      simpleEstimator({
        defaultComplexity: 1,
      }),
    ],
  });
};

export { depthLimitValidator, queryComplexityValidator };
