import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "./appointmentsSlice";
// TODO (Task 6.7): import addAppointment and cancelAppointment as well

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((s) => s.appointments);
  const user = useSelector((s) => s.auth.user);
  const [form, setForm] = useState({ doctor: "", reason: "", scheduledFor: "" });

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO (Task 6.7): dispatch(addAppointment(form)) and clear the form on success
  };

  return (
    <div className="page">
      <h2>Welcome back, {user?.name}</h2>
      <p className="muted">Your upcoming appointment requests.</p>

      <div className="card">
        <h3>Book a new appointment</h3>
        <form onSubmit={onSubmit}>
          <label>Doctor</label>
          <input name="doctor" value={form.doctor} onChange={onChange} />
          <label>Reason</label>
          <input name="reason" value={form.reason} onChange={onChange} />
          <label>Date and time</label>
          <input
            name="scheduledFor"
            type="datetime-local"
            value={form.scheduledFor}
            onChange={onChange}
          />
          <button>Request appointment</button>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Reason</th>
            <th>When</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr key={a._id}>
              <td>{a.doctor}</td>
              <td>{a.reason}</td>
              <td>{new Date(a.scheduledFor).toLocaleString()}</td>
              <td>
                <span className={`badge ${a.status}`}>{a.status}</span>
              </td>
              <td>
                {/* TODO (Task 6.8): a Cancel button that dispatches cancelAppointment(a._id) */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
