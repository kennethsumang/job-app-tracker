import vine from '@vinejs/vine'

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
