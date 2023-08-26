import { DataTable } from "@cucumber/cucumber";

export function aspectsFromTable(dataTable: DataTable) {
  const reqs = dataTable.hashes();
  const aspects = reqs.reduce((obj, req) => {
    if (req.aspect == null || req.aspect === "") {
      throw new Error("Aspect is required. Did you forget an `aspect` header?");
    }

    obj[req.aspect] = Number(req.amount ?? 1);
    return obj;
  }, {} as Record<string, number>);
  return aspects;
}
