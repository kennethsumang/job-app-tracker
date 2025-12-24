import vine from '@vinejs/vine'

export type JobApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'shortlisted'
  | 'interview_scheduled'
  | 'interviewed'
  | 'offered'
  | 'accepted'
  | 'rejected'
  | 'withdrawn'

export type JobApplicationWorkSetup = 'remote' | 'on_site' | 'hybrid'

export const fetchJobApplicationsValidator = vine.compile(
  vine.object({
    jobApplicationGroupId: vine.string().uuid().optional(),
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    status: vine
      .string()
      .in([
        'draft',
        'submitted',
        'under_review',
        'shortlisted',
        'interview_scheduled',
        'interviewed',
        'offered',
        'accepted',
        'rejected',
        'withdrawn',
      ])
      .optional(),
    searchText: vine.string().maxLength(255).optional(),
    workSetup: vine.string().in(['remote', 'on_site', 'hybrid']).optional(),
    // Add more filters as needed
  })
)

export const createJobApplicationValidator = vine.compile(
  vine.object({
    jobApplicationGroupId: vine.string().uuid(),
    companyName: vine.string().maxLength(100),
    position: vine.string().maxLength(100),
    requirements: vine.string().optional(),
    responsibilities: vine.string().optional(),
    status: vine
      .string()
      .in([
        'draft',
        'submitted',
        'under_review',
        'shortlisted',
        'interview_scheduled',
        'interviewed',
        'offered',
        'accepted',
        'rejected',
        'withdrawn',
      ]),
    workSetup: vine.string().in(['remote', 'on_site', 'hybrid']),
    expectedSalary: vine.number().positive().optional(),
    coverLetter: vine.string().optional(),
    resume: vine.string().optional(),
    source: vine.string().maxLength(100).optional(),
    notes: vine.string().optional(),
  })
)

export const updateJobApplicationValidator = vine.compile(
  vine.object({
    companyName: vine.string().maxLength(100).optional(),
    position: vine.string().maxLength(100).optional(),
    requirements: vine.string().optional(),
    responsibilities: vine.string().optional(),
    status: vine
      .string()
      .in([
        'draft',
        'submitted',
        'under_review',
        'shortlisted',
        'interview_scheduled',
        'interviewed',
        'offered',
        'accepted',
        'rejected',
        'withdrawn',
      ])
      .optional(),
    workSetup: vine.string().in(['remote', 'on_site', 'hybrid']).optional(),
    expectedSalary: vine.number().positive().optional(),
    coverLetter: vine.string().optional(),
    resume: vine.string().optional(),
    source: vine.string().maxLength(100).optional(),
    notes: vine.string().optional(),
  })
)
