import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import {
  SendEmail,
  SendEmailParams,
} from 'src/domain/core/application/mail/send-email'

@Injectable()
export class NodeMailerSendEmailService implements SendEmail {
  constructor(private mailerService: MailerService) {}

  async send({ recipientEmail, message, subject }: SendEmailParams) {
    await this.mailerService.sendMail({
      to: recipientEmail,
      subject: subject ?? 'Guild HUB',
      html: `${message}`,
    })
  }
}
