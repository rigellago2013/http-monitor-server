import { CLIENT_ORIGIN } from '../common/utils/constants';

export const corsConfig = {
  origin: CLIENT_ORIGIN,
  methods: ['GET', 'POST']
};
