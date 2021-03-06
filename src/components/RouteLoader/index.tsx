import {
  AsyncComponent,
  ComponentType,
  Path,
  Router,
} from "@hydrophobefireman/ui-lib";
import {
  Object_values,
  Object_entries as entries,
} from "@hydrophobefireman/j-utils";

import { ChunkLoading } from "../ChunkLoadingComponent";
import { NotFound } from "../../pages/404";

const getDefault: <T>(mod: { default: T }) => T = (mod) => mod.default;

const componentMap = {
  "/": () => import("../../pages/Landing").then(getDefault),
  "/t/:time": () => import("../../pages/Result").then(getDefault),
};

Object_values(componentMap).forEach((x) => x());

export function RouteLoader() {
  return (
    <Router fallbackComponent={NotFound}>
      {entries(componentMap).map(([path, comp]) => (
        <Path match={path} component={RouteComponent} render={comp} />
      ))}
    </Router>
  );
}

function RouteComponent({ match, render, params }) {
  return (
    <section data-app-state={match} class="route-section">
      <AsyncComponent
        componentPromise={() =>
          render().then((R: ComponentType) => <R params={params} />)
        }
        fallback={ChunkLoading}
      />
    </section>
  );
}
