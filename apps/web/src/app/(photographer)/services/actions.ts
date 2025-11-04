'use server';

export const createService = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  console.log(data);
};
