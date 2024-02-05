import { useAppDispatch, useAppSelector } from '../../redux/app/hooks.js';
import { increment, amountAdded } from '../../redux/features/counter/counter-slice.js';

export default function ReduxExamplesPage() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const handleClickAddBy1 = () => dispatch(increment());
  const handleClickAddBy5 = () => dispatch(amountAdded(5));
  return (
    <div className="container">
      <h1>Redux Examples Page</h1>
      <h2>Count: {count}</h2>
      <button className="btn btn-primary" onClick={handleClickAddBy1}>
        Add 1
      </button>
      <button className="btn btn-primary mx-3" onClick={handleClickAddBy5}>
        Add 5
      </button>
    </div>
  );
}
