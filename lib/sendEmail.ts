import resendClient from './resend/client'

interface SendEmailParams {
  to: string
  hash: string
}

const sendEmail = async (params: SendEmailParams) => {
  const result = await resendClient.emails.send({
    from: 'EL NINO MAP <hi@[verified domain]>',
    to: [params.to],
    subject: 'You received EL NINO MAP airdrop!',
    html:
      '<strong>Transaction hash: ' +
      params.hash +
      '</strong><br><br><a href="https://basescan.org/tx/' +
      params.hash +
      '">View on BaseScan</a>',
  })

  return result
}

export default sendEmail
