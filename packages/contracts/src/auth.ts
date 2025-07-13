import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const signInRequestDtoSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
export type SignInRequestDto = z.infer<typeof signInRequestDtoSchema>;

const signInResponseDtoSchema = z.object({});
export type SignInResponseDto = z.infer<typeof signInResponseDtoSchema>;

const signUpRequestDtoSchema = z.object({
  email: z.string().trim().email().nonempty(),
  password: z.string().nonempty(),
  firstName: z.string().trim().nonempty(),
  lastName: z.string().trim().nonempty(),
});
export type SignUpRequestDto = z.infer<typeof signUpRequestDtoSchema>;

const signUpResponseDtoSchema = z.object({});
export type SignUpResponseDto = z.infer<typeof signUpResponseDtoSchema>;

const getProfileResponseDtoSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email().nonempty(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});
export type GetProfileResponseDto = z.infer<typeof getProfileResponseDtoSchema>;

export const authContract = c.router({
  signIn: {
    method: 'POST',
    path: 'auth/sign-in',
    body: signInRequestDtoSchema,
    responses: {
      200: signInResponseDtoSchema,
    },
  },
  signUp: {
    method: 'POST',
    path: 'auth/sign-up',
    body: signUpRequestDtoSchema,
    responses: {
      200: signUpResponseDtoSchema,
    },
  },
  getProfile: {
    method: 'GET',
    path: 'auth/profile',
    responses: {
      200: getProfileResponseDtoSchema,
    },
  },
});
