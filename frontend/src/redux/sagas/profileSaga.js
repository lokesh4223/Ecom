import { UPDATE_EMAIL, UPDATE_PROFILE } from '@/constants/constants';
import { ACCOUNT } from '@/constants/routes';
import { displayActionMessage } from '@/helpers/utils';
import { call, put, select } from 'redux-saga/effects';
import { history } from '@/routers/AppRouter';
import apiService from '@/services/apiService';
import { setLoading } from '../actions/miscActions';
import { updateProfileSuccess } from '../actions/profileActions';

function* profileSaga({ type, payload }) {
  switch (type) {
    case UPDATE_EMAIL: {
      // Email update functionality would need to be implemented in the backend
      try {
        yield put(setLoading(false));
        yield call(history.push, '/profile');
        yield call(displayActionMessage, 'Email update functionality needs to be implemented in the backend.', 'info');
      } catch (e) {
        console.log(e.message);
      }
      break;
    }
    case UPDATE_PROFILE: {
      try {
        const state = yield select();
        const { email, password } = payload.credentials;
        const { avatarFile, bannerFile } = payload.files;

        yield put(setLoading(true));

        // For now, we'll just update the profile without handling file uploads
        // File upload functionality would need to be implemented in the backend
        const updates = { ...payload.updates };
        
        const result = yield call(apiService.updateProfile, state.auth.id, updates);
        yield put(updateProfileSuccess(updates));

        yield put(setLoading(false));
        yield call(history.push, ACCOUNT);
        yield call(displayActionMessage, 'Profile Updated Successfully!', 'success');
      } catch (e) {
        console.log(e);
        yield put(setLoading(false));
        yield call(displayActionMessage, `:( Failed to update profile. ${e.message ? e.message : ''}`, 'error');
      }
      break;
    }
    default: {
      // Remove error for unexpected action types
      console.log('Unexpected Action Type:', type);
    }
  }
}

export default profileSaga;