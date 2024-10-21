export enum PatientExamsStatus {
  SCHEDULED = 'Scheduled',
  IN_PROGRESS = 'InProgress',
  COMPLETED = 'Completed'
}

export interface GetPatientExamsFilters {
  date?: string
  status?: PatientExamsStatus
  patientName?: string
  patientId?: number
  tenantId: number
}