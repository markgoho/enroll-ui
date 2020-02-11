import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { AgencyStaffEntity } from './agency-staff.models';
import * as AgencyStaffActions from './agency-staff.actions';

export const AGENCYSTAFF_FEATURE_KEY = 'agencyStaff';

function selectAgencyStaffId(a: AgencyStaffEntity): string {
  //In this case this would be optional since primary key is id
  return a._id;
}

export interface State extends EntityState<AgencyStaffEntity> {
  selectedId?: string | number; // which BrokerStaff record has been selected
  loaded: boolean; // has the BrokerStaff list been loaded
  error?: string | null; // last none error (if any)
}

export interface AgencyStaffPartialState {
  readonly [AGENCYSTAFF_FEATURE_KEY]: State;
}

export const agencyStaffAdapter: EntityAdapter<AgencyStaffEntity> = createEntityAdapter<
  AgencyStaffEntity
>({
  selectId: selectAgencyStaffId,
});

export const initialState: State = agencyStaffAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const agencyStaffReducer = createReducer(
  initialState,
  on(AgencyStaffActions.loadAgencyStaff, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    AgencyStaffActions.loadAgencyStaffSuccess,
    (state, { agencyStaff: brokerStaff }) =>
      agencyStaffAdapter.setAll(brokerStaff, { ...state, loaded: true })
  ),
  on(AgencyStaffActions.loadAgencyStaffFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return agencyStaffReducer(state, action);
}