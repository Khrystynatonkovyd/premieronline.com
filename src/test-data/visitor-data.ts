export const visitorData = {
  personalRegistrations: {
    testTitle: '@regression @ui @visitor Personal User Registration page has an empty state',
    path: '/action/personal_regs',
    accountName: /Account$/,
    breadcrumbCurrent: 'Registrations / Purchases',
    activeSection: 'Registrations / Purchases',
    tableHeaders: ['Sr', 'Event Date', 'Registration / Purchase', 'Status', 'Operations'],
    emptyTitle: 'No Registration Found',
    emptyDescription:
      'At this time, no transactions have yet been made or attempted using your account.',
  },
  friends: {
    testTitle: '@regression @ui @visitor Friends page has empty states',
    path: '/friends.php',
    breadcrumb: ['Account Settings', 'Friends'],
    emptyDescription: 'New friends / family members are added when you start a new registration.',
    tabs: [
      { name: 'My Friends', path: '/friends.php?ft=0', emptyMessage: 'Your Friends is empty.' },
      {
        name: "I'm a friend of",
        path: '/friends.php?ft=1',
        emptyMessage: 'No one has added you as a Friend',
      },
      { name: 'Blocked', path: '/friends.php?ft=2', emptyMessage: 'Your block list is empty' },
    ],
  },
} as const;

export type FriendTab = (typeof visitorData.friends.tabs)[number];
