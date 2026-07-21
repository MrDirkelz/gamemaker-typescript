enum State {
  Idle,
  Run = 4,
  Jump,
}

function describe(value: unknown) {
  const empty = null;
  return `${typeof value}:${State.Jump}:${empty}`;
}
