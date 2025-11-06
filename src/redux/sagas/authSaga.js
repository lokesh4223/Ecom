import {
  ON_AUTHSTATE_FAIL,
  ON_AUTHSTATE_SUCCESS, RESET_PASSWORD,
  SET_AUTH_PERSISTENCE,
  SIGNIN, SIGNIN_WITH_FACEBOOK,
  SIGNIN_WITH_GITHUB, SIGNIN_WITH_GOOGLE,
  SIGNOUT, SIGNUP
} from '@/constants/constants';
import { SIGNIN as ROUTE_SIGNIN, ADMIN_DASHBOARD } from '@/constants/routes';
import defaultAvatar from '@/images/defaultAvatar.jpg';
import defaultBanner from '@/images/defaultBanner.jpg';
import { call, put } from 'redux-saga/effects';
import { signInSuccess, signOutSuccess } from '@/redux/actions/authActions';
import { clearBasket, setBasketItems } from '@/redux/actions/basketActions';
import { resetCheckout } from '@/redux/actions/checkoutActions';
import { resetFilter } from '@/redux/actions/filterActions';
import { setAuthenticating, setAuthStatus } from '@/redux/actions/miscActions';
import { clearProfile, setProfile } from '@/redux/actions/profileActions';
import { history } from '@/routers/AppRouter';
import apiService from '@/services/apiService';

function* handleError(e) {
  const obj = { success: false, type: 'auth', isError: true };
  yield put(setAuthenticating(false));
  
  console.log('API Error:', e); // Log the actual error for debugging

  // Handle different error types
  if (e.message) {
    if (e.message.includes('Network error')) {
      yield put(setAuthStatus({ ...obj, message: 'Network error has occured. Please try again.' }));
    } else if (e.message.includes('already exists')) {
      yield put(setAuthStatus({ ...obj, message: 'Email is already in use. Please use another email' }));
    } else if (e.message.includes('Invalid credentials')) {
      yield put(setAuthStatus({ ...obj, message: 'Incorrect email or password' }));
    } else if (e.message.includes('not found')) {
      yield put(setAuthStatus({ ...obj, message: 'Incorrect email or password' }));
    } else if (e.message.includes('reset password')) {
      yield put(setAuthStatus({ ...obj, message: 'Failed to send password reset email. Did you type your email correctly?' }));
    } else {
      yield put(setAuthStatus({ ...obj, message: e.message || 'An unknown error occurred' }));
    }
  } else {
    yield put(setAuthStatus({ ...obj, message: e.message || 'An unknown error occurred' }));
  }
}

function* initRequest() {
  yield put(setAuthenticating());
  yield put(setAuthStatus({}));
}

function* authSaga({ type, payload }) {
  switch (type) {
    case SIGNIN:
      try {
        yield initRequest();
        const userData = yield call(apiService.signIn, payload.email, payload.password);
        yield put(signInSuccess({
          id: userData.id,
          role: userData.role,
          provider: 'password'
        }));
        yield put(setProfile(userData));
        yield put(setBasketItems(userData.basket || []));
        yield put(setAuthStatus({
          success: true,
          type: 'auth',
          isError: false,
          message: 'Successfully signed in. Redirecting...'
        }));
        yield put(setAuthenticating(false));
        yield call(history.push, '/');
      } catch (e) {
        yield handleError(e);
      }
      break;
    case SIGNUP:
      try {
        yield initRequest();
        
        const userData = yield call(apiService.createAccount, payload.email, payload.password, payload.fullname);
        const user = {
          id: userData.id,
          fullname: userData.fullname,
          avatar: defaultAvatar,
          banner: defaultBanner,
          email: userData.email,
          address: '',
          basket: [],
          mobile: { data: {} },
          role: payload.isAdmin ? 'ADMIN' : 'USER', // Set role based on isAdmin flag
          dateJoined: userData.dateJoined || new Date().getTime()
        };
        
        yield put(setProfile(user));
        yield put(signInSuccess({
          id: userData.id,
          role: user.role,
          provider: 'password'
        }));
        yield put(setAuthStatus({
          success: true,
          type: 'auth',
          isError: false,
          message: payload.isAdmin 
            ? 'Successfully created admin account. Redirecting to admin dashboard...' 
            : 'Successfully created account. Redirecting...'
        }));
        yield put(setAuthenticating(false));
        
        // Redirect based on user role
        if (payload.isAdmin) {
          yield call(history.push, ADMIN_DASHBOARD);
        } else {
          yield call(history.push, '/');
        }
      } catch (e) {
        yield handleError(e);
      }
      break;
    case SIGNOUT: {
      try {
        yield initRequest();
        // No API call needed for sign out in this implementation
        yield put(clearBasket());
        yield put(clearProfile());
        yield put(resetFilter());
        yield put(resetCheckout());
        yield put(signOutSuccess());
        yield put(setAuthenticating(false));
        yield call(history.push, ROUTE_SIGNIN);
      } catch (e) {
        console.log(e);
      }
      break;
    }
    case RESET_PASSWORD: {
      // Reset password functionality would need to be implemented in the backend
      yield put(setAuthStatus({
        success: false,
        type: 'reset',
        message: 'Password reset functionality needs to be implemented in the backend.'
      }));
      yield put(setAuthenticating(false));
      break;
    }
    case ON_AUTHSTATE_SUCCESS: {
      // This case is for handling authenticated users
      // We'll use the user data from the payload
      const user = payload;
      
      if (user) { // if user exists
        yield put(setProfile(user));
        yield put(setBasketItems(user.basket || []));
        yield put(signInSuccess({
          id: user.id,
          role: user.role,
          provider: 'password'
        }));
      }

      yield put(setAuthStatus({
        success: true,
        type: 'auth',
        isError: false,
        message: 'Successfully signed in. Redirecting...'
      }));
      yield put(setAuthenticating(false));
      break;
    }
    case ON_AUTHSTATE_FAIL: {
      yield put(clearProfile());
      yield put(signOutSuccess());
      break;
    }
    default: {
      // Remove error for unexpected action types
      console.log('Unexpected Action Type:', type);
    }
  }
}

export default authSaga;