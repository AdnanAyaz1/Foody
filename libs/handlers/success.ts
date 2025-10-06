export const ApiResponse = (
  message: string,
  statusCode: number,
  data?: Record<string, any>,
  jwtToken?: string
): Response => {
  const responseBody = {
    success: true,
    message,
    data: data || null,
    jwtToken: jwtToken || null,
  };

  return new Response(JSON.stringify(responseBody), {
    status: statusCode,
  });
};
