/*
  RESTful plans
*/
const app = require("express").Router();

const {
  createPlan,
  findPlans,
  findPlan,
  updatePlan,
  destroyPlan
} = require("../models/plans");

/*
  http --json \
    GET 'http://localhost:8000/plans'
*/
app.get("/", (req, res) => {
  findPlans(req).then(plans => {
    res.format({
      "text/html": () => res.render("plans/index", { plans }),
      "application/json": () => res.json(plans)
    });
  });
});

app.get("/new", (req, res) => {
  res.render("plans/new");
});

/*
  http --json \
    GET 'http://localhost:8000/plans/1'
*/
app.get("/:id", (req, res) => {
  findPlan(req).then(plans => {
    const plan = plans[0];

    res.format({
      "text/html": () => res.render("plans/show", { plan }),
      "application/json": () => res.json(plan)
    });
  });
});

/*
  http --json \
    POST 'http://localhost:8000/plans' \
    title='A Short Title'
*/
app.post("/", (req, res) => {
  createPlan(req).then(plans => {
    const plan = plans[0];

    res.format({
      "text/html": () => res.redirect(`/plans/${plan.id}`),
      "application/json": () => res.json(plan)
    });
  });
});

/*
  http --json \
    PATCH 'http://localhost:8000/plans/1' \
    title='COOOL!' archived=true
*/
app.patch("/:id", (req, res) => {
  updatePlan(req).then(plans => res.json(plans[0]));
});

/*
  http --json \
    DELETE 'http://localhost:8000/plans/1'
*/
app.delete("/:id", (req, res) => {
  destroyPlan(req).then(() => res.sendStatus(204));
});

module.exports = app;
