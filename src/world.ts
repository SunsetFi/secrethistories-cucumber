class BookOfHoursWorld {
  public startedRecipeId: string | undefined;
  public startedRecipeTimeRemaining: number | undefined;
  public checkpoints: Record<string, any> = {};
}

export { BookOfHoursWorld };
