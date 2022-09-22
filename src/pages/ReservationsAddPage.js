/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { getItems } from '../redux/item/itemReducer';
import { addReservation } from '../redux/reserv/reserv';
import './addReserv.css';

function ReservationsAddPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);
  const cars = useSelector((state) => state.items.items, shallowEqual) || [];
  const { register, handleSubmit } = useForm();

  function onSubmit({ item, city, date }) {
    return dispatch(addReservation(item, city, date));
  }

  function MySelect() {
    return (
      <select className="formitem" id="item" {...register('item')} name="item" placeholder="Car" required>
        {cars.map((car) => (
          <option key={car.name} value={car.name}>{car.name}</option>
        ))}
      </select>
    );
  }

  return (
    <div className="addreservpage">
      <h1>Add Reservation</h1>
      <div className="centered">
        <form className="myform2" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            {MySelect()}
          </div>
          <div className="form-group">
            <input className="formitem" type="text" {...register('city')} id="city" name="city" placeholder="City" required minLength="2" maxLength="30" />
          </div>
          <div className="form-group">
            <input className="formitem" type="date" {...register('date')} id="date" name="date" placeholder="Date" required />
          </div>
          <div className="button-wrapper">
            &nbsp;
            <button className="sbutton" type="submit">Submit</button>
            &nbsp;
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationsAddPage;