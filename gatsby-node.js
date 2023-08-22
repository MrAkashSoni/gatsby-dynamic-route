exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  createPage({
    path: "/states",
    component: require.resolve("./src/pages/states"),
  });

  createPage({
    path: "/states/city",
    component: require.resolve("./src/pages/states/city"),
  });

  createPage({
    path: "/states/city/station",
    component: require.resolve("./src/pages/states/city/station"),
  });

  // createPage({
  //   path: "/states/:state_code",
  //   component: require.resolve("./src/pages/states/stateDetails.js"),
  // });

  // createPage({
  //   path: "/states/:state_code/:city",
  //   component: require.resolve("./src/pages/states/cityDetails.js.js"),
  // });

};
