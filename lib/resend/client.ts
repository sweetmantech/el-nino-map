import { Resend } from 'resend'

const resendClient = new Resend(process.env.RESEND_API_KEY as string)

export default resendClient
