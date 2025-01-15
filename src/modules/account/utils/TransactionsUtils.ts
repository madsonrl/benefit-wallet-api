export function getCategoryFromTransaction(mcc: string): string {
    let category: "foodBalance" | "mealBalance" | "cashBalance";
    if (["5411", "5412"].includes(mcc)) {
        category = "foodBalance";
    } else if (["5811", "5812"].includes(mcc)) {
        category = "mealBalance";
    } else {
        category = "cashBalance";
    }

    return category;
}
