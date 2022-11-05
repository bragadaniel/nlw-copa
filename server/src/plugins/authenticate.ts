import { FastifyRequest } from "fastify/types/request";

export const authenticate = async (request: FastifyRequest) => {
  await request.jwtVerify();
};
