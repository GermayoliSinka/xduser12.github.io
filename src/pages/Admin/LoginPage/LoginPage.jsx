import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginRequest } from '../../../redux/features/auth/auth-slice.js';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //hooks
  let navigate = useNavigate();
  //redux
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  // effects
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  // handlers
  const handleLogin = (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    dispatch(loginRequest(user));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-4 my-3">
          <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="badge text-bg-danger">This field is required</span>
                )}
                <div className="form-text">We will never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <span className="badge text-bg-danger">This field is required</span>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
