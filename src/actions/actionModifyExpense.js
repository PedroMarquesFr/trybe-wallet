export const deleteExpense = (id) => {
  console.log('id no action: ', id);
  return { type: 'DELETE_EXP',
    expense: { id } };
};

export const editExpense = (expense) => ({
  type: 'EDIT_EXP',
  expense,
});

export const editChangeState = (boolValue) => ({
  type: 'EDIT_STATE',
  expense: boolValue,
});

export const idBeingEdited = (id) => ({
  type: 'CHANGE_ID',
  expense: id,
});
