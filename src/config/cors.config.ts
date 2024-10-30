import { CLIENT_ORIGIN } from "../../src/common/utils/constants";

export const corsConfig = {
  origin: CLIENT_ORIGIN,
  methods: ['GET', 'POST', "PUT", "DELETE"]
};
