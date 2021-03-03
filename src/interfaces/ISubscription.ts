export interface ISubscription {
  email: string;
  birth: Date;
  flag: boolean;
  // eslint-disable-next-line camelcase
  first_name: string;
  gender: 'male' | 'female';
}
