// src/app/signin/sign-in-form.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { Form } from '@core/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/validators/login.schema';

const initialValues: LoginSchema = {
  email: '',
  password: '',
};

export default function SignInForm() {
  const [error, setError] = useState<string | null>(null); // State to hold authentication error

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const result = await signIn('credentials', {
      redirect: false,
      ...data,
    });

    if (result?.error) {
      setError(result.error); // Set error if authentication fails
    } else {
      // Handle successful authentication if needed
      // Redirect to homepage or do any further action
      window.location.href = '/'; // Example redirection
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            {error && <p className="text-red-500">{error}</p>} {/* Display authentication error */}
            <div className="flex items-center justify-between pb-2">
              {/* Uncomment if you want to include Remember Me and Forgot Password links */}
              {/* <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                className="[&>label>span]:font-medium"
              /> */}
              {/* <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link> */}
            </div>
            <Button className="w-full" type="submit" size="lg">
              <span>Sign in</span>
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      {/* Uncomment to show Sign Up link */}
      {/* <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text> */}
    </>
  );
}
