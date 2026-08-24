import 'dotenv/config';
import { betterAuth } from 'better-auth';
import nodemailer from 'nodemailer';
import { admin } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../src/generated/prisma/client';
import { emailOTP } from 'better-auth/plugins';

type PrismaUser = {
  email: string;
  name?: string | null;
};

const BACKEND_URL = new URL(
  process.env.BACKEND_URL ||
    process.env.BETTER_AUTH_URL ||
    'http://localhost:3000',
);
const FRONTEND_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : 'http://localhost:5173';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM ?? SMTP_USER ?? 'no-reply@localhost';
const hasMailer = Boolean(SMTP_USER && SMTP_PASS);
const NODE_ENV = process.env.SMTP_PASS;

const app: {
  url: string;
  frontendUrl: string;
  name: string;
  fromEmail: string;
} = {
  url: BACKEND_URL.toString(),
  frontendUrl: FRONTEND_URL,
  name: 'Medco-RMS',
  fromEmail: SMTP_FROM,
};

const transporter = hasMailer
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null;

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('POSTGRES_URL is missing');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

export const auth_client = ({
  password,
}: {
  password?: string | undefined;
}) => {
  return betterAuth({
    database: prismaAdapter(prisma, { provider: 'postgresql' }),
    secret: process.env.BETTER_AUTH_SECRET,
    user: {
      additionalFields: {
        role: {
          type: 'string',
          required: false,
          defaultValue: 'admin',
          input: false,
        },
      },
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      requireEmailVerification: hasMailer,
      resetPasswordTokenExpiresIn: 3600,
    },
    onPasswordChange: async ({ user }: { user: PrismaUser }) => {
      if (!transporter) {
        return;
      }

      await transporter.sendMail({
        from: `"${app?.name}" <${app?.fromEmail}>`,
        to: user.email,
        subject: 'Your password was changed',
        html: `<p>Hello ${
          user.name || ''
        }, your password was successfully changed. If this wasn't you, please reset your password immediately.</p>`,
      });
    },
    changePassword: {
      requireCurrentPassword: true,
      autoSignIn: false,
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url, token }) => {
        if (!transporter) {
          return;
        }

        await transporter.sendMail({
          from: `"${app?.name}" <${app?.fromEmail}>`,
          to: user?.email,
          subject: 'Welcome to Medco-RMS School MGT System 🎉',
          html: `
          <h2>Welcome, ${user.name}!</h2>
          <p>Click <a href="${
            app?.frontendUrl
          }/auth/verify-email/?token=${token}&email=${
            user.email
          }">here</a> to verify your email and start using your account.</p>
           ${
             password ? `<p>Your password is <b><u>${password}</u></b></p>` : ''
           } 
        `,
        });
      },
      sendOnSignUp: hasMailer,
      autoSignInAfterVerification: false,
      expiresIn: 3600,
      afterEmailVerification: async (user) => {
        if (!transporter) {
          return;
        }

        await transporter.sendMail({
          from: `"${app?.name}" <${app?.fromEmail}>`,
          to: user?.email,
          subject: 'Email Verified Successfully 🎉',
          html: `
            <h2>Congratulations, ${user.name}!</h2>
            <p>Your email has been successfully verified. You can now start using your account.</p>
            <p>Click <a href="${app?.url}/auth/login">here</a> to go to the app dashboard.</p>
          `,
        });
      },
    },
    plugins: [
      admin(),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          if (!transporter) {
            return;
          }

          if (type === 'forget-password') {
            await transporter.sendMail({
              from: `"${app?.name}" <${app?.fromEmail}>`,
              to: email,
              subject: 'Reset your password',
              html: `<p>Please use this <strong>${otp}</strong> one-time-password for reset. 
              click here <a href="${app?.frontendUrl}/auth/reset-password/?&email=${email}">here</a> to begin.`,
            });
          }
        },
      }),
    ],
    trustedOrigins: [app?.url, app?.frontendUrl],
    cookies: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  });
};

export const auth = auth_client({});

export default auth;
