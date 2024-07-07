import supabase from "./supabase";

export async function getTableRowCount(tableName) {
  const { count, error } = await supabase
    .from(tableName)
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error fetching row count:", error);
    return null;
  }
  return count;
}
