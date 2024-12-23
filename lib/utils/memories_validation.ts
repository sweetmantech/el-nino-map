import JoiBase from 'joi'

export const validation = JoiBase.object({
  url: JoiBase.string().messages({
    'string.empty': `Please fill out this field.`,
  }),
  content: JoiBase.allow(),
})
