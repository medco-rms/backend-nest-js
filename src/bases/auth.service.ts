import crypto from 'crypto';
import { auth_client } from '../../src/lib/auth';
import { fromNodeHeaders } from 'better-auth/node';
import { handleError } from '../../src/lib/util';
import dataSource from '../../src/data-source';
import { Request, Response } from 'express';

export class AuthService {
  constructor() {}

  get_random_password = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars[crypto.randomInt(0, chars.length)];
    }

    return password;
  };

  auth_signup = async ({
    data,
    after_func,
    success_message = 'Account created successfully. Please check your email to verify your account.',
    res,
    includePasswordInEmailTemplate = false,
  }: {
    data: {
      email: string;
      password: string;
      name: string;
    };
    after_func: ({
      better_auth_id,
      tx,
    }: {
      better_auth_id: string;
      tx: any;
    }) => Promise<void>;
    success_message?: string;
    res: Response;
    includePasswordInEmailTemplate?: boolean;
  }) => {
    let Better_auth_response: any = null;
    let responseHeaders: any = null;

    try {
      const { response, headers } = await auth_client({
        password: includePasswordInEmailTemplate ? data?.password : undefined,
      }).api.signUpEmail({
        returnHeaders: true,
        body: data,
      });

      Better_auth_response = response;
      responseHeaders = headers;

      const result = await dataSource.transaction(async (tx) => {
        await after_func({
          better_auth_id: response?.user?.id,
          tx,
        });

        return response;
      });

      // Apply session headers/cookies from better-auth to the response
      if (responseHeaders) {
        Object.entries(responseHeaders).forEach(([key, value]) => {
          res.setHeader(key, value as string);
        });
      }

      return {
        message: success_message,
        data: result,
        statusCode: 201,
      };
    } catch (err: any) {
      if (Better_auth_response?.user?.token) {
        this.auth_delete_user({
          token: Better_auth_response?.token,
        });

        // for none BA error
        return {
          error: handleError(err),
          statusCode: 400,
        };
      }

      return {
        error: err.message,
        statusCode: 400,
      };
    }
  };

  auth_verify_password = async ({
    password,
    req,
  }: {
    password: string;
    req: Request;
  }) => {
    try {
      const session = await auth_client({}).api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (!session) {
        return {
          status: 401,
          error: 'No active session',
        };
      }

      const { status } = await auth_client({}).api.verifyPassword({
        body: {
          password,
        },
        headers: fromNodeHeaders(req.headers),
      });

      return { data: status };
    } catch (rollbackError: any) {
      return { status: 400, error: handleError(rollbackError) };
    }
  };

  auth_delete_user = async ({ token }: { token: string }) => {
    try {
      await auth_client({}).api.deleteUser({
        body: {
          token: token,
        },
      });
    } catch (rollbackError: any) {
      return { statusCode: 400, error: handleError(rollbackError) };
    }
  };
}
