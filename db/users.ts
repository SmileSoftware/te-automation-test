
const usersData = [{
  _id: '23dN9jRn2TRjqD5Zb',
  createdAt: new Date('2018-11-28T03:22:20.713Z'),
  profile: {
    firstName: 'John',
    lastName: 'Valid'
  },
  emails: [
    {
      address: 'johndoe@tenet-test.textexpander.com',
      verified: true,
      primary: true
    }
  ],
  billing: {
    planSeatCount: 1,
    planIsAnnual: true,
    paidCredits: 12,
    demoDurationDays: 30,
    billingState: 'orgMember',
    demoStartedDate: new Date('2019-10-01T00:31:11.755Z')
  },
  services: {
    password: {
      bcrypt: '$2b$10$XXXXXXXXXXXXXXXXXX'
    },
    resume: {
      loginTokens: [
        {
          when: new Date('2019-11-01T06:03:57.127Z'),
          hashedToken: 'YovlUgTvvYWBG0GkVZaqPE9K3+6KZcmwmiGxJI/srxs='
        }
      ]
    }
  }
},
{
  _id: '23dN9jRn2TRjqD5Zc',
  createdAt: new Date('2018-11-28T03:22:20.713Z'),
  profile: {
    firstName: 'Juan',
    lastName: 'Invalid'
  },
  emails: [
    {
      address: 'juanwrong@tenet-test.textexpander.com',
      verified: true,
      primary: true
    }
  ],
  billing: {
    planSeatCount: 1,
    planIsAnnual: false,
    paidCredits: 0,
    demoDurationDays: 30,
    billingState: 'orgMember',
    demoStartedDate: new Date('2019-01-07T00:31:11.755Z')
  },
  services: {
    password: {
      bcrypt: '$2b$10$XXXXXXXXXXXXXXXXXX'
    },
    resume: {
      loginTokens: [
        {
          // xjf-TQ5aaPf_RVBVmfxYbPRZYBTVLuQzIwoGxUG0WX-
          when: new Date('2018-11-28T06:03:57.127Z'),
          hashedToken: 'zXXBK0hQWz0MhNvZfxhQBzbJQ58emcrD0RZBj4ulU9g='
        }
      ]
    }
  }
}
];

export default usersData;
