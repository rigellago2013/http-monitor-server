import { CLIENT_SOCKET_ORIGIN } from '../common/utils/constants';

export const corsConfig = {
  origin: CLIENT_SOCKET_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true,
};
